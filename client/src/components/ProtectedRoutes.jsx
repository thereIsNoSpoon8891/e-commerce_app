import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileContext } from '../context/ProfileProvider';

const ProtectedRoutes = ({children}) => {

    const { token } = useContext(ProfileContext);


 const nav = useNavigate();

 useEffect(() => {
    if(!token){
        nav("/");
    }
 }, [token])
return token ? children : null;
}
 
export default ProtectedRoutes