# Zepto Voice Agent - Day 7 Challenge 🟣⚡️

Welcome to the **Zepto Voice Agent**! This project is a high-energy, premium voice assistant designed to bring the "10-minute delivery" promise to life through an interactive voice interface.

## About the Project

This agent acts as a **Friendly Grocery Shopping Assistant** for Zepto. It helps users order groceries, find ingredients for recipes, and manage their cart with a seamless voice-first experience.

**Key Features:**
- **Zepto Persona**: Energetic, helpful, and branded with the Zepto vibe (Deep Purple & Hot Pink).
- **Smart Cart**: Add items, remove items, and view your cart using natural language.
- **Recipe Assistance**: Ask for ingredients for a dish (e.g., "Ingredients for pasta"), and it will add them to your cart.
- **Premium UI**: A "mind-blowing" frontend with glassmorphism, floating 3D emojis, and a sleek dark theme.

## Tech Stack

- **Backend**: Python, LiveKit Agents, Deepgram (Nova-3 STT, Aura TTS), Google Gemini 2.5 Flash (LLM).
- **Frontend**: Next.js 15 (Turbopack), Tailwind CSS v4, Framer Motion, LiveKit Components.
- **Design**: Custom Zepto theme (Deep Purple `#3C006B`, Hot Pink `#FF3269`).

## Quick Start

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
uv run python src/agent.py dev
```

### 2. Frontend Setup

```bash
cd frontend
pnpm install
cp .env.example .env.local
# Configure LIVEKIT_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET
pnpm dev
```

### 3. Run

Open `http://localhost:3000` (or the port shown in your terminal) to start shopping!

## License

MIT
