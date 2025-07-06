from pydantic import BaseModel

class MachineBase(BaseModel):
    name: str
    status: str
    temperature: float

class Machine(MachineBase):
    id: int
