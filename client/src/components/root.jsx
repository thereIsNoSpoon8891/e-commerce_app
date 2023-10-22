import React from 'react'
import ReactDOM from 'react-dom/client'
import { DataContextProvider } from '../context/DataProvider'
import App from './App'
import '../assets/app.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DataContextProvider>
      <App />
    </DataContextProvider>
  </React.StrictMode>,
)
