import { useState, useContext } from 'react';
import { ProfileContext } from '../context/ProfileProvider';
import { ItemContext } from '../context/ItemProvider';
import SaleItems from './SaleItems';
import SearchItems from './SearchItems';



const Home = () => {
 


    const { itemsForSale, itemsSearchingFor } = useContext(ItemContext);

    const [toggleLists, setToggleLists] = useState(true);

    const [underline, setUnderline] = useState(true);

    function showSaleItems () {
        setToggleLists(true);
        setUnderline(true);
    }

    function showSearchItems () {
        setToggleLists(false);
        setUnderline(false);
    }

    const saleItems = itemsForSale.map(item => {
        return (<SaleItems
                name={item.itemName}
                description={item.description}
                imageUrl={item.imageUrl}
                price={item.price}
                owner_id={item.itemOwner_id}
                owner_name={item.itemOwnerName}
                key={item._id}
                 />)
    })

    const searchItems = itemsSearchingFor.map(item => {
        return (<SearchItems
                name={item.itemName}
                description={item.description}
                imageUrl={item.imageUrl}
                price={item.price}
                owner_id={item.itemOwner}
                owner_name={item.itemOwnerName}
                key={item._id}
                 />)
    })

return (
<div className='home--wrapper'>
    <div className='selection--wrapper'>
        <h1 className={underline ? "underlined" : ""} onClick={showSaleItems}>
            For sale
        </h1>
        <h1 className={underline ? "" : "underlined"} onClick={showSearchItems}>
            Searching
        </h1>
    </div>
    <div className='list--container'>
        {toggleLists ? saleItems : searchItems}
    </div>

</div>
)
}
 
export default Home