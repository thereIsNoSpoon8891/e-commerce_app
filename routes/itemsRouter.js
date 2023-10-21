const express = require('express')
const itemsRouter = express.Router()
const { userProfile } = require('../models/userProfile')
const { item } = require('../models/userProfile')

itemsRouter.route("/add-item-for-sale")
.post((req, res, next) => {

    req.body.itemOwner = req.auth._id

        const newItem = new item(req.body)
            newItem.save()
                .then(item => {
                    userProfile.findByIdAndUpdate({_id: req.auth._id}, {$push: {itemsForSale: item}},{new: true})
                        .then(updatedProfile => res.status(201).send(updatedProfile.itemsForSale))
                        .catch(err => next(err))
                })
                .catch(err => next(err))
})

itemsRouter.route("/add-item-searching-for")
.post((req, res, next) => {

    req.body.itemOwner = req.auth._id

        const newItem = new item(req.body)
            newItem.save()
                .then(item => {
                    userProfile.findByIdAndUpdate({_id: req.auth._id}, {$push: {itemsSearchingFor: item}},{new: true})
                        .then(updatedProfile => res.status(201).send(updatedProfile.itemsSearchingFor))
                        .catch(err => next(err))
                })
                .catch(err => next(err))
})

itemsRouter.route("/add-items-purchased")
.post((req, res, next) => {

    req.body.itemOwner = req.auth._id

    const newItem = new item(req.body)
        newItem.save()
            .then(item => {
                userProfile.findByIdAndUpdate({_id: req.auth._id}, {$push: {itemsPurchased: item}},{new: true})
                    .then(updatedProfile => res.status(201).send(updatedProfile.itemsPurchased))
                    .catch(err => next(err))
            })
            .catch(err => next(err))
})

itemsRouter.route("/delete-item-searching-for/:itemId")
.delete((req, res, next) => {

    userProfile.findByIdAndUpdate(req.auth._id, {$pull: {itemsSearchingFor: {_id: req.params.itemId}}}, {new: true})
        .then(profile => res.status(201).send(profile))
        .catch(err => next(err))

})

itemsRouter.route("/delete-item-for-sale/:itemId")// remove from itemsforsale
.delete((req, res, next) => {

    userProfile.findByIdAndUpdate(req.auth._id, {$pull: {itemsForSale: {_id: req.params.itemId}}}, {new: true})
        .then(profile => res.send(profile))
        .catch(err => next(err))
})

itemsRouter.route("/delete-item-purchased/:itemId")// remove from itemsforsale
.delete((req, res, next) => {

    userProfile.findByIdAndUpdate(req.auth._id, {$pull: {itemsPurchased: {_id: req.params.itemId}}}, {new: true})
        .then(profile => res.send(profile))
        .catch(err => next(err))
})

module.exports = itemsRouter














