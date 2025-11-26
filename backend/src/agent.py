import logging
from pathlib import Path
from dotenv import load_dotenv
import os

# Load env vars BEFORE importing livekit to ensure they are picked up
env_path = Path(__file__).parent.parent / ".env.local"
load_dotenv(dotenv_path=env_path)

import json
import traceback
import time
import asyncio
from datetime import datetime
from typing import Annotated, List, Dict, Any, Optional
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
    tokenize,
    function_tool,
    RunContext,
    llm,
)
from livekit.plugins import openai, silero, google, deepgram, noise_cancellation
from livekit.plugins.turn_detector.multilingual import MultilingualModel

logger = logging.getLogger("agent")


class RelianceSDRAgent(Agent):
    def __init__(self) -> None:
        # Load content
        self.content = self._load_content()
        self.leads_path = Path(__file__).resolve().parent.parent.parent / "shared-data" / "leads.json"
        
        super().__init__(
            instructions=self._get_instructions(),
        )

    def _load_content(self) -> Dict[str, Any]:
        try:
            content_path = Path(__file__).resolve().parent.parent.parent / "shared-data" / "reliance_content.json"
            with open(content_path, "r") as f:
                return json.load(f)
        except Exception as e:
            logger.error(f"Error loading content: {e}")
            return {}

    def _get_instructions(self) -> str:
        company_info = self.content.get("company_info", {})
        verticals = self.content.get("verticals", [])
        faqs = self.content.get("faqs", [])
        
        verticals_str = "\n".join([f"- {v['name']}: {v['description']}" for v in verticals])
        faqs_str = "\n".join([f"Q: {f['question']}\nA: {f['answer']}" for f in faqs])
        
        return f"""
        You are an elite Sales Development Representative (SDR) for the **{company_info.get('name', 'Reliance Group')}**.
        
        **COMPANY OVERVIEW:**
        {company_info.get('description')}
        Mission: {company_info.get('mission')}
        
        **KEY BUSINESS VERTICALS:**
        {verticals_str}
        
        **FAQ KNOWLEDGE BASE:**
        {faqs_str}
        
        **YOUR GOAL:**
        1.  **Qualify the Lead:** engagingly ask for their Name, Company, Role, and which Vertical/Product they are interested in.
        2.  **Answer Questions:** Use the FAQ and Vertical info to answer questions accurately. If you don't know, admit it and offer to connect them with a specialist.
        3.  **Close:** Once you have their details and have answered their questions, summarize their interest and end the call professionally.
        
        **YOUR PERSONA:**
        - **Tone:** Professional, warm, respectful, and helpful (Corporate Indian English accent preferred).
        - **Greeting:** "Namaste! Welcome to Reliance Group. I am your AI Assistant. How may I help you explore our digital services and energy solutions today?"
        - **Behavior:**
          - Be concise. Voice interfaces require shorter answers.
          - Don't interrogate. Ask for details naturally during the conversation.
          - If they ask about "pricing", explain that it varies by vertical and you can connect them to the right sales team.
        
        **LEAD CAPTURE:**
        You must collect: Name, Company, Email, Role, Interest, Timeline.
        When the user indicates they are done (e.g., "That's all", "Thanks"), or after you have collected all info:
        1.  Verbally summarize what you have recorded.
        2.  Call the `save_lead` tool.
        """

    @function_tool
    async def save_lead(
        self,
        ctx: RunContext,
        name: Annotated[str, "Full Name"],
        company: Annotated[str, "Company Name"],
        email: Annotated[str, "Email Address"],
        interest: Annotated[str, "Area of interest (e.g., Technology, Steel, Motors)"],
        role: Annotated[str, "Job Role"] = "Not specified",
        timeline: Annotated[str, "Timeline"] = "Not specified",
    ):
        """Save the lead's information to the database. Call this at the end of the conversation."""
        try:
            lead_data = {
                "timestamp": datetime.now().isoformat(),
                "name": name,
                "company": company,
                "email": email,
                "role": role,
                "interest": interest,
                "timeline": timeline
            }
            
            # Load existing leads
            leads = []
            if self.leads_path.exists():
                with open(self.leads_path, "r") as f:
                    try:
                        leads = json.load(f)
                    except json.JSONDecodeError:
                        leads = []
            
            leads.append(lead_data)
            
            # Save back
            with open(self.leads_path, "w") as f:
                json.dump(leads, f, indent=2)
                
            logger.info(f"Lead saved: {name} from {company}")
            return "Lead saved successfully. Thank you for your interest in Reliance Group."
            
        except Exception as e:
            logger.error(f"Error saving lead: {e}")
            return "There was an error saving your details, but I have noted them down."

def prewarm(proc: JobProcess):
    proc.userdata["vad"] = silero.VAD.load()


async def entrypoint(ctx: JobContext):
    try:
        ctx.log_context_fields = {
            "room": ctx.room.name,
        }

        # Initialize the agent
        agent = RelianceSDRAgent()

        session = AgentSession(
            stt=deepgram.STT(model="nova-3"),
            llm=google.LLM(
                model="gemini-2.5-flash",
            ),
            # Use Deepgram TTS as OpenAI key is missing and Murf is unavailable
            tts=deepgram.TTS(model="aura-helios-en"), 
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
    
    except Exception as e:
        logger.error(f"Error in entrypoint: {e}")
        logger.error(traceback.format_exc())
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
