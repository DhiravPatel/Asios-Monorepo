const express = require('express');
const router = express.Router();

const {AddCatalogueSubCategory,GetAllCatalogueSubCategory} = require('../Controller/CatalogueSubCategory.js')

router.post('/addCatalogueSubCategory', AddCatalogueSubCategory)
router.get('/getAllCatalogueSubCategory', GetAllCatalogueSubCategory)


module.exports = router