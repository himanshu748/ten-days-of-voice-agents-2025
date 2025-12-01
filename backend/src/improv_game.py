import random
from typing import List, Dict, Optional
from dataclasses import dataclass, field

@dataclass
class ImprovState:
    player_name: Optional[str] = None
    current_round: int = 0
    max_rounds: int = 3
    rounds: List[Dict[str, str]] = field(default_factory=list)
    phase: str = "intro"  # "intro", "pitching", "validating", "done"

class ImprovGame:
    def __init__(self):
        self.state = ImprovState()
        self.scenarios = [
            "Pitch a startup that sells bottled air to fish.",
            "Explain why your 'Uber for Dog Walking' needs blockchain.",
            "Pitch a dating app for ghosts.",
            "Sell me a subscription service for socks that don't match.",
            "Pitch a VR headset for cats.",
            "Explain your AI that generates random excuses for being late.",
            "Pitch a social network for plants.",
            "Sell me a smart water bottle that judges your hydration habits."
        ]
        self.current_scenario: Optional[str] = None

    def start_game(self, player_name: str):
        self.state.player_name = player_name
        self.state.current_round = 0
        self.state.rounds = []
        self.state.phase = "intro"

    def get_next_scenario(self) -> Optional[str]:
        if self.state.current_round >= self.state.max_rounds:
            self.state.phase = "done"
            return None
        
        self.state.current_round += 1
        self.state.phase = "pitching"
        self.current_scenario = random.choice(self.scenarios)
        return self.current_scenario

    def end_round(self, host_reaction: str):
        self.state.rounds.append({
            "scenario": self.current_scenario,
            "host_reaction": host_reaction
        })
        self.state.phase = "validating"

    def get_game_summary(self) -> str:
        return f"Alright {self.state.player_name}, we've reviewed your deck. You survived {self.state.max_rounds} rounds of due diligence. We'll be in touch... maybe."
