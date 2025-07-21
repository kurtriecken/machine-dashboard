import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import type { Machine } from "../types/machines";
import { useEffect, useState } from "react";
import "chartjs-adapter-date-fns";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

type MachineHistoryEntry = {
  timestamp: string;
  temperature: number;
};

type Props = {
  machine: Machine;
};

export default function MachineChart({ machine }: Props) {
  const [flash, setFlash] = useState(false);
  const [isNormalizing, setIsNormalizing] = useState(machine.normalizing);

  useEffect(() => {
    setIsNormalizing(machine.normalizing);
    if (!machine.normalizing && isNormalizing) {
      toast.success(`Machine "${machine.name}" is normalized! ✅`);
      setIsNormalizing(false);
    }
  }, [machine.normalizing]);

  const outOfRange = machine.history.some(
    (entry) =>
      entry.temperature < machine.range_min ||
      entry.temperature > machine.range_max
  );

  const lastFive = machine.history.slice(-5);
  const lastFiveOutOfRange = lastFive.every(
    (entry) =>
      entry.temperature < machine.range_min ||
      entry.temperature > machine.range_max
  );

  const warningStyle = {
    color: flash ? "white" : "red",
    backgroundColor: flash ? "red" : "transparent",
    fontWeight: "bold",
    padding: "0.5rem",
    borderRadius: "0.25rem",
    textAlign: "center" as const,
    transition: "all 0.3s ease",
  };

  const lineColor = lastFiveOutOfRange ? "red" : "rgba(54, 162, 235, 1)";

  async function handleNormalizeTemperature() {
    try {
      const res = await fetch(
        `http://localhost:8000/machines/${machine.id}/normalize`,
        {
          method: "POST",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to trigger normalization.");
      }
      toast("Normaliztion started");
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (lastFiveOutOfRange) {
      const interval = setInterval(() => setFlash((f) => !f), 500);
      return () => clearInterval(interval);
    } else {
      setFlash(false);
    }
  }, [lastFiveOutOfRange]);

  const data = {
    datasets: [
      {
        label: machine.name,
        data: machine.history.map((entry) => ({
          x: entry.timestamp,
          y: entry.temperature,
        })),
        borderColor: lineColor,
        pointBackgroundColor: (ctx) => {
          const val = ctx.raw.y;
          return val < machine.range_min || val > machine.range_max
            ? "red"
            : lineColor;
        },
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: "time" as const,
        time: {
          unit: "minute",
          tooltipFormat: "HH:mm",
          displayFormats: {
            minute: "HH:mm",
          },
        },
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        title: {
          display: true,
          text: "Temperature (°F)",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
  };

  return (
    <div className="p-4 rounded-xl border bg-white shadow-md">
      {outOfRange && (
        <div
          style={
            lastFiveOutOfRange
              ? warningStyle
              : { color: "red", fontWeight: "bold", marginBottom: "0.5rem" }
          }
        >
          ⚠ Out-of-range temperatures detected! Expected range:{" "}
          {machine.range_min}°F - {machine.range_max}°F
          {lastFiveOutOfRange && (
            <>
              {!isNormalizing ? (
                <button
                  onClick={handleNormalizeTemperature}
                  className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  ⚙ Normalize Temperature
                </button>
              ) : (
                <div className="flex items-center space-x-2 mt-2">
                  <ClipLoader size={20} color="white" />
                  <span>Normalizing...</span>
                </div>
              )}
            </>
          )}
        </div>
      )}
      <Line data={data} options={options} />
    </div>
  );
}
