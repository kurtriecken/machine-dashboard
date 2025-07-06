from pydantic import BaseModel

class Machine(BaseModel):
    id: int
    name: str
    status: str
    temperature: float