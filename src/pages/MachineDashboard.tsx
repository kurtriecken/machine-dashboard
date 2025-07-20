import React, { useEffect, useState } from "react"

type Machine = {
  id: number
  name: string
  status: string
  temperature: number
}

export default function MachineDashboard() {
  const [machines, setMachines] = useState<Machine[]>([])

  useEffect(() => {
    fetch("http://localhost:8000/machines")
      .then((res) => res.json())
      .then((data) => setMachines(data))
      .catch((err) => console.error("Failed to fetch machines:", err))
  }, [])

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1 style={{ color: "#2a4365" }}>Machine Dashboard</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {machines.map((machine) => (
          <li
            key={machine.id}
            style={{
              border: "1px solid #cbd5e0",
              borderRadius: "0.5rem",
              padding: "1rem",
              marginBottom: "1rem",
              backgroundColor: "#ebf8ff",
            }}
          >
            <h2>{machine.name}</h2>
            <p>Status: <strong>{machine.status}</strong></p>
            <p>Temperature: {machine.temperature.toFixed(3)}°F</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
