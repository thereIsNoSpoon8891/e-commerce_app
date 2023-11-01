import { useState, useContext, useEffect } from 'react'
import { ItemContext } from '../context/ItemProvider'
import { storage } from '../../firebase';
import { DEFAULT_SALE_IMAGE, DEFAULT_WANTED_IMAGE } from '../assets/defaultImage';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {v4 as id_gen} from 'uuid'
import RedirectModal from './RedirectModal'


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

    const [image, setImage] = useState(null);

    const { itemName, description, imageUrl, price, formType } = itemFormData;

    const { addItemForSale, addItemSearchingFor, addItemPurchased } = useContext(ItemContext);

    // on-change handles
    function handleChange (e) {
        const { name, value } = e.target;
        setItemFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    function handleImageUpload(e){
        setImage(e.target.files[0]);
    }

    // modal handle
    function handleModal () {
        setToggleModal(prev => !prev);
    }

    // set default image handle
    function handleImageAndSubmit(e) {
        e.preventDefault();
        if(!image) {
            if(itemFormData.formType === "for-sale"){
                setItemFormData(prev => ({...prev, imageUrl: DEFAULT_SALE_IMAGE}));
            } else if (itemFormData.formType === "searching-for") {
                setItemFormData(prev => ({...prev, imageUrl: DEFAULT_WANTED_IMAGE}));
            }
            // something here to force a re-render, to make sure state is updated before submit
        } else if (image) {
            handleImageUploadbeforeSubmit();
        }
    }

    // handle upload and submit
    function handleImageUploadbeforeSubmit() {

        const imageRef = ref(storage, `item_images/${ image.name + id_gen() }` );
        uploadBytes(imageRef, image)
            .then(() => {
                getDownloadURL(imageRef)
                    .then(url => {
                        setItemFormData(prev => ({...prev, imageUrl: url}));
                        console.log(url)
                        //something here to force a re-render to make sure state is updated before submit
                    })// set this URL as the image URL
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    function handleSubmit () {

            if(formType === "for-sale") {
               addItemForSale(itemFormData);
            } else if (formType === "searching-for"){
                 addItemSearchingFor(itemFormData);
            }
    }

    useEffect(() => {
        if (itemFormData.imageUrl) {
            handleSubmit();
            setItemFormData(ItemValues);
            setToggleModal(true);
            setImage(null);
        }
    }, [itemFormData])



return (
<>
    {toggleModal && <RedirectModal handleModal={handleModal} />}

    <div className="item--form--container">
            <form 
            onSubmit={handleImageAndSubmit}
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
                type="number"
                onChange={handleChange}
                required
                value={price}
                name='price'
                placeholder='price'
                />

                <input
                type='file'
                onChange={handleImageUpload}
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

                <button type='submit'>
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