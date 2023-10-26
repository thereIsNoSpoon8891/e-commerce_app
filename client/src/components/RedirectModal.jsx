import { useNavigate} from 'react-router-dom'



const RedirectModal = ({handleModal}) => {

    const navToHome = useNavigate();

    function handleClick () {
        handleModal();
        navToHome("/");
    }
 
return (
<div className="post-modal">
    <h1>
        Item Posted!
    </h1>
    <button onClick={handleClick} >
        OK
    </button>
</div>
)
}
 
export default RedirectModal