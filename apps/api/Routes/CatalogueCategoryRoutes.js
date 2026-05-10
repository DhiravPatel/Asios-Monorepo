const express = require('express');
const router = express.Router();
const { publicCache } = require('../Middleware/cacheControl.js')

const {AddCatalogueCategory,GetAllCatalogueCategory} = require('../Controller/CatalogueCategory.js')

router.post('/addCatalogueCategory', AddCatalogueCategory)
router.get('/getAllCatalogueCategory', publicCache(120), GetAllCatalogueCategory)


module.exports = router