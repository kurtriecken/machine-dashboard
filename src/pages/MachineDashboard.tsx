import React, { useEffect, useState } from "react"
import MachineChart from "../components/MachineChart"
import type { Machine } from "../types/machines"

export default function MachineDashboard() {
  const [machines, setMachines] = useState<Machine[]>([])

  useEffect(() => {
    let interval: number

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/machines")
        const data = await response.json()
        setMachines(data)
      } catch (err) {
        console.error("Failed to fetch machines: ", err)
      }
    }

    fetchData()
    interval = setInterval(fetchData, 5000)
    
    return () => clearInterval(interval)
  })

  // useEffect(() => {
  //   fetch("http://localhost:8000/machines")
  //     .then((res) => res.json())
  //     .then((data) => setMachines(data))
  //     .catch((err) => console.error("Failed to fetch machines:", err))
  // }, [])

  return (
    <div style={{
        minHeight: "100vh",
        backgroundColor: "#f5f8fa", // light soft shade, change as you like
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
        boxSizing: "border-box",
      }}>
      <h1 style={{ textAlign: "center", marginBottom: "1.5rem", color: "#1a202c" }}>Machine Dashboard</h1>
      <ul style={{ width: "90%", maxWidth: "900px" }}>
        {machines.map((machine: Machine) => {
          const latest = machine.history[machine.history.length - 1]
          return (
            <div key={machine.id} style={{marginBottom: "2rem"}}>
              <h2 style={{ textAlign: "center", marginBottom: "0.5rem" }}>{machine.name}</h2>
              <p style={{ textAlign: "center", marginBottom: "0.5rem" }}>Status: <strong>{machine.status}</strong></p>
              <p style={{ textAlign: "center", marginBottom: "1rem" }}>Temperature: {latest?.temperature.toFixed(2)}°F</p>

              <MachineChart 
                machine={machine}
              />
            </div>
          )
        })}
      </ul>
    </div>
  )
}
