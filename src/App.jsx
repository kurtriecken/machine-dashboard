import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import MachineDashboard from "./pages/MachineDashboard"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MachineDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
