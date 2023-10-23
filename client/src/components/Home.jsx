import { useState, useContext } from 'react'
import { DataContext } from '../context/DataProvider'
import ItemList from './ItemList'



const Home = () => {
 
    const { profile } = useContext(DataContext);

    

return (
<>
Home
</>
)
}
 
export default Home