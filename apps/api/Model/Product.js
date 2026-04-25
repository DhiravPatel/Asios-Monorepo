const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  productName: {
      type: String,
      required: true
  },
  category: {
      type: String,
      required: true 
  },
  subcategory:{
      type:String,
      required:true
  },
  image: {
      type: String,
      required: true
  },
  details: {
    type: Object, 
    required: false
},
  createdAt: {
      type: Date,
      default: Date.now
  },
  updatedAt: {
      type: Date,
      default: Date.now
  }
})


const Product = mongoose.model('Product', productSchema)

module.exports = { Product}