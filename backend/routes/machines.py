from fastapi import APIRouter
from models import Machine, MachineBase

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

@router.post('/machines/add', response_model=Machine)
def add_machine(machine: MachineBase):
    new_machine = Machine(
        id=mock_machines[-1].id + 1,
        name=machine.name,
        status=machine.status,
        temperature=machine.temperature
    )
    mock_machines.append(new_machine)
    return new_machine

@router.delete('/machines/delete/{id}')
def delete_machine(id: int):
    mock_machines[:] = [item for item in mock_machines if item.id != id]
    return {"message": "Item deleted successfully!"}