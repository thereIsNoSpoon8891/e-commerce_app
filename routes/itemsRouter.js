const express = require('express')
const itemsRouter = express.Router()
const jwt = require('jsonwebtoken')
const { userProfile } = require('../models/userProfile')
const { item } = require('../models/userProfile')

itemsRouter.route("/add-item-for-sale")
.post((req, res, next) => {

    req.body.itemOwner = req.auth._id// create the relational id to the item
    let token = req.headers.authorization
    if(token.startsWith('Bearer')) {// get rid of extra string chars, we just want the token so we can decode
        token = token.slice(7, token.length)
    }
    let decodedToken = jwt.decode(token)// decode the token fromm the logged in user
    let profile_id = decodedToken._id// now we have the _id property of the profile

    const newItem = new item(req.body)
    newItem.save()
    .then(item => {
        userProfile.findById(profile_id)
            .then(profile =>{ 
                if(!profile){
                    res.status(404)
                    return next(new Error('Profile not found'))
                }
                profile.itemsForSale.push(item)
                    profile.save()
                    .then(savedProfile => {
                        res.status(201).send(`new item ${item.itemName} added to profile ${savedProfile.displayName}`)
                    })
                    .catch(err => next(err))
            })
            .catch(err => next(err))
    })
    .catch(err => next(err))
})

itemsRouter.route("/delete-item-for-sale/:itemId")
.delete((req, res, next) => {
    let item_id = req.params.itemId// id of item we want to remove
    let token = req.headers.authorization
    if(token.startsWith('Bearer')) {// get rid of extra string chars, we just want the token so we can decode
        token = token.slice(7, token.length)
    }
    let decodedToken = jwt.decode(token)// decode the token fromm the logged in user
    let profile_id = decodedToken._id// now we have the _id property of the profile

    userProfile.findByIdAndUpdate(profile_id, {$pull: {itemsForSale: {_id: item_id}}}, {new: true})
        .then(profile => res.send(profile))
        .catch(err => next(err))
})

itemsRouter.route("/add-item-searching-for")
.post((req, res, next) => {
    req.body.itemOwner = req.auth._id
    let token = req.headers.authorization
    if(token.startsWith('Bearer')) {// get rid of extra string chars, we just want the token so we can decode
        token = token.slice(7, token.length)
    }
    let decodedToken = jwt.decode(token)// decode the token fromm the logged in user
    let profile_id = decodedToken._id// now we have the _id property of the profile
        const newItem = new item(req.body)
            newItem.save()
                .then(item => {
                    userProfile.findById(profile_id)
                        .then(profile => {
                            if(!profile){
                                res.status(404)
                                return next(new Error('Profile not found'))
                            }
                            profile.itemsSearchingFor.push(item)
                            profile.save()
                            .then(savedProfile => {
                                res.status(201).send(`new item ${item.itemName} added to profile ${savedProfile.displayName}`)
                            })
                            .catch(err => next(err))
                        })

                })
                .catch(err => next(err))

})

module.exports = itemsRouter














