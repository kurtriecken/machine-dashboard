# 🛠️ Machine Dashboard

A real-time dashboard application for monitoring and managing industrial machine equipment.  
Built with a modern full-stack architecture to display live machine temperature data, visualize trends 📈, and provide operational controls ⚙️.

---

## 🚀 Features

- ⚡ Live temperature updates with WebSocket-powered real-time data streaming  
- 📊 Interactive time series charts with out-of-range alerts and color-coded data points  
- 🔧 Ability to trigger machine temperature normalization from the frontend  
- 🎨 Responsive and user-friendly UI with loading spinners and toast notifications  
- 🔄 Configurable expected temperature ranges with auto simulation of machine behavior

---

## 🧰 Tech Stack

### Backend

- 🐍 **Python 3.13** — Core language  
- ⚡ **FastAPI** — Fast, modern, asynchronous web framework  
- 🔐 **Pydantic** — Data validation and settings management  
- ⏱️ **asyncio** — Asynchronous tasks and real-time simulation  
- 🚀 **Uvicorn** — ASGI server for running FastAPI app  
- 🌐 **WebSockets** — Real-time two-way communication between server and client

### Frontend

- ⚛️ **React 18** — Modern UI library  
- ⚡ **Vite** — Lightning-fast frontend build tool and dev server  
- 📐 **TypeScript** — Typed JavaScript for robust frontend development  
- 📈 **Chart.js & react-chartjs-2** — Flexible and powerful charting library for visualizing machine data  
- 🔔 **react-hot-toast** — Lightweight toast notifications  
- ⏳ **react-spinners** — Loading spinner components for better UX  

---

## 🛠️ Installation & Setup

### Backend

1. Create and activate a Python virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate  # macOS/Linux
   venv\Scripts\activate     # Windows
   ```

2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Run the FastAPI server:

   ```bash
   uvicorn main:app --reload
   ```

### Frontend

1. Install Node.js dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open your browser at [http://localhost:5173](http://localhost:5173) 🌍

---

## 🎯 Usage

- The dashboard automatically connects to the backend WebSocket to receive live machine data.  
- Click the **Normalize Temperature** button if machines are out of range to start auto-correction.  
- Visual alerts and toasts notify you of machine status changes and normalization progress.

---

## 📁 Project Structure

- `/backend` — FastAPI backend with machine simulation, WebSocket endpoint, and API routes  
- `/frontend` — React + Vite frontend with components, charts, and UI logic  

---

## 🤝 Contributing

Feel free to submit issues or pull requests!  
Please maintain consistent code style and write descriptive commit messages.

---

## 📄 License

This project is open source under the MIT License.

---

## 🙏 Acknowledgements

Thanks to the amazing maintainers of [FastAPI](https://fastapi.tiangolo.com/), [React](https://reactjs.org/), [Chart.js](https://www.chartjs.org/), and the vibrant open source community for making this project possible!

---

If you'd like, I can help generate your `requirements.txt` and `package.json` based on your dependencies. Just ask! 🎉
