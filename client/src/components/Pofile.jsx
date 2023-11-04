import { useContext, useEffect, useState } from 'react';
import { ProfileContext } from '../context/ProfileProvider';
import { ItemContext } from '../context/ItemProvider';
import SearchItems from './SearchItems';
import Message from './Message';
import SaleItems from './SaleItems';
import axios from 'axios';
import refresharrow from '../assets/arrows-rotate-solid.svg';

const axiosAddCredentials = axios.create();

axiosAddCredentials.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
        config.headers.Authorization = `Bearer ${token}`
        return config
})

const Profile = () => {

const [mailbox, setMailbox] = useState([]);

const { 
    profile, 
    editProfileForSaleItemsState, 
    editProfileSearchingItemsState 
    } = useContext(ProfileContext);

const { 
    displayName, 
    firstName, 
    lastName, 
    email, 
    itemsPurchased, 
    reputation, 
    itemsForSale, 
    itemsSearchingFor 
    } = profile;

    const { 
        deleteItemForSale,
        deleteItemSearchingFor, 
        updateForSaleItemsArrayInState,
        updateSearchingForItemsInItemContext,
        controlItemsState,
        itemsForSaleItemContext,
        itemsWantedItemContext
        } = useContext(ItemContext);

function getMessages() {
    axiosAddCredentials.get("/api/auth/message/get-messages")
        .then(res => setMailbox(res.data.mailBox))
        .catch(err => console.log(err))
}
// we have the same issue here as we did in the items context, its becoming clear that
// it should be convention to modify state in tandem with our API calls.
function removeInboxMessageInState(message_id) {
    const { inbox } = mailbox;
        const updatedInbox = inbox.filter(message => message._id !== message_id);
            setMailbox(prevData => ({
                ...prevData,
                inbox: updatedInbox
            }))
}

function removeOutboxMessageInState(message_id) {
    const { outbox } = mailbox;
        const updatedOutbox = outbox.filter(message => message._id !== message_id);
            setMailbox(prevData => ({
                ...prevData,
                outbox: updatedOutbox
            }))
}

useEffect(() => controlItemsState(), []);

useEffect(() => getMessages(), []);// get intial data

useEffect(() => {// keeps messages up to date if user doesn't un-mount component
    const intervalId = setInterval(() => {
        getMessages();
    }, 30000);
    return () => clearInterval(intervalId);// clean-up when component un-mounts
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
            removeInboxMessageInState={removeInboxMessageInState}
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
            removeOutboxMessageInState={removeOutboxMessageInState}
            boxType="outbox"
            />
}) : null

const profileSaleItems = itemsForSale.map(item => {
    return <SaleItems 
            name={item.itemName}
            description={item.description}
            imageUrl={item.imageUrl}
            price={item.price}
            id={item._id}
            deleteItemForSale={deleteItemForSale}
            itemsForSaleInProfileState={itemsForSale}
            itemsForSaleItemContext={itemsForSaleItemContext}
            editProfileForSaleItemsState={editProfileForSaleItemsState}
            updateForSaleItemsArrayInState={updateForSaleItemsArrayInState}
            key={item._id}
            />
})

const profileWantedItems = itemsSearchingFor.map(item => {
    return <SearchItems
            name={item.itemName}
            description={item.description}
            imageUrl={item.imageUrl}
            price={item.price}
            id={item._id}
            deleteItemSearchingFor={deleteItemSearchingFor}
            editProfileSearchingItemsState ={editProfileSearchingItemsState }
            updateSearchingForItemsInItemContext={updateSearchingForItemsInItemContext}
            wantedItemsArrayInProfileState={itemsSearchingFor}
            itemsWantedItemContext={itemsWantedItemContext}
            itemType="wanted"
            key={item._id}
            />
})


return (
<>
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

            <h3>
                Inbox
            </h3>

            { inboxElements }

            </div>
            <img className='refresh-arrow' onClick={getMessages} src={refresharrow} width={50} />

        <div className='outbox'>

            <h3>
                Outbox
            </h3>

            { outboxElements }
            
        </div>

    </div>

    <span className='profile--manage-items'> <h1> Manage {displayName}'s Items </h1> </span>

    <div className='manage-items-for-sale'>
        
                    {/* sale items container */}
        <div className='profile--sale-items-container'> 
            <h1>
                Items for sale
            </h1>

            { profileSaleItems }

        </div>
                    {/* wanted items container */}
        <div className='profile--items-searching-for'>
            <h1>
                Wanted Items
            </h1>
            { profileWantedItems}
        </div>

    </div>

</div>

</>
)
}
 
export default Profile