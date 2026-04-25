const mongoose = require('mongoose')

const ProductInquirySchema = new mongoose.Schema({
  product_name: {
    type: String,
    trim: true,     
  },
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

const ProductInquiry = mongoose.model('ProductInquiry', ProductInquirySchema)

module.exports = ProductInquiry
