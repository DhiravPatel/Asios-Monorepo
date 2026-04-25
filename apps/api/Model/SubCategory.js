const mongoose = require('mongoose')

const subcategorySchema = new mongoose.Schema({
    category: {
    type: String,
    required: true,      
    },
  subcategory: {
    type: String,
    required: true, 
    trim: true,     
  },
  image: {
    type: String,
    required: false,
    trim: true,      
  }
}, {
  timestamps: true 
})

const SubCategory = mongoose.model('SubCategory', subcategorySchema)

module.exports = SubCategory
