import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthForm from "./AuthForm"
import { useContext } from 'react'
import { ProfileContext } from '../context/ProfileProvider'
import Home from './Home'
import Header from './Header'
import ProtectedRoutes from './ProtectedRoutes'

function App() {

  const { token } = useContext(ProfileContext);

  return (
    <>
      {token && <Header />}
          <Router>
              <Routes>
                  <Route path="/" element={token ? <Home /> : <AuthForm /> } />

                  <Route  path="/home" element={ <ProtectedRoutes>   <Home />  </ProtectedRoutes> }/>

              </Routes>
          </Router>
      </>

  )
}

export default App
