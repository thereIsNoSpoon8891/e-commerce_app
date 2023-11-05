import { useState, useContext } from 'react';
import { ProfileContext } from '../context/ProfileProvider';
import MessageForm from './MessageForm';
import ConfirmDelete from './ConfirmDelete';

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
        itemsForSaleInProfileState,
        editProfileForSaleItemsState,
        updateForSaleItemsArrayInState,
        itemsForSaleItemContext,
        itemType
      } = props;

    const { profile: {displayName} } = useContext(ProfileContext);

    const [toggleMessageForm, setToggleMessageForm] = useState(false);

    const [toggleConfirmDeleteItem, setToggleConfirmDeleteitem] = useState(false);

    function handleModal () {
        setToggleMessageForm(prev => !prev);
    } 

    function handleDeleteModal() {
        setToggleConfirmDeleteitem(prev => !prev);
    }

    function handleDelete () {
        deleteItemForSale(id);
        editProfileForSaleItemsState(itemsForSaleInProfileState, id);
        updateForSaleItemsArrayInState(itemsForSaleItemContext, id);
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
        
        <button onClick={handleDeleteModal}>
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
    key={id}
    />}
    {toggleConfirmDeleteItem && 
    <ConfirmDelete
    itemType={itemType}
    name={name}
    id={id}
    handleDeleteModal={handleDeleteModal}
    editProfileForSaleItemsState={editProfileForSaleItemsState}
    itemsForSaleInProfileState={itemsForSaleInProfileState}
    itemsForSaleItemContext={itemsForSaleItemContext}
    deleteItemForSale={deleteItemForSale}
    updateForSaleItemsArrayInState={updateForSaleItemsArrayInState}
    />
    }
</>
)
}
 
export default SaleItems