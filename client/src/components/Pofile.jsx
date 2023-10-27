import { useContext, useEffect, useState } from 'react';
import { ProfileContext } from '../context/ProfileProvider';
import { MessageContext } from '../context/MessageProvider';
import Message from './Message';
import axios from 'axios';

const axiosAddCredentials = axios.create();

axiosAddCredentials.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
        config.headers.Authorization = `Bearer ${token}`
        return config
})

const Profile = () => {

const [mailbox, setMailbox] = useState([]);


const { profile } = useContext(ProfileContext);

const { displayName, firstName, lastName, email, itemsPurchased, reputation } = profile;


function getMessages () {
    axiosAddCredentials.get("/api/auth/message/get-messages")
        .then(res => setMailbox(res.data.mailBox))
        .catch(err => console.log(err))
}


useEffect(() => {
    getMessages();
}, [])


    const inboxElements = mailbox && mailbox.inbox ? mailbox.inbox.map(message => {
    return <Message 
            to={message.to}
            from={message.from}
            reciever_id={message.receiverId}
            sender_id={message.senderId}
            body={message.body}
            key={message._id}
            message_id={message._id}
            boxType="inbox"
            />
}) : null


const outboxElements = mailbox && mailbox.outbox ? mailbox.outbox.map(message => {
    return <Message 
            to={message.to}
            from={message.from}
            reciever_id={message.receiverId}
            sender_id={message.senderId}
            body={message.body}
            key={message._id}
            message_id={message._id}
            boxType="outbox"
            />
}) : null
// map reputaion and set average

return (
<div className="profile--container" >

    <div className='personal-data-container'>
       <u>PERSONAL DATA</u> 
        <p>
            Display Name: {displayName}
        </p>
        <p>
            First Name: {firstName}
        </p>
        <p>
            Last Name: {lastName}
        </p>
        <p>
            E-Mail: {email}
        </p>
        <p>
            Reputation: Average ratings
        </p>
    </div>

    <div className='mail-box--container'>

        <div className='inbox'>
            <h3>Inbox</h3>
            { inboxElements }
        </div>
        <button onClick={getMessages} >
            Refresh Mail Box
        </button>

        <div className='outbox'>
            <h3>
                Outbox
            </h3>
            { outboxElements }
        </div>

    </div>

</div>
)
}
 
export default Profile