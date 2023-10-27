import { useState, useContext } from 'react';
import { MessageContext } from '../context/MessageProvider';

const MessageForm = props => {

    const { name, owner_id, owner_name, displayName, handleModal  } = props;


    const message = {
        body: ""
    }
    
    const [messageBody, setMessageBody] = useState(message);

    const { sendMessage } = useContext(MessageContext);

    function handleChange (e) {
        const { name, value } = e.target;
            setMessageBody(prev => ({
                ...prev,
                [name]: value
            }))
    }

    function handleSubmit () {
        sendMessage(owner_id, messageBody);
        setMessageBody(message);
        handleModal();
    }


return (
<div className="message-modal">
    <h3>
        {name}
    </h3>
    <p>To: {owner_name}</p>
    <textarea
    type='text'
    minLength={2}
    maxLength={400}
    placeholder='Send a message'
    value={messageBody.body}
    onChange={handleChange}
    className='message-body'
    name="body"
    required
    />
    <div>

        <button onClick={handleSubmit}>
            Send
        </button>

        <button onClick={handleModal}>
            Cancel
        </button>

    </div>
    <p>From: {displayName}</p>
</div>
)
}
 
export default MessageForm