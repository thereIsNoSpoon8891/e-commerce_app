const express = require('express')
const publicRouter = express.Router()
const { userProfile } = require('../models/userProfile')

publicRouter.route("/items-for-sale")
.get((req, res, next) => {

    userProfile.find({}, 'itemsForSale -_id')
        .then(docsArray => {
            const flattenedDocs = docsArray.map(doc => doc.itemsForSale).flat()
            res.status(200).send(flattenedDocs)
        })
        .catch(err => next(err))
})

publicRouter.route("/items-searching-for")
.get((req, res, next) => {
    userProfile.find({}, 'itemsSearchingFor -_id')
        .then(docsArray => {
            const flattenedDocs = docsArray.map(doc => doc.itemsSearchingFor).flat()
            res.status(200).send(flattenedDocs)
        })
        .catch(err => next(err))
})

module.exports = publicRouter