const mongoose = require('mongoose')
require('dotenv').config()

const URI = process.env.DB_URI
async function connectToDatabase() {
    try{
        mongoose.connect(URI).then(() => {
            console.log('MongoDB connected successfully')
          })
          .catch(err => {
            console.error('MongoDB connection error:', err)
          });
    }catch (error) {
        console.error('Error connecting to MongoDB:', error)
      }
}
module.exports=connectToDatabase