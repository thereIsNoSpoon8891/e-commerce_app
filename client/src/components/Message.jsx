import { useContext } from 'react';
import { MessageContext } from '../context/MessageProvider';


const Message = props => {

    const { to, receiverId, from, senderId, body, message_id, boxType } = props;

    const { deleteInboxMessage, deleteOutboxMessage } = useContext(MessageContext);

    function handleDelete() {
        if (boxType === "inbox"){
            deleteInboxMessage(message_id)
        } else if(boxType === "outbox"){
            deleteOutboxMessage(message_id)
        }
    }

    
return (
<div className="message">
    <p>
       From: {from}
    </p>
    <p>
        {body}
    </p>
    <div className="message-buttons">
        <button>
            Reply
        </button>
        <button onClick={handleDelete}>
            Delete
        </button>
    </div>
</div>
)
}
 
export default Message