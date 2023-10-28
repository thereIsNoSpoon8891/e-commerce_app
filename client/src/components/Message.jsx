import { useContext, useState } from 'react';
import { MessageContext } from '../context/MessageProvider';
import MessageForm from './MessageForm';

const Message = props => {

    const [toggleMessageForm, setToggleMessageForm] = useState(false);

    const { to, receiver_id, from, sender_id, body, message_id, boxType } = props;

    const { deleteInboxMessage, deleteOutboxMessage } = useContext(MessageContext);

    function handleDelete() {
        if (boxType === "inbox"){
            deleteInboxMessage(message_id)
        } else if(boxType === "outbox"){
            deleteOutboxMessage(message_id)
        }
    }



    function handleModal () {
        setToggleMessageForm(prev => !prev)
    }

return (
<>
    <div className="message">
        <p>
        From: {from}
        </p>
        <p>
            {body}
        </p>
        <div className="message-buttons">
            <button onClick={handleModal}>
                Reply
            </button>
            <button onClick={handleDelete}>
                Delete
            </button>
        </div>
    </div>
    {toggleMessageForm && 
    <MessageForm 
        sender_id={sender_id}
        handleModal={handleModal}
        from={to}
        to={from}
    />}
</>
)
}
 
export default Message