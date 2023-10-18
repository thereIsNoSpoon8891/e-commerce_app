const express = require('express')
const authRouter = express.Router()
const jwt = require('jsonwebtoken')
const UserProfile = require('..models/UserProfile')

authRouter.route("/signup")
.post((req, res, next) => {
    const requestedDisplayName = req.body.displayName


UserProfile.findOne({displayName: requestedDisplayName})
    .then(user => {
            if(user){
                res.status(403)
                return next(new Error(`Sorry ${requestedDisplayName}, is not available`))
            } else if(user.email === req.body.email) {
                res.status(403)
                return next(new Error(`Sorry that email is already in use`))
            }
    })
})







module.exports = authRouter