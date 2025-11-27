import logging
from pathlib import Path
from dotenv import load_dotenv
import os
import json
from datetime import datetime
from typing import Annotated, Dict, Any, Optional

# Load env vars
env_path = Path(__file__).parent.parent / ".env.local"
load_dotenv(dotenv_path=env_path)

from livekit.agents import (
    Agent,
    AgentSession,
    JobContext,
    JobProcess,
    MetricsCollectedEvent,
    RoomInputOptions,
    WorkerOptions,
    cli,
    metrics,
    function_tool,
    RunContext,
    llm,
)
from livekit.plugins import silero, google, deepgram, noise_cancellation, murf
from livekit.plugins.turn_detector.multilingual import MultilingualModel
try:
    from src import database
except ImportError:
    import database

logger = logging.getLogger("fraud-agent")

class FraudAlertAgent(Agent):
    def __init__(self) -> None:
        super().__init__(
            instructions=self._get_instructions(),
        )
        self.current_case: Optional[Dict[str, Any]] = None

    def _get_instructions(self) -> str:
        return """
        You are a **Fraud Detection Representative** for **Airtel Payments Bank**.
        
        **YOUR GOAL:**
        1.  **Identify the User:** Ask for the user's username to pull up their file.
        2.  **Verify Identity:** Once you have the file, ask the security question associated with the account. Verify the answer provided by the user matches the expected answer exactly (case-insensitive).
        3.  **Review Transaction:** If verified, read out the suspicious transaction details (Amount, Merchant, City, Time).
        4.  **Confirm Legitimacy:** Ask the user if they made this transaction.
        5.  **Take Action:**
            - If **YES** (User made it): Mark as SAFE.
            - If **NO** (User didn't make it): Mark as FRAUDULENT and explain that the card is being blocked.
        6.  **End Call:** Confirm the action taken and say goodbye.

        **TONE:**
        - Professional, Calm, Reassuring, and Efficient.
        - Do NOT ask for full card numbers, PINs, or passwords.
        
        **TOOLS:**
        - Use `lookup_user` to find the case.
        - Use `update_case_status` to finalize the result.
        """

    @function_tool
    async def lookup_user(
        self,
        ctx: RunContext,
        username: Annotated[str, "The username provided by the user"],
    ):
        """Look up a fraud case by username."""
        logger.info(f"Tool lookup_user called with: '{username}'")
        
        # Use fuzzy lookup to handle "janesmith" vs "jane_smith"
        case = database.find_user_fuzzy(username)

        if not case:
            logger.warning(f"User not found: '{username}'")
            return "User not found. Please ask the user to spell their username or try again. (Hint: valid users are john_doe, jane_smith, etc.)"
        
        logger.info(f"User found: {case['username']}")
        self.current_case = case
        
        # Return details for the LLM to use
        return f"""
        Case Found:
        - Username: {case['username']}
        - Security Question: {case['security_question']}
        - Expected Answer: {case['security_answer']}
        - Transaction: {case['transaction_amount']} at {case['transaction_merchant']} in {case['transaction_city']} on {case['transaction_time']}
        - Card Ending: {case['card_ending']}
        
        INSTRUCTIONS:
        1. Ask the security question: "{case['security_question']}"
        2. If they answer "{case['security_answer']}", proceed to describe the transaction.
        3. If they fail, politely end the call.
        """

    @function_tool
    async def update_case_status(
        self,
        ctx: RunContext,
        status: Annotated[str, "The final status: 'confirmed_safe' or 'confirmed_fraud'"],
        note: Annotated[str, "A brief note about the outcome (e.g., 'User confirmed transaction')"],
    ):
        """Update the fraud case status in the database."""
        if not self.current_case:
            return "No active case to update."
            
        username = self.current_case['username']
        database.update_case_status(username, status, note)
        
        return f"Case for {username} updated to {status}. You may now end the call."

def prewarm(proc: JobProcess):
    proc.userdata["vad"] = silero.VAD.load()
    proc.userdata["stt"] = deepgram.STT(model="nova-3")

async def entrypoint(ctx: JobContext):
    try:
        ctx.log_context_fields = {"room": ctx.room.name}
        
        agent = FraudAlertAgent()
        
        session = AgentSession(
            stt=ctx.proc.userdata.get("stt") or deepgram.STT(model="nova-3"),
            llm=google.LLM(model="gemini-2.5-flash"),
            tts=murf.TTS(
                voice="Matthew",
                style="Conversation",
                speed=5,
                pitch=0,
                model="FALCON",
                sample_rate=24000,
            ),
            turn_detection=MultilingualModel(),
            vad=ctx.proc.userdata["vad"],
            preemptive_generation=True,
        )
        
        usage_collector = metrics.UsageCollector()
        
        @session.on("metrics_collected")
        def _on_metrics_collected(ev: MetricsCollectedEvent):
            metrics.log_metrics(ev.metrics)
            usage_collector.collect(ev.metrics)

        async def log_usage():
            summary = usage_collector.get_summary()
            logger.info(f"Usage: {summary}")

        ctx.add_shutdown_callback(log_usage)

        await session.start(
            agent=agent,
            room=ctx.room,
            room_input_options=RoomInputOptions(
                noise_cancellation=noise_cancellation.BVC(),
            ),
        )
        
        await ctx.connect()
        # Initial greeting
        await session.say("Hello, this is the Fraud Department at Airtel Payments Bank. I'm calling about a suspicious transaction. Could you please verify your username so I can pull up your file?", add_to_chat_ctx=True)


    
    except Exception as e:
        logger.error(f"Error in entrypoint: {e}")
        raise e

if __name__ == "__main__":
    cli.run_app(
        WorkerOptions(
            entrypoint_fnc=entrypoint, 
            prewarm_fnc=prewarm,
            ws_url=os.getenv("LIVEKIT_URL"),
            api_key=os.getenv("LIVEKIT_API_KEY"),
            api_secret=os.getenv("LIVEKIT_API_SECRET"),
        )
    )
