const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
    index: true,
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubCategory',
    required: true,
    index: true,
  },
  image: {
    type: String,
    required: true,
  },
  details: {
    type: Object,
    required: false,
  },
}, {
  timestamps: true,
})

const Product = mongoose.model('Product', productSchema)

module.exports = { Product }
