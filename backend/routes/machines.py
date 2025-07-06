from fastapi import APIRouter
from models import Machine

router = APIRouter()

# temp mock data
mock_machines = [
    Machine(id=1, name="CNC Lathe 1", status="operational", temperature=68.2),
    Machine(id=2, name="Drill Press", status="maintenance", temperature=0.0),
    Machine(id=3, name="3D Printer", status="idle", temperature=37.5)
]

@router.get("/machines", response_model=list[Machine])
def get_machines():
    return mock_machines