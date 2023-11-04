import { useState, useContext, useEffect } from 'react';
import { ProfileContext } from '../context/ProfileProvider';
import { ItemContext } from '../context/ItemProvider';
import SaleItems from './SaleItems';
import SearchItems from './SearchItems';



const Home = () => {
 


    const { itemsForSaleItemContext, itemsWantedItemContext, controlItemsState } = useContext(ItemContext);

    const [toggleLists, setToggleLists] = useState(true);

    const [underline, setUnderline] = useState(true);

    function showSaleItems() {
        setToggleLists(true);
        setUnderline(true);
    }

    function showSearchItems() {
        setToggleLists(false);
        setUnderline(false);
    }

    const saleItems = itemsForSaleItemContext.map(item => {
        return (<SaleItems
                name={item.itemName}
                description={item.description}
                imageUrl={item.imageUrl}
                price={item.price}
                owner_id={item.itemOwner_id}
                owner_name={item.itemOwnerName}
                key={item._id}
                forHome={true}
                itemForSaleInItemContextState={itemsForSaleItemContext}
                 />)
    })

    const searchItems = itemsWantedItemContext.map(item => {
        return (<SearchItems
                name={item.itemName}
                description={item.description}
                imageUrl={item.imageUrl}
                price={item.price}
                owner_id={item.itemOwner_id}
                owner_name={item.itemOwnerName}
                key={item._id}
                forHome={true}
                itemsWantedInItemContextState={itemsWantedItemContext}
                 />)
    })

    useEffect(() => {
        controlItemsState()
    }, [])

    useEffect(() => {
        // This is my dirty way of handling setting the data for props across components,
        // otherise if the user goes straight to their profile page, some of the data is undefined
        // working on learning how to handle this in a cleaner way....
        const forceRender = setTimeout(() => {
            setUnderline(false);
            setToggleLists(false);
        }, 500);
        return () => clearTimeout(forceRender)
    }, [])

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