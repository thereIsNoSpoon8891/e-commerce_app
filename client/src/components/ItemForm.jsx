import { useState, useContext } from 'react'
import { ItemContext } from '../context/ItemProvider'
import RedirectModal from './RedirectModal'

// come back and change imageUrl to accomedate user file upload

const ItemForm = () => {


 const ItemValues = {
    itemName: "",
    description:"",
    imageUrl: "",
    price: "",
    formType: ""
}

    const [itemFormData, setItemFormData] = useState(ItemValues);

    const [toggleModal, setToggleModal] = useState(false);

    const { itemName, description, imageUrl, price, formType } = itemFormData;

    const { addItemForSale, addItemSearchingFor, addItemPurchased } = useContext(ItemContext);

    function handleChange (e) {
        const { name, value } = e.target;
        setItemFormData(prevData => ({
            ...prevData,
            [name]: value
        }))

    }

    function handleSubmit (e) {
        e.preventDefault();
            if(formType === "for-sale") {
               addItemForSale(itemFormData);
            } else if (formType === "searching-for"){
                 addItemSearchingFor(itemFormData);
            }
                setItemFormData(ItemValues);
                setToggleModal(true);
    }

    function handleModal () {
        setToggleModal(prev => !prev);
    }


return (
<>
    {toggleModal && <RedirectModal handleModal={handleModal} />}

    <div className="item--form--container">
            <form 
            onSubmit={handleSubmit}
            className='item-form'>

                <input
                type='text'
                onChange={handleChange}
                required
                value={itemName}
                placeholder='Item Name'
                name="itemName"
                />


                <input
                type='text'
                onChange={handleChange}
                required
                placeholder='imageUrl'
                value={imageUrl}
                name='imageUrl'
                />

                <input 
                type="number"
                onChange={handleChange}
                required
                value={price}
                name='price'
                placeholder='price'
                />

                <textarea
                type='text'
                onChange={handleChange}
                required
                value={description}
                placeholder='item description'
                name='description'
                maxLength={100}
                />
                <fieldset>
                    <legend>Select One</legend>
                    <input
                    type="radio"
                    onChange={handleChange}
                    value="for-sale"
                    id='for-sale'
                    checked={formType === "for-sale"}
                    required
                    name='formType'
                    />
                    <label htmlFor="for-sale" >For Sale</label>

                    <label htmlFor="searching-for" >Searching For</label>
                    <input
                    type="radio"
                    onChange={handleChange}
                    value="searching-for"
                    id='searching-for'
                    checked={formType === "searching-for"}
                    name='formType'
                    />
                </fieldset>

                <button>
                    Submit
                </button>
            </form>
    </div>
</>
)
}
 
export default ItemForm
/*

<input 
type="radio"
id="unemployed"
name="employment"
value="unemployed"
checked={formData.employment === "unemployed"}
onChange={handleChange}
/>

*/