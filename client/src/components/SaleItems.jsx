import { useState, useContext } from 'react';
import { ProfileContext } from '../context/ProfileProvider';
import MessageForm from './MessageForm';


const SaleItems = props => {

    const { 
        name, 
        description, 
        imageUrl, 
        price, 
        owner_id, 
        owner_name, 
        forHome, 
        id,
        deleteItemForSale,
        itemsForSale,
        editProfileForSaleItemsState,
        updateForSaleItemsArrayInState,
        itemForSaleInItemContextState
      } = props;

    const { profile: {displayName} } = useContext(ProfileContext);

    const [toggleMessageForm, setToggleMessageForm] = useState(false);

    function handleModal () {
        setToggleMessageForm(prev => !prev);
    } 

    function handleDelete () {
        deleteItemForSale(id);
        editProfileForSaleItemsState(itemsForSale, id);
        updateForSaleItemsArrayInState(itemForSaleInItemContextState, id)
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
        {imageUrl ? <img width={150} src={imageUrl} /> : <p>Loading Image...</p>}


        <p>
        Price: {price}
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
        
        <button onClick={handleDelete}>
            Delete Post
        </button>
        }
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