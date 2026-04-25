const express = require('express');
const router = express.Router();
const {catalogue_upload} = require('../Middleware/multerConfig')

const {AddCatalogue,GetAllCatalogue, GetCatalogueBySubcategory, DeleteCatalogue, EditCatalogue} = require('../Controller/Catalogue')

router.post('/addCatalogue', catalogue_upload.single('image'), AddCatalogue)
router.get('/getAllCatalogue', GetAllCatalogue)
router.delete('/deleteCatalogue/:id', DeleteCatalogue)
router.put('/editCatalogue/:id',catalogue_upload.single('image'), EditCatalogue)
router.get('/catalogueSubCategory/:cataloguesubcategory', GetCatalogueBySubcategory);

module.exports = router