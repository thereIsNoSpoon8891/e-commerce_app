import { useState, useContext } from 'react';
import { ProfileContext } from '../context/ProfileProvider';
import MessageForm from './MessageForm';

const SearchItems = props => {

    const { name, description, imageUrl, price, owner_id, owner_name  } = props;

    const { profile: {displayName} } = useContext(ProfileContext);

    const [toggleMessageForm, setToggleMessageForm] = useState(false);

    function handleModal () {
        setToggleMessageForm(prev => !prev);
    } 

 // thnink thru the messaging sending process, what properties do I need? where to put them?
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
    {price}
</p>
<p>
    posted by: {owner_name}
</p>
    <button
    onClick={handleModal}
    >
        Message {owner_name}
    </button>
</div >
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
 
export default SearchItems