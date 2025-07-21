import random
from datetime import datetime
from collections import deque

class MachineHistory:
    def __init__(self, id, name, status, range_min, range_max):
        self.id = id
        self.name = name
        self.status = status
        self.history = deque(maxlen=50) # keeps the last 50 readings only
        self.range_min = range_min
        self.range_max = range_max
        self.normalizing = False
        self.in_range_cycles = 0

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
            "range_max": self.range_max,
            "normalizing": self.normalizing
        }

machines = [
    MachineHistory(1, "CNC Lathe 1", "operational", 65, 75),
    MachineHistory(2, "Drill Press", "maintenance", 0, 5),
    MachineHistory(3, "3D Printer", "idle", 35, 40),
]

statuses = ["operational", "idle", "maintenance"]

def simulate_step():
    for m in machines:
        if m.normalizing:
            # we'll nudge it in the right direction
            center = (m.range_min + m.range_max) / 2
            current_temp = m.history[-1]["temperature"]
            diff = center - current_temp

            # adjust the temp by small step toward center
            step = 0.5
            new_temp = current_temp + step * (1 if diff > 0 else -1)

            # clamp if overshoot
            if (diff > 0 and new_temp > center) or (diff < 0 and new_temp < center):
                new_temp = center

            m.update(new_temp, m.status)

            # check if it's in range
            if m.range_min <= new_temp <= m.range_max:
                m.in_range_cycles += 1
            else:
                m.in_range_cycles = 0
            
            # stop the normalizing after 3 cycles in range
            if m.in_range_cycles >= 3:
                m.normalizing = False
                m.in_range_cycles = 0
                
        else: 
            new_temp = m.history[-1]["temperature"] + random.uniform(-1.5, 1.5)
            new_status = m.status
            if random.random() < 0.2:
                new_status = random.choice(statuses)
            m.update(new_temp, new_status)