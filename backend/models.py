from pydantic import BaseModel
from collections import deque
from datetime import datetime
from typing import List

class MachineBase(BaseModel):
    name: str
    status: str
    temperature: float

class Machine(MachineBase):
    id: int



class MachineHistoryEntry(BaseModel):
    timestamp: str
    temperature: float
    status: str

class MachineWithHistory(BaseModel):
    id: int
    name: str
    status: str
    history: List[MachineHistoryEntry]
    range_min: float
    range_max: float
