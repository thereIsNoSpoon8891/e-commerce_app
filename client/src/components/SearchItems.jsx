import { useState, useContext } from 'react';
import { ProfileContext } from '../context/ProfileProvider';
import MessageForm from './MessageForm';

const SearchItems = props => {

    const { 
        name, 
        description, 
        imageUrl, 
        price, 
        owner_id, 
        owner_name, 
        forHome, 
        id,
        deleteItemSearchingFor,
        itemsWantedInItemContextState,
        editProfileSearchingItemsState,
        updateSearchingForItemsInItemContext,
        wantedItemsArray
      } = props;

    const { profile: {displayName} } = useContext(ProfileContext);

    const [toggleMessageForm, setToggleMessageForm] = useState(false);

    function handleModal () {
        setToggleMessageForm(prev => !prev);
    } 

    function handleDelete() {
        deleteItemSearchingFor(id)
        editProfileSearchingItemsState(wantedItemsArray, id)
        updateSearchingForItemsInItemContext(itemsWantedInItemContextState, id)
    }
// console.log(itemsWantedInItemContextState)// nothing is coming thru until the saleItems component mounts
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

{imageUrl ? <img width={150} src={imageUrl} /> : <p>Loading Image...</p>}

<p>
    {price}
</p>

    { forHome && 
    <>
    <p>
    posted by: {owner_name}
    </p>
    <button onClick={handleModal}>
        Message {owner_name}
    </button>
    </>
    }
    {!forHome &&
    <>
    <button onClick={handleDelete}>
        Delete post
    </button>
    </>}
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