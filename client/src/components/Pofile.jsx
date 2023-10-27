import { useContext } from 'react';
import { ProfileContext } from '../context/ProfileProvider';
import Message from './Message';

const Profile = () => {

const { profile } = useContext(ProfileContext);

const { displayName, firstName, lastName, email, itemsPurchased, mailBox, reputation } = profile;

const { inbox, outbox } = mailBox;

const inboxElements = inbox.map(message => {
    return <Message 
            to={message.to}
            from={message.from}
            reciever_id={message.receiverId}
            sender_id={message.senderId}
            body={message.body}
            key={message._id}
            />
})

const outboxElements = outbox.map(message => {
    return <Message 
            to={message.to}
            from={message.from}
            reciever_id={message.receiverId}
            sender_id={message.senderId}
            body={message.body}
            key={message._id}
            />
})
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
            {inboxElements}
        </div>

        <div className='outbox'>
            <h3>
                Outbox
            </h3>
            {outboxElements}
        </div>

    </div>

</div>
)
}
 
export default Profile