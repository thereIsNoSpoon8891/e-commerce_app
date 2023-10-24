const express = require('express')
const reviewRouter = express.Router()
const { UserProfile } = require('../models/UserProfile')


reviewRouter.route("/review-profile/:reviewed_user_id")
.post((req, res, next) => {
// findByIdAndUpdate takes 3 arguments, 1. the _id, 2. update operations 3.options object
    UserProfile.findByIdAndUpdate(
        {_id: req.params.reviewed_user_id},
        {
            $addToSet: {reviewers: req.auth._id},
            $push: {reputation: req.body.reputation}
        },
        {new: true})
                .then(updatedProfile => res.status(201).send(updatedProfile.reputation))
                .catch(err => next(err))

})

module.exports = reviewRouter
