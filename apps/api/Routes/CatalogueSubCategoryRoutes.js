const express = require('express');
const router = express.Router();
const { publicCache } = require('../Middleware/cacheControl.js')

const {AddCatalogueSubCategory,GetAllCatalogueSubCategory} = require('../Controller/CatalogueSubCategory.js')

router.post('/addCatalogueSubCategory', AddCatalogueSubCategory)
router.get('/getAllCatalogueSubCategory', publicCache(120), GetAllCatalogueSubCategory)


module.exports = router