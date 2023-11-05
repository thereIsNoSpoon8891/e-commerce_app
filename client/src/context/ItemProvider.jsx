import { useState, createContext, useEffect, useContext } from 'react';
import { ProfileContext } from './ProfileProvider';
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

function getSearchingForItems() {
    axios.get("/api/public/items-searching-for")
    .then(res => setItemsSearchingFor( res.data ))
    .catch(err => console.log(err))
}

function deleteItemForSale(item_id) {
    axiosAddCredentials.delete(`/api/auth/items/delete-item-for-sale/${item_id}`)
    .then(res => {
        console.log(res)
    })
    .catch(err => console.log(err))
}

function deleteItemSearchingFor(item_id) {
    axiosAddCredentials.delete(`/api/auth/items/delete-item-searching-for/${item_id}`)
    .then(res => {
        console.log(res)
    })
    .catch(err => console.log(err))
}
/////////////////////////////
function updateForSaleItemsArrayInState(itemsArray, item_id) {
    const updatedArray = itemsArray.filter(item => item._id !== item_id);
        setItemsForSale(updatedArray);
}

function updateSearchingForItemsInItemContext(itemsArray, item_id) {
    const updatedArray = itemsArray.filter(item => item._id !== item_id);
        setItemsSearchingFor(updatedArray);
}
///////////////////////////
function controlItemsState () {
    getForSaleItems();
    getSearchingForItems();
}

useEffect(() => {
controlItemsState();
}, [])

return (
<ItemContext.Provider
value={{
    itemsForSaleItemContext: itemsForSale,
    itemsWantedItemContext: itemsSearchingFor,
    controlItemsState,
    addItemForSale,
    addItemSearchingFor,
    addItemPurchased,
    deleteItemForSale,
    deleteItemSearchingFor,
    updateForSaleItemsArrayInState,
    updateSearchingForItemsInItemContext
}}
>
    {children}
</ItemContext.Provider>
)
}
 
export { ItemContextProvider, ItemContext }