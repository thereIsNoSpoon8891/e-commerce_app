


const Message = props => {

    const { to, receiverId, from, senderId, body } = props;
 
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
        <button>
            Delete
        </button>
    </div>
</div>
)
}
 
export default Message