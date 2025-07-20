import React, { useEffect, useState } from "react"
import MachineChart from "../components/MachineChart"

type Machine = {
  id: number
  name: string
  status: string
  range_min: number
  range_max: number
  history: Array<{temperature: number, timestamp: string, status: string}>
}

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
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1 style={{ color: "#2a4365" }}>Machine Dashboard</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {machines.map((machine: Machine) => {
          const latest = machine.history[machine.history.length - 1]
          return (
            <div key={machine.id} style={{marginBottom: "2rem"}}>
              <h2>{machine.name}</h2>
              <p>Status: <strong>{machine.status}</strong></p>
              <p>Temperature: {latest?.temperature.toFixed(2)}°F</p>

              <MachineChart 
                machineName={machine.name}
                history={machine.history}
              />
            </div>
          )
        })}
      </ul>
    </div>
  )
}
