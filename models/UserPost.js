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
    post: {
        type: Schema.Types.ObjectId,
        ref: "UserPost",
        required: true
    },
    available: Boolean
})

const userPostSchema = new Schema({
    postedDate: {
        type: Date,
        date: Date.now()
    },
    title: {
        type: String,
        required: true
    },
    postType: {
        type:String,
        enum: {
            values: ['Selling', 'Searching']
        }
    },
    item: itemSchema
})

module.exports = mongoose.model('UserPost', userPostSchema)