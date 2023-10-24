const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const messageSchema = new Schema({
    to: {
        type: String,
        required: true
    },
    receiverId: {
        type: Schema.Types.ObjectId,
        ref: "UserProfile",
        required: true
    },
    from: {
        type: String,
        required: true
    },
    senderId: {
        type: Schema.Types.ObjectId,
        ref: "UserProfile",
        required: true
    },
    body: {
        type: String,
        required: true
    },
},
{
    timestamps: true
})

const itemSchema = new Schema({
    itemName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    itemOwner_id: {
        type: Schema.Types.ObjectId,
        ref: "UserProfile",
        required: true
    },
    itemOwnerName: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        default: true,
    },
},
{
    timestamps: true
})

const userProfileSchema = new Schema({
    displayName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true,
        lowercase: true
    },
    lastName: {
        type: String,
        required: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    reviewers: [String],
    displayImage: String,
    itemsForSale:{
        type: [itemSchema]
    },
    itemsPurchased: {
        type: [itemSchema]
    },
    itemsSearchingFor: {
        type: [itemSchema]
    },
    mailBox: {
        inbox: [messageSchema],
        outbox: [messageSchema]
    },
    reputation: {
        type: [Number],
        enum: {
            values: [1, 2, 3, 4, 5]
        }
    }
})


// Pre-save hook to encrypt password on signup
userProfileSchema.pre("save", function(next){
    const user = this
        if(!user.isModified("password"))return next()
            bcrypt.hash(user.password, 10, (err, hash) =>{
                if(err) return next(err)
                    user.password = hash
                        next()
            })
})
// method to check encrpted password on login
userProfileSchema.methods.checkPassword = function (passwordAttempt, callback){
    bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
        if(err) return callback(err)
        return callback(null, isMatch)
    })
}
// method to remove user's pssword for token/sending the response
userProfileSchema.methods.withoutPassword = function (){
    const user = this.toObject()
        delete user.password
            return user

}
/////////////////////////password reset///////////////
// function to send token for password reset
userProfileSchema.methods.createPasswordResetToken = function () {
    const resetToken = jwt.sign({id: this._id}, process.env.SECRET, {expiresIn: '10m'})
    return resetToken
}

const UserProfle = mongoose.model('UserProfile', userProfileSchema)
const Message = mongoose.model('Message', messageSchema)
const Item = mongoose.model('Item', itemSchema)

module.exports = {
    UserProfle,
    Message,
    Item
}