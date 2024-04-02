
const mongoose = require('mongoose')

const dotenv = require('dotenv')
dotenv.config()

const connectToDB = async () => {
    await mongoose.connect(process.env.LOCAL_URI)
}

const database = mongoose.connection
database.on('error', (error) => {
    console.log('error');
    console.log(error.message);
})

database.once('connected', () => {
    console.log('connection succeed!');
})

module.exports = connectToDB