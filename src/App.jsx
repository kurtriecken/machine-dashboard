import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import MachineDashboard from "./pages/MachineDashboard"
import { Toaster } from "react-hot-toast"
import {toastOptions} from './styles/toastOptions'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MachineDashboard />} />
      </Routes>
      <Toaster position="top-right" toastOptions={toastOptions}/>
    </Router>
  )
}

export default App
