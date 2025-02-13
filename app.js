
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require("helmet")
const hpp = require('hpp');
const rateLimit = require('express-rate-limit')
const mongoose = require('mongoose')
const path = require('path')

const router = require('./src/Routes/api');

const app = express()


//sequrity middleware 
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(mongoSanitize());
app.use(helmet())
app.use(hpp());
//request rate limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3000 // limit each IP to 100 requests per windowMs
});

app.use(limiter)

 
 


// mongoose.connect('mongodb://localhost:27017/DemoBikroy')
  mongoose.connect("mongodb+srv://bidyutsikder420:bidyutkumar@cluster0.mbahdsf.mongodb.net/DemoBikroy")
  .then(() => {
    console.log('connected to db')
  })
  .catch((e) => {
    console.log(e)
  })



//Routing  
app.use('/api/v1', router)


//introducing frontend to backend
app.use(express.static("client/dist"))

app.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
})




//error handler here
function errorHandler(err, req, res, next) {
  console.log("err")
  res.status(500)
  res.render('error', { error: err })
}

app.use(errorHandler)



module.exports = app
