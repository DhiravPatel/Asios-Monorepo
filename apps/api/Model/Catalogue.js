const mongoose = require('mongoose')

const catalogueSchema = new mongoose.Schema({
  cataloguecategory: {
    type: String,
    required: true, 
    trim: true,     
  },
  cataloguesubcategory: {
    type: String,
    required: true, 
    trim: true,     
  },
  name: {
    type: String,
    required: true, 
    trim: true,     
  },
  link: {
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

const Catalogue = mongoose.model('Catalogue', catalogueSchema)

module.exports = Catalogue
