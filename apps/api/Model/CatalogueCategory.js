const mongoose = require('mongoose')

const catalogueCategorySchema = new mongoose.Schema({
  cataloguecategory: {
    type: String,
    required: true, 
    trim: true,     
  },
}, {
  timestamps: true 
})

const CatalogueCategory = mongoose.model('CatalogueCategory', catalogueCategorySchema)

module.exports = CatalogueCategory
