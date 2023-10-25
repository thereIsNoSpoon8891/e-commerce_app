const express = require('express')
const authRouter = express.Router()
const jwt = require('jsonwebtoken')
const { UserProfile } = require('../models/UserProfile')

authRouter.route("/signup")
.post((req, res, next) => {

const requestedDisplayName = req.body.displayName;

requestedDisplayName.toLowerCase();

const requestedEmail = req.body.email;

requestedEmail.toLowerCase();

UserProfile.findOne({ $or: [ {displayName: requestedDisplayName}, {email: requestedEmail} ] })
    .then(user => {
            if(user){
                res.status(403)
                return next(new Error(`Sorry "${requestedDisplayName}", is not available OR This email is already in use.`))
            } 
            if (!user) {
                req.body.displayName.toLowerCase()
                const newUserProfile = new UserProfile(req.body)
                newUserProfile.save()
                    .then(userProfile => {
                        const token = jwt.sign(userProfile.withoutPassword(), process.env.SECRET)
                            res.status(201).send({token, profile: userProfile.withoutPassword()})
                    })
                    .catch(err => next(err))
            }
    })
    .catch(err => next(err))
})

authRouter.route("/login")
.post((req, res, next) => {

    UserProfile.findOne({displayName: req.body.displayName.toLowerCase()})
        .then(userProfile => {
            if(!userProfile){
                res.status(403)
                console.log("not found")
                return next(new Error("User Name or Password do not match!"))
            }
            userProfile.checkPassword(req.body.password, (err, isMatch) => {
                if(err){
                    console.log(err);
                    res.status(403)
                    return next(new Error("User Name or Password do not match!"))
                }
                if(!isMatch){
                    console.log('mismatch');
                    res.status(403)
                    return next(new Error("User Name or Password do not match!"))
                }
                const token = jwt.sign(userProfile.withoutPassword(), process.env.SECRET)
                    res.status(200).send({token, profile: userProfile.withoutPassword()})
            })
        })
        .catch(err => next(err))
})


module.exports = authRouter