from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://myfrontend.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Player(BaseModel):
    name: str
    assetA: int
    assetB: int


class GameRequest(BaseModel):
    players: List[Player]


@app.post("/calculate")
def calculate_game(request: GameRequest):
    players = request.players

    # Validation
    for p in players:
        if p.assetA < 0 or p.assetB < 0:
            return {"error": "Investments cannot be negative."}
        if p.assetA + p.assetB != 100:
            return {"error": f"{p.name} must allocate exactly $100."}

    totalB = sum(p.assetB for p in players)
    increasedPool = totalB * 1.5
    sharePerPlayer = increasedPool / len(players)

    finalResults = [
        {
            "name": p.name,
            "assetA": p.assetA,
            "final": p.assetA + sharePerPlayer,
        }
        for p in players
    ]

    return {
        "totalB": totalB,
        "increasedPool": increasedPool,
        "sharePerPlayer": sharePerPlayer,
        "finalResults": finalResults,
    }