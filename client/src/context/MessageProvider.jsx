import { createContext } from 'react';
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
    function sendMessage (receiver_id, message) {
        axiosAddCredentials.post(`/api/auth/message/send-message/${receiver_id}`, message)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }

    function deleteInboxMessage (message_id) {
        axiosAddCredentials.delete(`/api/auth/message/delete-inbox-message/${message_id}`)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }

    function deleteOutboxMessage (message_id) {
        axiosAddCredentials.delete(`/api/auth/message/delete-outbox-message/${message_id}`)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }

return (
<MessageContext.Provider value={{
    sendMessage,
    deleteInboxMessage,
    deleteOutboxMessage

}}>
    {children}
</MessageContext.Provider>
)
}
 
export {MessageContextProvider, MessageContext}