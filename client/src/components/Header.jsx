import { useState, useContext } from 'react';
import { Link } from 'react-router-dom'
import { ProfileContext } from '../context/ProfileProvider';


const Header = () => {
 
    const [toggleMenu, setToggleMenu] = useState(false);

    const { profile, logout } = useContext(ProfileContext);

    const { displayName } = profile;


return (
<div className='header--container'>
    <Link to="/">
        <h1>
            App Name
        </h1>
    </Link>

    <h6>
       Signed in as: {displayName}
    </h6>
    <button onClick={logout}>
        Logout
    </button>
    
</div>
)
}
 
export default Header