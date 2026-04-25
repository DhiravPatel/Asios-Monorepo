const mongoose = require('mongoose')

const inquirySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,     
  },
  email: {
    type: String,
    trim: true,      
  },
  phone: {
    type: Number,
    trim: true,      
  },
  message:{
    type: String,
  }
}, {
  timestamps: true 
})

const Inquiry = mongoose.model('Inquiry', inquirySchema)

module.exports = Inquiry
