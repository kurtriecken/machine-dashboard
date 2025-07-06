import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MyButton from './components/Button'

function App() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchFunc = async () => {
      try {
        const response = await fetch('http://localhost:8000')
        if (response) {
          const data = await response.json()
          if (data && data.message) setMessage(data.message)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchFunc()
  }, [])

  function increaseCounter() {
    setCount((count) => count + 1)
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <MyButton count={count} onClick={increaseCounter}/>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <pre>
        <h1>a MeSsAGe fRoM beyONd...(the backend)</h1>
        <p>Message: {message}</p>
      </pre>
    </>
  )
}

export default App
