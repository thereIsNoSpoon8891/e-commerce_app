import { createContext, useState } from 'react';
import axios from "axios";

const MessageContext = createContext();

const axiosAddCredentials = axios.create();

axiosAddCredentials.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
        config.headers.Authorization = `Bearer ${token}`
        return config
})

const MessageContextProvider = ({children}) => {

    // send, receive and delete messages
 
return (
<MessageContext.Provider value={{

}}>
    {children}
</MessageContext.Provider>
)
}
 
export default MessageContextProvider