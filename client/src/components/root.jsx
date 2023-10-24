import React from 'react'
import ReactDOM from 'react-dom/client'
import { ProfileContextProvider } from '../context/ProfileProvider'
import { ItemContextProvider } from '../context/ItemProvider'
import App from './App'
import '../assets/app.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProfileContextProvider>
      <ItemContextProvider>
        <App />
      </ItemContextProvider>
    </ProfileContextProvider>
  </React.StrictMode>,
)
