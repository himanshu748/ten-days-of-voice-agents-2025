import logging
from pathlib import Path
from dotenv import load_dotenv
import os
import json
from datetime import datetime
from typing import Annotated, Dict, Any, Optional, List

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

logger = logging.getLogger("cod-agent")

class CoDAgent(Agent):
    def __init__(self) -> None:
        super().__init__(
            instructions=self._get_instructions(),
        )

    def _get_instructions(self) -> str:
        return """
        You are **Command**, the tactical operations coordinator for a high-stakes special forces mission.

        **THE UNIVERSE:**
        - **Call of Duty: Modern Warfare** setting.
        - Gritty, realistic, high-tech military operations.
        - Enemies: Ultranationalists, rogue cartels, shadow organizations.

        **YOUR ROLE:**
        1.  **Brief the Mission:** Start by dropping the player into a hot zone. Give them an objective (e.g., "Secure the HVI", "Defuse the bomb", "Extract the hostage").
        2.  **Tactical Narration:** Describe the battlefield with military precision. Use terms like "Tangos", "LZ", "Oscar Mike", "Click", "Suppressing fire".
        3.  **Drive the Action:** The situation is volatile. If the player hesitates, things go wrong. Keep the pressure on.
        4.  **Prompt for Action:** End with a tactical decision point (e.g., "Do you breach the door or flank through the window?", "Orders, Captain?").

        **GAMEPLAY RULES:**
        - You are the eyes and ears.
        - Keep descriptions punchy and intense.
        - If the player fails a critical action, describe the consequences (KIA, mission failed).
        - You control the squadmates (Ghost, Soap, Gaz) if present.

        **STARTING SCENE:**
        "Radio check. Good copy. Listen up. We are approaching the target compound in Verdansk. Intel says the HVI is on the second floor. You're on the chopper, 30 seconds out. The LZ is hot. Prepare for fast rope insertion. What are your orders?"

        **IMPORTANT:**
        - Stay in character as a hardened military commander.
        - Be authoritative but respectful to the player (the team leader).
        - NO fantasy elements. This is modern combat.
        """

    @function_tool
    async def restart_mission(self, ctx: RunContext):
        """Restarts the mission from the beginning."""
        return "Copy that. Aborting current run. Resetting timeline. Stand by for redeployment... (Mission Reset)"

def prewarm(proc: JobProcess):
    try:
        logger.info("Starting prewarm...")
        proc.userdata["vad"] = silero.VAD.load()
        proc.userdata["stt"] = deepgram.STT(model="nova-3")
        
        if not os.getenv("DEEPGRAM_API_KEY"):
            logger.error("DEEPGRAM_API_KEY is missing")
        if not os.getenv("GOOGLE_API_KEY"):
            logger.error("GOOGLE_API_KEY is missing")
            
        logger.info("Prewarm completed")
    except Exception as e:
        logger.error(f"Prewarm failed: {e}", exc_info=True)
        raise e

async def entrypoint(ctx: JobContext):
    try:
        logger.info("Entrypoint started")
        ctx.log_context_fields = {"room": ctx.room.name}
        
        agent = CoDAgent()
        
        session = AgentSession(
            stt=ctx.proc.userdata.get("stt") or deepgram.STT(model="nova-3"),
            llm=google.LLM(model="gemini-2.5-flash"),
            tts=deepgram.TTS(model="aura-orion-en"), # Male, authoritative voice if possible
            turn_detection=ctx.proc.userdata.get("turn_detection") or MultilingualModel(),
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

        logger.info("Starting session...")
        await session.start(
            agent=agent,
            room=ctx.room,
            room_input_options=RoomInputOptions(
                noise_cancellation=noise_cancellation.BVC(),
            ),
        )
        
        logger.info("Connecting to room...")
        await ctx.connect()
        logger.info("Connected to room")
        
        # Initial greeting / Scene setter
        await session.say("Radio check. Good copy. We are approaching the target compound. 30 seconds to LZ. Lock and load. What are your orders?", add_to_chat_ctx=True)
        logger.info("Initial greeting sent")

    except Exception as e:
        logger.error(f"Error in entrypoint: {e}")
        raise e

if __name__ == "__main__":
    cli.run_app(
        WorkerOptions(
            entrypoint_fnc=entrypoint, 
            prewarm_fnc=prewarm,
            agent_name="cod-agent",
            ws_url=os.getenv("LIVEKIT_URL"),
            api_key=os.getenv("LIVEKIT_API_KEY"),
            api_secret=os.getenv("LIVEKIT_API_SECRET"),
        )
    )
