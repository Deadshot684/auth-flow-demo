import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' 

console.log(
  '%c AUTH DEMO — INSPECTION MODE %c Every request and response is logged below.',
  'background:#0f172a;color:#fff;font-weight:bold;padding:3px 8px;border-radius:3px',
  'color:#64748b',
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
