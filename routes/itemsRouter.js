const express = require('express')
const itemsRouter = express.Router()
const { UserProfile, Item  } = require('../models/UserProfile')


itemsRouter.route("/add-item-for-sale")
.post((req, res, next) => {

    req.body.itemOwner_id = req.auth._id

    UserProfile.findOne({_id: req.auth._id})
        .then(profile => {
            req.body.itemOwnerName = profile.displayName
            const newItem = new Item(req.body)
            newItem.save()
                .then(item => {
                    UserProfile.findByIdAndUpdate({_id: req.auth._id}, {$push: {itemsForSale: item}},{new: true})
                        .then(updatedProfile => res.status(201).send(updatedProfile.itemsForSale))
                        .catch(err => next(err))
                })
                .catch(err => next(err))
        })
        .catch(err => next(err))

})

itemsRouter.route("/add-item-searching-for")
.post((req, res, next) => {

    req.body.itemOwner_id = req.auth._id

    UserProfile.findOne({_id: req.auth._id})
    .then(profile =>  {
        req.body.itemOwnerName = profile.displayName
        const newItem = new Item(req.body)
        newItem.save()
            .then(item => {
                UserProfile.findByIdAndUpdate({_id: req.auth._id}, {$push: {itemsSearchingFor: item}},{new: true})
                    .then(updatedProfile => res.status(201).send(updatedProfile.itemsSearchingFor))
                    .catch(err => next(err))
            })
            .catch(err => next(err))
    })
    .catch(err => next(err))
})

itemsRouter.route("/add-items-purchased")
.post((req, res, next) => {
    // this needs to change, a purchased item should already have a itemOwner_id and itemOwnerName
    // could leave line 49, this will imply that this user is the NEW owner, 
    //the itemOwnerName will still be the original name
    req.body.itemOwner_id = req.auth._id

    const newItem = new Item(req.body)
        newItem.save()
            .then(item => {
                UserProfile.findByIdAndUpdate({_id: req.auth._id}, {$push: {itemsPurchased: item}},{new: true})
                    .then(updatedProfile => res.status(201).send(updatedProfile.itemsPurchased))
                    .catch(err => next(err))
            })
            .catch(err => next(err))
})

itemsRouter.route("/delete-item-searching-for/:itemId")
.delete((req, res, next) => {

const item_id = req.params.itemId;
const deleteItem = Item.findByIdAndRemove(item_id);
const removeItemFromProfile = UserProfile.findByIdAndUpdate(req.auth._id, {$pull: {itemsSearchingFor: {_id: req.params.itemId}}}, {new: true})

    Promise.all([ deleteItem, removeItemFromProfile ])
        .then(([deletedItem, updatedProfile])=> res.status(200).send("Item removed"))
        .catch(err => next(err))
})

itemsRouter.route("/delete-item-for-sale/:itemId")
.delete((req, res, next) => {

    Promise.all([
        UserProfile.findByIdAndUpdate(req.auth._id, {$pull: {itemsForSale: {_id: req.params.itemId}}}, {new: true}),
        Item.findByIdAndRemove(req.params.itemId)
     ])
     .then(([deletedItem, updatedProfile]) => res.status(200).send("Item removed"))
     .catch(err => next(err))
})

itemsRouter.route("/delete-item-purchased/:itemId")
.delete((req, res, next) => {

    Promise.all([
        UserProfile.findByIdAndUpdate(req.auth._id, {$pull: {itemsPurchased: {_id: req.params.itemId}}}, {new: true}),
        Item.findByIdAndRemove(req.params.itemId)
    ])
    .then(([deletedItem, updatedProfile]) => res.status(204).send("Item deleted"))
    .catch(err => next(err))
})

module.exports = itemsRouter




    // UserProfile.findByIdAndUpdate(req.auth._id, {$pull: {itemsSearchingFor: {_id: req.params.itemId}}}, {new: true})
    //     .then(profile => res.status(201).send(profile))
    //     .catch(err => next(err))









