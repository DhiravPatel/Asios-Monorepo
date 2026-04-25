const express = require('express');
const router = express.Router();
const { subcategory_upload } = require('../Middleware/multerConfig.js')

const {
  AddSubCategory,
  GetAllSubCategories,
  DeleteSubCategory,
  EditSubCategory,
} = require('../Controller/SubCategory.js')

router.post('/addSubCategory', subcategory_upload.single('image'), AddSubCategory)
router.get('/getAllSubCategories', GetAllSubCategories)
router.delete('/deleteSubCategory/:id', DeleteSubCategory)
router.put('/editSubCategory/:id', subcategory_upload.single('image'), EditSubCategory)

module.exports = router
