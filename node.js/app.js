
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const cors = require('cors');
const connectToDB = require('./api/connectDB')

// const connectToDB = require('./api/connectDB')
  const app = express()
  app.use(bodyParser.json())
  dotenv.config()
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-Wit,Content-Type,Accept")
    next()
});
app.options('*',cors())

app.use('/uploads',express.static('uploads'))

const connectionParams = {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true,
  // ignoreDeprecated: true 
}
connectToDB()


app.listen(3002, () => {
    console.log(`my app is listening in http//:localhost:3002`);
})