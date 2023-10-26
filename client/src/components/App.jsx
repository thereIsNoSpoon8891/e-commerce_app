import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from "./AuthForm";
import { useContext } from 'react';
import { ProfileContext } from '../context/ProfileProvider';
import Home from './Home';
import Header from './Header';
import Footer from './Footer';
import ItemForm from './ItemForm';
import Profile from './Pofile'
import ProtectedRoutes from './ProtectedRoutes';

function App() {

  const { token } = useContext(ProfileContext);

  return (
    <>
          <Router>
      {token && <Header />}
              <Routes>
                  <Route path="/" element={token ? <Home /> : <AuthForm /> } />

                  <Route  path="/home" element={ <ProtectedRoutes>   <Home />  </ProtectedRoutes> }/>

                  <Route path="/add-item" element={ <ProtectedRoutes>   <ItemForm />  </ProtectedRoutes> } />

                  <Route path='/profile' element={ <ProtectedRoutes>  <Profile /> </ProtectedRoutes>} />
              </Routes>
      {token && <Footer />}
          </Router>
    </>
  )
}

export default App
