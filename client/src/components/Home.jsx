import { useState, useContext, useEffect } from 'react';
import { ProfileContext } from '../context/ProfileProvider';
import { ItemContext } from '../context/ItemProvider';
import SaleItems from './SaleItems';
import SearchItems from './SearchItems';



const Home = () => {
 


    const { itemsForSale, itemsSearchingFor, controlItemsState } = useContext(ItemContext);

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
                forHome={true}
                itemForSaleInItemContextState={itemsForSale}
                 />)
    })

    const searchItems = itemsSearchingFor.map(item => {
        return (<SearchItems
                name={item.itemName}
                description={item.description}
                imageUrl={item.imageUrl}
                price={item.price}
                owner_id={item.itemOwner_id}
                owner_name={item.itemOwnerName}
                key={item._id}
                forHome={true}
                itemsWantedInItemContextState={itemsSearchingFor}
                 />)
    })

    useEffect(() => {
        controlItemsState()
    },[])

return (
<div className='home--wrapper'>
    <div className='selection--wrapper'>
        <h1 className={underline ? "underlined" : ""} onClick={showSaleItems}>
            For sale
        </h1>
        <h1 className={underline ? "" : "underlined"} onClick={showSearchItems}>
            Wanted 
        </h1>
    </div>
    <div className='list--container'>
        {toggleLists ? saleItems : searchItems}
    </div>

</div>
)
}
 
export default Home