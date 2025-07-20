from fastapi import APIRouter
from models import MachineWithHistory, MachineHistoryEntry
from typing import List
import asyncio
import random
from datetime import datetime
from collections import deque

router = APIRouter()

class MachineHistory:
    def __init__(self, id, name, status, range_min, range_max):
        self.id = id
        self.name = name
        self.status = status
        self.history = deque(maxlen=50) # keeps the last 50 readings only
        self.range_min = range_min
        self.range_max = range_max

        # initialize with the first reading timestamped now
        initial_temp = (range_min + range_max) / 2
        self.history.append({
            "timestamp": datetime.now().isoformat(),
            "temperature": initial_temp,
            "status": status,
        })
    
    def update(self, temperature, status):
        self.status = status
        self.history.append({
            "timestamp": datetime.now().isoformat(),
            "temperature": temperature,
            "status": status,
        })
    
    def latest(self):
        return {
            "id": self.id,
            "name": self.name,
            "status": self.status,
            "history": list(self.history),
            "range_min": self.range_min,
            "range_max": self.range_max
        }

machines = [
    MachineHistory(1, "CNC Lathe 1", "operational", 65, 75),
    MachineHistory(2, "Drill Press", "maintenance", 0, 5),
    MachineHistory(3, "3D Printer", "idle", 35, 40),
]

statuses = ["operational", "idle", "maintenance"]

async def simulate_machine_updates():
    while True:
        await asyncio.sleep(5)
        for m in machines:
            new_temp = m.history[-1]["temperature"] + random.uniform(-1.5, 1.5)
            new_status = m.status
            if random.random() < 0.2:
                new_status = random.choice(statuses)
            m.update(new_temp, new_status)

@router.get("/machines", response_model=List[MachineWithHistory])
def get_machines():
    return [m.latest() for m in machines]


# @router.post('/machines/add', response_model=Machine)
# def add_machine(machine: MachineBase):
#     new_machine = Machine(
#         id=mock_machines[-1].id + 1,
#         name=machine.name,
#         status=machine.status,
#         temperature=machine.temperature
#     )
#     mock_machines.append(new_machine)
#     return new_machine

# @router.delete('/machines/delete/{id}')
# def delete_machine(id: int):
#     mock_machines[:] = [item for item in mock_machines if item.id != id]
#     return {"message": "Item deleted successfully!"}