
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const AdvertiserRouter = require('./api/routes/Advertiser')
const ApartmentRouter = require('./api/routes/Apartment')
const CategoryRouter = require('./api/routes/Category')
const CityRouter = require('./api/routes/City')
const ClientRouter = require('./api/routes/Client')
const cors = require('cors');
const getToDoList = require('./api/requests')
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
// mongoose.connect
// (process.env.LOCAL_URI, connectionParams)
  // .then(() => {
  //     console.log('connected')
  // })
  // .catch((err) => {
  //     console.log('Error:' + err)
  // })

// connectToDB()
// app.get('/todo', getToDoList)
app.use('/Apartment', ApartmentRouter)
app.use('/Advertiser',AdvertiserRouter)
app.use('/Category',CategoryRouter)
app.use('/City',CityRouter)
app.use('/Client',ClientRouter)

app.listen(3002, () => {
    console.log(`my app is listening in http//:localhost:3002`);
})