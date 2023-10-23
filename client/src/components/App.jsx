import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthForm from "./AuthForm"
import { useContext } from 'react'
import { DataContext } from '../context/DataProvider'
import Home from './Home'
import Header from './Header'

function App() {

  const { token } = useContext(DataContext)

  return (
    <>
  <Router>
        {token && <Header />}
    <Routes>
        <Route path="/" element={token ? <Home /> : <AuthForm /> } />

    </Routes>
  </Router>
      </>

  )
}

export default App
