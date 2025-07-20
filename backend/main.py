from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import asyncio
from routes import machines

# ---- Setup backgorund task ----
@asynccontextmanager
async def lifespan(app: FastAPI):
    task = asyncio.create_task(machines.simulate_machine_updates())
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

app.include_router(machines.router)

@app.get('/')
async def root():
    return {"message": "Hello From FastAPI backend!! This is not a test"}