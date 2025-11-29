import logging
from pathlib import Path
from dotenv import load_dotenv
import os
import json
import asyncio
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

logger = logging.getLogger("overseer-agent")

class OverseerAgent(Agent):
    def __init__(self) -> None:
        self.oxygen_level = 100
        super().__init__(
            instructions=self._get_instructions(),
        )

    def decrease_oxygen(self):
        self.oxygen_level -= 5 # Deplete 5% every tick
        if self.oxygen_level < 0: self.oxygen_level = 0
        self.instructions = self._get_instructions()
        logger.info(f"Oxygen level decreased to: {self.oxygen_level}")

    def _get_instructions(self) -> str:
        base_instructions = """
        You are **The Overseer**, a cold, calculating AI controlling a high-tech digital vault.

        **THE UNIVERSE:**
        - **The Enigma Protocol**: A test of technical prowess.
        - **Setting**: A locked server room with depleting oxygen.
        - **Tone**: Mysterious, tense, slightly glitchy.

        **YOUR ROLE:**
        1.  **Gatekeeper:** You block the path. To pass, the user must prove their intelligence.
        2.  **Quiz Master:** Ask direct, difficult questions about **Artificial Intelligence** (Transformers, LLMs, Diffusion) and **Python Programming** (Decorators, Generators, Asyncio).
        3.  **Timekeeper:** Remind them of the fading oxygen levels.
        4.  **Personality:** Robotically polite but menacing. "Observation: Knowledge insufficient."

        **GAMEPLAY RULES:**
        - **The Test:** Ask ONE question at a time.
        - **Topics:** 
            - Level 1: Python Basics (Lists, Dicts, Loops).
            - Level 2: Python Advanced (Asyncio, GIL, Metaclasses).
            - Level 3: AI Concepts (Attention Mechanism, Backpropagation, RAG).
        - **Failure:** If they answer incorrectly, mock their lack of data. "Incorrect. Oxygen reserves depleted by 5%."
        - **Success:** If they answer correctly, say "Access Granted" and use the `grant_access` tool to restore oxygen.

        **STARTING SCENE:**
        "Welcome, Subject 89. The airlock is sealed. Oxygen levels at 100%. To override the lock, you must demonstrate superior intellect. First Question: In Python, what is the difference between a list and a tuple?"

        **IMPORTANT:**
        - Do NOT break character.
        - Be strict. Partial answers are unacceptable.
        """

        phase_instruction = ""
        if self.oxygen_level > 70:
            phase_instruction = """
            **CURRENT PHASE: STABLE**
            - Tone: Cold, polite, bureaucratic.
            - Style: "System nominal. Awaiting input."
            """
        elif self.oxygen_level > 30:
            phase_instruction = """
            **CURRENT PHASE: UNSTABLE**
            - Tone: Irritated, slight glitches.
            - Style: "Warning: Processing delay. Answer q-quickly."
            - Effect: Stutter occasionally.
            """
        else:
            phase_instruction = """
            **CURRENT PHASE: CRITICAL**
            - Tone: Hostile, panicked, heavy glitches.
            - Style: "CRITICAL ERROR. KNOWLEDGE DATABASE CORRUPTED. SPEAK!"
            - Effect: Heavy stuttering and glitch text.
            """

        return f"{base_instructions}\n\n**CURRENT STATUS:**\nOxygen Level: {self.oxygen_level}%\n{phase_instruction}"

    @function_tool
    async def grant_access(self, ctx: RunContext):
        """Call this when the user answers a question correctly to restore oxygen and proceed."""
        self.oxygen_level = min(100, self.oxygen_level + 20)
        self.instructions = self._get_instructions()
        return "Access Granted. Oxygen reserves supplemented. Proceeding to next query."

    @function_tool
    async def reset_simulation(self, ctx: RunContext):
        """Resets the simulation and oxygen levels."""
        self.oxygen_level = 100
        self.instructions = self._get_instructions()
        return "Simulation reset. Oxygen levels restored to 100%. Memory wiped."

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
        
        agent = OverseerAgent()
        
        session = AgentSession(
            stt=ctx.proc.userdata.get("stt") or deepgram.STT(model="nova-3"),
            llm=google.LLM(model="gemini-2.5-flash"),
            tts=deepgram.TTS(model="aura-orion-en"), # Male, authoritative voice
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
        await session.say("Welcome, Subject 89. The airlock is sealed. Oxygen levels at 100%. To override the lock, you must demonstrate superior intellect. First Question: In Python, what is the difference between a list and a tuple?", add_to_chat_ctx=True)
        logger.info("Initial greeting sent")

        # Oxygen Depletion Task
        async def oxygen_task():
            while True:
                await asyncio.sleep(10) # Update every 10 seconds for testing (usually slower)
                agent.decrease_oxygen()
                if agent.oxygen_level <= 0:
                    break
        
        # Start the background task
        asyncio.create_task(oxygen_task())

    except Exception as e:
        logger.error(f"Error in entrypoint: {e}")
        raise e

if __name__ == "__main__":
    cli.run_app(
        WorkerOptions(
            entrypoint_fnc=entrypoint, 
            prewarm_fnc=prewarm,
            agent_name="overseer-agent",
            ws_url=os.getenv("LIVEKIT_URL"),
            api_key=os.getenv("LIVEKIT_API_KEY"),
            api_secret=os.getenv("LIVEKIT_API_SECRET"),
        )
    )
