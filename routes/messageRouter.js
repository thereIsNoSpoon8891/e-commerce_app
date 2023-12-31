const express = require('express')
const messageRouter = express.Router()
const { UserProfile, Message  } = require('../models/UserProfile')

// we need a route to update the user profile inbox and outbox
messageRouter.route("/get-messages")
.get((req, res, next) => {
    UserProfile.findOne({_id: req.auth._id}, 'mailBox')
        .then(mailbox => {
            if(!mailbox){
                res.status(404)
                return res.send("Nothing found")
            }
            res.status(200).send(mailbox)
        })
        .catch(err => next(err))
})
///////////// REWRITTEN WITH Promise.all /////////
messageRouter.route("/send-message/:recipient_id")
.post((req, res, next) => {

    req.body.senderId = req.auth._id;
    req.body.receiverId = req.params.recipient_id;

    Promise.all([
        UserProfile.findById({_id: req.auth._id}),
        UserProfile.findById({_id: req.params.recipient_id})
    ])
    .then(([senderProfile, receiverProfile]) => {
        
        if (!senderProfile) {
            throw new Error("from message router: sender profile not found")
        }

        if (!receiverProfile) {
            throw new Error("from message router: receiver profile not found")
        }

        req.body.senderId = senderProfile._id;
        req.body.from = senderProfile.displayName;
        req.body.receiverId = receiverProfile._id;
        req.body.to = receiverProfile.displayName;
        
        const newMessage = new Message(req.body);

        return newMessage.save();

    })
    .then(savedMessage => {

        return Promise.all([// if you need to use dot notation, you must use "" for mongoose
            UserProfile.findByIdAndUpdate({_id: req.auth._id}, {$push: {"mailBox.outbox": savedMessage}}, {new:true}),
            UserProfile.findByIdAndUpdate({_id: req.params.recipient_id}, {$push: {"mailBox.inbox": savedMessage}}, {new:true})
        ]);

    })
    .then(([senderUpdatedProfile, receiverUpdatedProfile]) => {

        res.status(201).send({
            sender: senderUpdatedProfile.mailBox.outbox, 
            receiver: receiverUpdatedProfile.mailBox.inbox 
        });

    })
    .catch(err => next(err));
});

messageRouter.route("/delete-outbox-message/:message_id")
.delete((req, res, next) => {

    Promise.all([
        UserProfile.updateOne({_id: req.auth._id}, {$pull:{"mailBox.outbox":{_id: req.params.message_id}}}),
        Message.findByIdAndRemove(req.params.message_id)
    ])
    .then(([deletedMessage, updatedProfile]) => res.status(204).send("Message deleted"))
    .catch(err => next(err))
})

messageRouter.route("/delete-inbox-message/:message_id")
.delete((req, res, next) => {
    
    Promise.all([
        UserProfile.updateOne({_id: req.auth._id}, {$pull:{"mailBox.inbox":{_id: req.params.message_id}}}),
        Message.findByIdAndRemove(req.params.message_id)
    ])
    .then(([deletedMessage, updatedProfile]) => res.status(204).send("Message deleted"))
    .catch(err => next(err))
})

module.exports = messageRouter

// I need a sender and receiver NAME, Am I going to handle that here? or on the front?
// lets try from the front, if we can't make that work, we can come back here and pull the sender name
// from the token, and search the recipient ID and pull the name, which approach is better?