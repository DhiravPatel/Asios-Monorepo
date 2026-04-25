const mongoose = require('mongoose')

const catalogueSubCategorySchema = new mongoose.Schema({
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
}, {
  timestamps: true 
})

const CatalogueSubCategory = mongoose.model('CatalogueSubCategory', catalogueSubCategorySchema)

module.exports = CatalogueSubCategory
