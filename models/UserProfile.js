const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    itemOwner: {
        type: Schema.Types.ObjectId,
        ref: "UserProfile",
        required: true
    },
    available: {
        type: Boolean,
        default: true,
    }
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
    mailingAddress: {
        type: String,
        required: true,
        lowercase: true
    },
    phoneNumber: {
        type: Number,
        required: true
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
    shoppingCart: [String],
    reputation: {
        type: Number,
        enum: {
            values: [1, 2, 3, 4, 5],
            message: '{VALUE} is not supported'
        }
    }
})

module.exports = mongoose.model('UserProfile', userProfileSchema)