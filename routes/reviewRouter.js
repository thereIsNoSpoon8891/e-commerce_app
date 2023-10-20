const express = require('express')
const reviewRouter = express.Router()
const { userProfile } = require('../models/userProfile')
const jwt = require('jsonwebtoken')

reviewRouter.route("/review-profile/:reviewed_user_id")
.post((req, res, next) => {
// findByIdAndUpdate takes 3 arguments, 1. the _id, 2. update operations 3.options object
    userProfile.findByIdAndUpdate(
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
// Issue.updateOne(
//     {_id: req.params.issueId,
//     voters:{$ne: req.auth._id}}, //only allows operation if user id is NOT present
//     {$inc: {downvotes: 1},
//      $addToSet:{voters: req.auth._id}})
//     .then(updatedIssue => res.status(201).send(updatedIssue))
//     .catch(err => next(err))