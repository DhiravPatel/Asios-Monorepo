const mongoose = require('mongoose')

const catalogueSchema = new mongoose.Schema({
  cataloguecategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CatalogueCategory',
    required: true,
    index: true,
  },
  cataloguesubcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CatalogueSubCategory',
    required: true,
    index: true,
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
