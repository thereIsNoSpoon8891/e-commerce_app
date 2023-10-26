import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { ProfileContext } from '../context/ProfileProvider';


const Footer = () => {

    // const { profile } = useContext(ProfileContext);
    // const  { imageUrl }  = profile; // add imageUrl to model



 
return (
<div className="footer--container">

    <Link to="/add-item" >
        <button>
            post item 
        </button>
    </Link>


    <Link>
        <button>
            Search
        </button>
    </Link>

    <Link to="/profile" >
        <button>
            my profile
        </button>
    </Link>

</div>
)
}
 
export default Footer