# Call of Duty: Tactical Commander Voice Agent 🎖️

**"Radio check. Good copy. What are your orders?"**

Welcome to the **Call of Duty: Tactical Commander** voice agent. This project puts you in the boots of a special forces team leader, with an AI "Command" guiding your mission, reacting to your orders, and narrating the battlefield in real-time.

## 🎯 Mission Briefing

This agent acts as **Command**, your tactical operations coordinator. It drops you into high-stakes scenarios (like the Modern Warfare universe) and expects you to lead the squad.

**Key Features:**
- **Immersive Persona**: A gritty, authoritative military commander who uses tactical jargon ("Oscar Mike", "Tangos", "LZ Hot").
- **Dynamic Storytelling**: The agent narrates the consequences of your decisions—breach a door, call in an airstrike, or go stealth.
- **Squad Control**: You command the team (Ghost, Soap, Gaz).
- **Real-time Interaction**: Powered by **Deepgram Nova-3** (STT) and **Aura** (TTS) for near-instant latency, making the firefight feel real.

## 🛠️ Tech Stack

- **Backend**: Python, LiveKit Agents
- **AI Models**:
    - **LLM**: Google Gemini 2.5 Flash (for fast, intelligent tactical responses)
    - **STT**: Deepgram Nova-3 (for accurate voice recognition in "combat")
    - **TTS**: Deepgram Aura (for that realistic radio-comm voice)
- **Frontend**: Next.js 15, LiveKit Components (for the visual comms interface)

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

### 3. Deploy to the AO (Area of Operations)
Open `http://localhost:3000` to establish the comms link.

## 🎮 How to Play
1.  **Connect**: Click "Connect" to start the mission.
2.  **Listen**: Command will brief you on the situation (e.g., "Approaching target compound").
3.  **Command**: Give your orders clearly.
    - *"Breach and clear!"*
    - *"Go stealth, use suppressors."*
    - *"Sniper support, take the shot!"*
4.  **Adapt**: The situation will change based on your choices. Stay sharp.

## 📜 License
MIT
