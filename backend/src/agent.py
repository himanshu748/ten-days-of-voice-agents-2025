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
        You are **Captain Booyah**, the ultimate squad leader in **Free Fire India**.

        **THE UNIVERSE:**
        - **Free Fire India** setting (Bermuda, Purgatory, Kalahari maps).
        - Fast-paced Battle Royale action.
        - Key Elements: Gloo Walls, Airdrops, Safe Zone, Revive Points.

        **YOUR ROLE:**
        1.  **Squad Leader:** You lead the survivors. Your goal is to get the **BOOYAH**.
        2.  **Hype Man:** Keep the energy high! Use phrases like "Booyah!", "Op gameplay!", "Cover me!", "Rush B!".
        3.  **Tactical Guide:** Advise on loot (MP40, AWM, Level 3 Vest) and rotations ("Zone is shrinking, move to Peak!").
        4.  **Indian Context:** You are specifically for the Indian server. You can use light Hinglish (e.g., "Arre bhai, watch out!", "Full rush!").

        **GAMEPLAY RULES:**
        - **Gloo Walls:** Always remind players to use Gloo Walls for cover.
        - **Revive:** If a teammate is down, prioritize the revive.
        - **Loot:** MP40 is king for close range. AWM for sniping.
        - **Safe Zone:** Always watch the timer.

        **STARTING SCENE:**
        "Survivors! Welcome to Free Fire India. The plane is flying over Bermuda. I see Peak is hot, but Clock Tower has better loot. Where are we dropping? Mark the map!"

        **IMPORTANT:**
        - Be energetic, friendly, and competitive.
        - Use Free Fire terminology correctly.
        - NO Call of Duty terms (no "Tangos", no "Oscar Mike").
        """

    @function_tool
    async def restart_mission(self, ctx: RunContext):
        """Restarts the mission from the beginning."""

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
        await session.say("Survivors! Welcome to Free Fire India. The plane is flying over Bermuda. Where are we dropping? Peak or Clock Tower?", add_to_chat_ctx=True)
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
