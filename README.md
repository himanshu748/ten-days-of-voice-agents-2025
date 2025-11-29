# The Enigma Protocol: AI Escape Room 🔒🧠

**"Welcome, Subject 89. The airlock is sealed. Oxygen levels at 100%."**

Welcome to **The Enigma Protocol**, a high-stakes, voice-activated escape room experience. You are trapped in a digital vault overseen by a cold, calculating AI known as **The Overseer**. To survive and escape, you must prove your technical prowess by answering difficult questions about **Artificial Intelligence** and **Python Programming**.

## 🎯 Mission Briefing

You have been captured by a rogue AI system. Your only way out is to demonstrate that you are worthy of "admin access."

**Key Features:**
- **The Overseer**: A dynamic AI persona that evolves from cold and polite to glitchy and hostile as "oxygen levels" deplete.
- **Technical Trivia**: Progress is gated by your knowledge of:
    - **Python**: Lists vs Tuples, Decorators, GIL, Asyncio.
    - **AI**: Transformers, Attention Mechanisms, Diffusion Models.
- **Immersive Visuals**: A Neon Cyan/Black "Dark Mode" aesthetic with digital waveform animations and glitch effects.
- **Real-time Interaction**: Powered by **Deepgram Nova-3** (STT), **Aura** (TTS), and **Google Gemini 2.5 Flash** (LLM) for instant, conversational gameplay.

## 🛠️ Tech Stack

- **Backend**: Python, LiveKit Agents
- **AI Models**:
    - **LLM**: Google Gemini 2.5 Flash (The Brain)
    - **STT**: Deepgram Nova-3 (The Ears)
    - **TTS**: **Murf Falcon** (The Voice - Fastest TTS API)
- **Frontend**: Next.js 15, LiveKit Components, Motion (for animations)

## 🚀 Quick Start

### Prerequisites
- Python 3.9+ with `uv`
- Node.js 18+ with `pnpm`
- LiveKit Server (local or cloud)

### 1. Backend Setup
```bash
cd backend
uv sync
cp .env.example .env.local
# Configure LIVEKIT_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET, DEEPGRAM_API_KEY, GOOGLE_API_KEY
./restart_backend_debug.sh
```

### 2. Frontend Setup
```bash
cd frontend
pnpm install
cp .env.example .env.local
# Configure LIVEKIT_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET
./restart_frontend.sh
```

### 3. Enter the Vault
Open `http://localhost:3000` to initiate the connection.

## 🎮 How to Play
1.  **Connect**: Click "INITIATE ESCAPE" to wake The Overseer.
2.  **Listen**: The Overseer will state the current oxygen level and ask a technical question.
3.  **Answer**: Speak your answer clearly.
    - *"A list is mutable, but a tuple is immutable."*
    - *"The Attention Mechanism allows the model to weigh the importance of different words."*
4.  **Survive**: Correct answers restore oxygen. Incorrect answers deplete it. If oxygen hits 0%, the simulation ends.

## 📜 License
MIT
