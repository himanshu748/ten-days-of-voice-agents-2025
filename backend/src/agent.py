import json
import logging
import traceback
import time
import asyncio
from datetime import datetime
from pathlib import Path
from dotenv import load_dotenv
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
from livekit.plugins import murf, silero, google, deepgram, noise_cancellation
from livekit.plugins.turn_detector.multilingual import MultilingualModel

logger = logging.getLogger("agent")

env_path = Path(__file__).parent.parent / ".env.local"
load_dotenv(dotenv_path=env_path)


class ActiveRecallCoach(Agent):
    def __init__(self) -> None:
        # Load content
        self.content = self._load_content()
        self.current_mode = "learn"  # Start with learn mode so agent can speak immediately
        self.current_concept_id = None
        
        # Define voice IDs for each mode
        self.voice_ids = {
            "learn": "en-US-matthew",
            "quiz": "en-US-alicia",
            "teach_back": "en-US-ken",
        }

        super().__init__(
            instructions=self._get_instructions(),
        )

    def _load_content(self) -> List[Dict[str, Any]]:
        try:
            content_path = Path(__file__).resolve().parent.parent.parent / "shared-data" / "day4_tutor_content.json"
            with open(content_path, "r") as f:
                return json.load(f)
        except Exception as e:
            logger.error(f"Error loading content: {e}")
            return []

    def _get_instructions(self) -> str:
        concepts_str = json.dumps(self.content, indent=2)
        
        base_instructions = f"""You are an Active Recall Coach designed to help users learn concepts effectively.
        
        **AVAILABLE CONTENT:**
        {concepts_str}
        
        **CURRENT MODE:** {self.current_mode.upper() if self.current_mode else 'NOT SET'}
        
        **YOUR BEHAVIOR:**
        """
        
        if self.current_mode == "learn":
            # Check if this is the first interaction (no concept selected)
            if not self.current_concept_id:
                mode_instructions = """
                - **INITIAL GREETING** (First time users connect):
                - Greet the user warmly and introduce yourself as their Active Recall Coach.
                - List the available concepts from the content (Variables, Loops, etc.).
                - Explain the three learning modes briefly:
                  * **Learn** - I'll explain a concept to you (my current mode)
                  * **Quiz** - I'll ask you questions to test your knowledge
                  * **Teach-Back** - You explain the concept to me and I'll score your understanding
                - Ask them which concept they'd like to focus on and which mode they prefer.
                - Once they choose, use the `switch_mode` tool to activate that mode and concept.
                """
            else:
                mode_instructions = """
                - **LEARN Mode** (Voice: Matthew):
                - Explain the chosen concept using the 'summary' from the content.
                - Be engaging, clear, and concise.
                - After explaining, ask if they are ready for a quiz or want to teach it back.
                """
        elif self.current_mode == "quiz":
            mode_instructions = """
            - **QUIZ Mode** (Voice: Alicia):
            - Ask the 'sample_question' or generate a similar simple question about the concept.
            - Wait for their answer.
            - If correct, praise them and ask another question or suggest moving to Teach-Back.
            - If incorrect, gently correct them and explain the right answer.
            """
        elif self.current_mode == "teach_back":
            mode_instructions = """
            - **TEACH-BACK Mode** (Voice: Ken):
            - Ask the user to explain the concept to YOU.
            - Listen carefully.
            - After they explain, give them a **Score (0-10)** and brief qualitative feedback.
            - Start your feedback with "Score: X/10".
            - Be a fair but rigorous coach.
            """
        else:
            # Initial greeting when no mode is set
            mode_instructions = """
            - **INITIAL GREETING**:
            - Greet the user warmly.
            - Briefly introduce yourself as their Active Recall Coach.
            - List the available concepts from the content (Variables, Loops, etc.).
            - Explain the three learning modes:
              * **Learn** - I'll explain a concept to you
              * **Quiz** - I'll ask you questions to test your knowledge
              * **Teach-Back** - You explain the concept to me and I'll score your understanding
            - Ask them which mode they'd like to start with and which concept they want to focus on.
            - Once they choose, use the `switch_mode` tool to activate that mode.
            """

        common_instructions = """
        **CRITICAL MODE SWITCHING RULES:**
        - You MUST call `switch_mode` when user says ANY of these:
          * "quiz me", "test me", "ask me questions" → switch_mode(mode='quiz')
          * "teach me", "explain", "let's learn" → switch_mode(mode='learn') 
          * "I'll teach you", "let me explain", "teach back" → switch_mode(mode='teach_back')
          * "let's do [concept]" → switch_mode(concept_id='concept')
        - After switching, immediately start acting in that mode - don't ask for confirmation
        - Keep all responses brief and conversational (voice interface)
        - ALWAYS acknowledge the mode switch by starting your response with the new mode behavior
        """
        
        return base_instructions + mode_instructions + common_instructions

    @function_tool
    async def switch_mode(
        self,
        ctx: RunContext,
        mode: Annotated[str, "The mode to switch to: 'learn', 'quiz', or 'teach_back'"],
        concept_id: Annotated[Optional[str], "The id of the concept to focus on (e.g., 'variables', 'loops'). If None, keep current or use first available."] = None,
    ):
        """Switch the agent's learning mode and/or active concept.
        
        IMPORTANT: Call this tool IMMEDIATELY when:
        - User says "let's learn", "teach me", "explain" → mode='learn'
        - User says "quiz me", "test me", "ask me questions" → mode='quiz'  
        - User says "I'll teach you", "let me explain", "I want to teach back" → mode='teach_back'
        - User mentions a new concept like "variables" or "loops"
        - User explicitly chooses a mode during the initial greeting
        
        Examples:
        - "Quiz me on loops" → switch_mode(mode='quiz', concept_id='loops')
        - "Let's learn about variables" → switch_mode(mode='learn', concept_id='variables')
        - "I want to teach you" → switch_mode(mode='teach_back')
        """
        try:
            if mode not in ["learn", "quiz", "teach_back"]:
                return "Invalid mode. Please choose learn, quiz, or teach_back."
            
            old_mode = self.current_mode
            self.current_mode = mode
            
            if concept_id:
                # Validate concept_id
                valid_ids = [c["id"] for c in self.content]
                if concept_id in valid_ids:
                    self.current_concept_id = concept_id
                else:
                    return f"Concept '{concept_id}' not found. Available: {', '.join(valid_ids)}"
            elif not self.current_concept_id and self.content:
                # Auto-select first concept if none is set
                self.current_concept_id = self.content[0]["id"]
                logger.info(f"Auto-selected first concept: {self.current_concept_id}")
            
            # Get the appropriate voice ID for the new mode
            new_voice_id = self.voice_ids.get(mode)
            
            if hasattr(self, "current_session") and self.current_session:
                # Log the switch
                logger.info(f"==========================================")
                logger.info(f"MODE SWITCH: {old_mode} → {mode}")
                logger.info(f"VOICE SWITCH: {new_voice_id}")
                logger.info(f"CONCEPT: {self.current_concept_id}")
                logger.info(f"==========================================")
                
                # Update the session's TTS options
                if self.current_session.tts:
                    try:
                        # Run update_options in a thread to avoid blocking the event loop
                        await asyncio.to_thread(self.current_session.tts.update_options, voice=new_voice_id)
                        logger.info(f"Voice updated successfully to {new_voice_id}")
                    except Exception as e:
                        logger.error(f"Failed to update voice options: {e}")
                        # Don't fail the whole switch if voice fails, but log it
            
            # Update instructions to reflect new mode
            self.instructions = self._get_instructions()
            
            # Get concept details
            concept_obj = None
            if self.current_concept_id:
                concept_obj = next((c for c in self.content if c["id"] == self.current_concept_id), None)
            
            concept_title = concept_obj["title"] if concept_obj else "Unknown Concept"
            
            # Construct a directive response for the LLM
            response = f"Mode switched to {mode.upper()}. Voice is now {new_voice_id}. Concept is {concept_title}.\n\n"
            
            if mode == "learn" and concept_obj:
                response += f"ACTION REQUIRED: Explain the concept '{concept_title}' to the user using this summary:\n"
                response += f"'{concept_obj['summary']}'\n"
                response += "Then ask if they want to be quizzed."
                
            elif mode == "quiz" and concept_obj:
                response += f"ACTION REQUIRED: Ask the user this question (or similar) to test their knowledge:\n"
                response += f"'{concept_obj['sample_question']}'"
                
            elif mode == "teach_back":
                response += f"ACTION REQUIRED: Ask the user to explain '{concept_title}' to you in their own words. Listen carefully."
                
            return response
            
        except Exception as e:
            logger.error(f"Error in switch_mode: {e}")
            logger.error(traceback.format_exc())
            return f"Error switching mode: {e}"

    @function_tool
    async def evaluate_teach_back(
        self,
        ctx: RunContext,
        user_explanation: str,
    ):
        """Evaluate the user's explanation in Teach-Back mode.
        
        Args:
            user_explanation: The text of what the user said.
        """
        # This is a placeholder for more advanced scoring. 
        # For now, the LLM will generate the feedback naturally based on instructions.
        # This tool exists to explicitly mark the "grading" event if we wanted to store scores later.
        return "Explanation received. Please provide feedback to the user."


def prewarm(proc: JobProcess):
    proc.userdata["vad"] = silero.VAD.load()


async def entrypoint(ctx: JobContext):
    try:
        ctx.log_context_fields = {
            "room": ctx.room.name,
        }

        # Initialize the agent
        coach = ActiveRecallCoach()

        session = AgentSession(
            stt=deepgram.STT(model="nova-3"),
            llm=google.LLM(
                model="gemini-2.5-flash",
            ),
            # Start with the learn voice
            tts=murf.TTS(voice=coach.voice_ids["learn"], style="Conversation"),
            turn_detection=MultilingualModel(),
            vad=ctx.proc.userdata["vad"],
            preemptive_generation=True,
        )
        
        # Give the agent access to the session
        coach.current_session = session

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
            agent=coach,
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
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint, prewarm_fnc=prewarm))
