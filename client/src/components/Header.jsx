import { useState, useContext } from 'react'
import { DataContext } from '../context/DataProvider';


const Header = () => {
 
    const [toggleMenu, setToggleMenu] = useState(false);

    const { profile, logout } = useContext(DataContext)



return (
<div className='header--container'>
    <h4>
        App Name
    </h4>

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