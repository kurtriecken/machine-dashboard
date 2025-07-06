from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import machines

app = FastAPI()

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
    return {"message": "Hello From FastAPI backend!!"}