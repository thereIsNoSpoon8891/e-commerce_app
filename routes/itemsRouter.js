const express = require('express')
const itemsRouter = express.Router()
const { userProfile } = require('../models/userProfile')
const { item } = require('../models/userProfile')

itemsRouter.route("/add-item-for-sale/:id")
.post((req, res, next) => {

    req.body.itemOwner = req.auth._id


    const newItem = new item(req.body)
    newItem.save()
    .then(item => {
        userProfile.findById(req.params.id)// returning null
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


module.exports = itemsRouter














