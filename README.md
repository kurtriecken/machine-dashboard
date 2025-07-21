# Machine Dashboard

A real-time dashboard application for monitoring and managing industrial machine equipment.  
Built with a modern full-stack architecture to display live machine temperature data, visualize trends, and provide operational controls.

---

## Features

- Live temperature updates with WebSocket-powered real-time data streaming  
- Interactive time series charts with out-of-range alerts and color-coded data points  
- Ability to trigger machine temperature normalization from the frontend  
- Responsive and user-friendly UI with loading states and toast notifications  
- Configurable expected temperature ranges with auto simulation of machine behavior

---

## Tech Stack

### Backend

- **Python 3.13** — Core language  
- **FastAPI** — Fast, modern, asynchronous web framework  
- **Pydantic** — Data validation and settings management  
- **asyncio** — Asynchronous tasks and real-time simulation  
- **Uvicorn** — ASGI server for running FastAPI app  
- **WebSockets** — Real-time two-way communication between server and client

### Frontend

- **React 18** — Modern UI library  
- **Vite** — Lightning-fast frontend build tool and dev server  
- **TypeScript** — Typed JavaScript for robust frontend development  
- **Chart.js & react-chartjs-2** — Flexible and powerful charting library for visualizing machine data  
- **react-hot-toast** — Lightweight toast notifications  
- **react-spinners** — Loading spinner components for better UX  

---

## Installation & Setup

### Backend

1. Create and activate a Python virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate  # macOS/Linux
   venv\Scripts\activate     # Windows
