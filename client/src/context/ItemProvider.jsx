import { useState, createContext, useEffect } from 'react'
import axios from 'axios';

const ItemContext = createContext();

const ItemContextProvider = ({children}) => {

const [itemsForSale, setItemsForSale] = useState([]);

const [itemsSearchingFor, setItemsSearchingFor] = useState([]);



useEffect(() => {
    axios.get("/api/public/items-for-sale")
        .then(res => setItemsForSale( res.data ))
        .catch(err => console.log(err))

    axios.get("/api/public/items-searching-for")
        .then(res => setItemsSearchingFor( res.data ))
        .catch(err => console.log(err))

}, [])



 // flatten the arrays!!!
return (
<ItemContext.Provider
value={{
    itemsForSale,
    itemsSearchingFor
}}
>
    {children}
</ItemContext.Provider>
)
}
 
export { ItemContextProvider, ItemContext }