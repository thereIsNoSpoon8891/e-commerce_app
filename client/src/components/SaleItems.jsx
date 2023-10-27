import { useState, useContext } from 'react';
import { ProfileContext } from '../context/ProfileProvider';
import MessageForm from './MessageForm';

const SaleItems = props => {

    const { name, description, imageUrl, price, owner_id, owner_name  } = props;

    const { profile: {displayName} } = useContext(ProfileContext);

    const [toggleMessageForm, setToggleMessageForm] = useState(false);

    function handleModal () {
        setToggleMessageForm(prev => !prev);
    } 

return (
<>
    <div className="list-items">

        <h1>
            {name}
        </h1>

    <div>

        <p>
            {description}
        </p>
    </div>

        <img src={imageUrl} />

        <p>
        Price: {price}
        </p>

        <p>
        posted by: {owner_name}
        </p>
        <button
        onClick={handleModal}
        >
            Message {owner_name}
        </button>
    </div>
    {toggleMessageForm && 
    <MessageForm 
    name={name} 
    owner_id={owner_id} 
    owner_name={owner_name} 
    displayName={displayName}
    handleModal={handleModal}
    />}
</>
)
}
 
export default SaleItems