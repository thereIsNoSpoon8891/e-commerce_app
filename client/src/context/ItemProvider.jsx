import { useState, createContext, useEffect } from 'react';
import axios from 'axios';

const ItemContext = createContext();

const axiosAddCredentials = axios.create();

axiosAddCredentials.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
        config.headers.Authorization = `Bearer ${token}`
        return config
})


const ItemContextProvider = ({children}) => {

const [itemsForSale, setItemsForSale] = useState([]);

const [itemsSearchingFor, setItemsSearchingFor] = useState([]);

function addItemForSale (item) {
    axiosAddCredentials.post("/api/auth/items/add-item-for-sale", item)
        .then(res => getForSaleItems())
        .catch(err => console.log(err))
}

function addItemSearchingFor (item) {
    axiosAddCredentials.post("/api/auth/items/add-item-searching-for", item)
        .then(res => getSearchingForItems())
        .catch(err => console.log(err))
}

// add to purchased items will need to be controlled by te user.
function addItemPurchased (item) {
    axiosAddCredentials.post("/api/add-items-purchased", item)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
}

function getForSaleItems() {
    axios.get("/api/public/items-for-sale")
    .then(res => setItemsForSale( res.data ))
    .catch(err => console.log(err))
}

function getSearchingForItems () {
    axios.get("/api/public/items-searching-for")
    .then(res => setItemsSearchingFor( res.data ))
    .catch(err => console.log(err))
}

useEffect(() => {

getForSaleItems();
getSearchingForItems();

}, [])


return (
<ItemContext.Provider
value={{
    itemsForSale,
    itemsSearchingFor,
    addItemForSale,
    addItemSearchingFor,
    addItemPurchased
}}
>
    {children}
</ItemContext.Provider>
)
}
 
export { ItemContextProvider, ItemContext }