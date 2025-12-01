import os
import sys
from pathlib import Path
from dotenv import load_dotenv

# Add src to path
sys.path.append(str(Path(__file__).parent / "src"))

# Load env vars
env_path = Path(__file__).parent / ".env.local"
load_dotenv(dotenv_path=env_path)

def verify_env():
    required_vars = ["LIVEKIT_URL", "LIVEKIT_API_KEY", "LIVEKIT_API_SECRET", "DEEPGRAM_API_KEY", "GOOGLE_API_KEY", "MURF_API_KEY"]
    missing = []
    for var in required_vars:
        val = os.getenv(var)
        if not val:
            missing.append(var)
        else:
            # Check for hidden characters
            if len(val) != len(val.strip()):
                print(f"⚠️ Warning: {var} has leading/trailing whitespace")

    if missing:
        print(f"❌ Missing environment variables: {', '.join(missing)}")
        return False
    print("✅ All environment variables present")
    return True

def verify_imports():
    try:
        from livekit.agents import Agent
        from livekit.plugins import deepgram, google, murf
        from agent import StartupValidatorAgent
        print("✅ Imports successful")
        return True
    except ImportError as e:
        print(f"❌ Import failed: {e}")
        return False
    except Exception as e:
        print(f"❌ Unexpected error during imports: {e}")
        return False

def verify_agent_init():
    try:
        from agent import StartupValidatorAgent
        agent = StartupValidatorAgent()
        print("✅ Agent initialized successfully")
        return True
    except Exception as e:
        print(f"❌ Agent initialization failed: {e}")
        return False

if __name__ == "__main__":
    print("Starting verification...")
    env_ok = verify_env()
    imports_ok = verify_imports()
    agent_ok = verify_agent_init()
    
    if env_ok and imports_ok and agent_ok:
        print("🎉 Verification passed!")
        sys.exit(0)
    else:
        print("💥 Verification failed!")
        sys.exit(1)
