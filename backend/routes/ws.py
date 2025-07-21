from fastapi import APIRouter, WebSocket
import asyncio
from datetime import datetime

from models import MachineWithHistory
from data import machines, simulate_step

router = APIRouter()

@router.websocket("/ws/machines")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            simulate_step()
            await websocket.send_json([m.latest() for m in machines])
            await asyncio.sleep(5)
    except Exception as e:
        print("WebSocket disconnected:", e)
        await websocket.close()