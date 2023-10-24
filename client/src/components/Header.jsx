import { useState, useContext } from 'react'
import { ProfileContext } from '../context/ProfileProvider';


const Header = () => {
 
    const [toggleMenu, setToggleMenu] = useState(false);

    const { profile, logout } = useContext(ProfileContext);



return (
<div className='header--container'>
    <h1>
        App Name
    </h1>

    <h6>
       Signed in as: {profile.displayName}
    </h6>
    <button onClick={logout}>
        Logout
    </button>
    
</div>
)
}
 
export default Header