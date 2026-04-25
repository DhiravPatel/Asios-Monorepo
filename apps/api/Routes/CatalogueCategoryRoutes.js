const express = require('express');
const router = express.Router();

const {AddCatalogueCategory,GetAllCatalogueCategory} = require('../Controller/CatalogueCategory.js')

router.post('/addCatalogueCategory', AddCatalogueCategory)
router.get('/getAllCatalogueCategory', GetAllCatalogueCategory)


module.exports = router