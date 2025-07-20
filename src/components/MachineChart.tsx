import React from "react"
import {
  Line
} from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

type MachineHistoryEntry = {
  timestamp: string
  temperature: number
}

type Props = {
  machineName: string
  history: MachineHistoryEntry[]
}

export default function MachineChart({ machineName, history }: Props) {
  const data = {
    labels: history.map((entry) => new Date(entry.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: "Temperature (°F)",
        data: history.map((entry) => entry.temperature),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.3,
        fill: true,
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const
      },
      title: {
        display: true,
        text: `Temperature Over Time - ${machineName}`
      }
    },
    scales: {
      y: {
        beginAtZero: false
      }
    }
  }

  return <Line options={options} data={data} />
}
