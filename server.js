const express = require('express');
const mongoose = require('mongoose');
const { expressjwt } = require('express-jwt');
const morgan = require('morgan')
require('dotenv').config();
const app = express();

app.use(express.json());
app.use(morgan('dev'));

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
    .then((res)=> console.log('Connected to E-commerce DB'))
    .catch((err)=> console.log(err))


app.use("/api/auth", require('./routes/authRouter'))
app.use("/api/auth", expressjwt({secret: process.env.SECRET, algorithms:['HS256'] }))
app.use("/api/auth/items", require('./routes/itemsRouter'))

// error handling
app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errorHandle: err.message})
})

app.listen(5174, () => {
    console.log('listening on port 5174')
})