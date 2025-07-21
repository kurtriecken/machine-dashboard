import { useEffect, useState } from "react";

export function useMachineSocket() {
    const [machines, setMachines] = useState([])

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8000/ws/machines")

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data)
                setMachines(data)
            } catch (error) {
                console.error("Error parsing the WebSocket message: ", error)
            }
        }

        socket.onerror = (err) => {
            console.error("WebSocket error: ", err)
        }

        return () => {
            socket.close()
        }
    }, [])

    return machines
}