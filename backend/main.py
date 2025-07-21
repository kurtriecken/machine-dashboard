from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import asyncio
from routes import machines
from typing import List
from data import simulate_step

# ---- Setup backgorund task ----
async def simulate_loop():
    while True:
        simulate_step()
        await asyncio.sleep(5)

@asynccontextmanager
async def lifespan(app: FastAPI):
    task = asyncio.create_task(simulate_loop())
    yield
    task.cancel # this cleans up on shutdown

app = FastAPI(lifespan=lifespan)

# allows react frontend on 5173 to talk to the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=['*'],
)

# this will store the connected clients
connected_clients: List[WebSocket] = []

@app.websocket("/ws/machines")
async def websocket_endpoint(websocket: WebSocket):
    from data import machines
    await websocket.accept()
    connected_clients.append(websocket)

    try:
        while True:
            # Send the updated machine data from here
            await websocket.send_json([m.latest() for m in machines])
            await asyncio.sleep(5)
    except:
        connected_clients.remove(websocket)

app.include_router(machines.router)

@app.get('/')
async def root():
    return {"message": "Hello From FastAPI backend!! This is not a test"}