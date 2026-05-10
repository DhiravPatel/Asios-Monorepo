const express = require('express');
const router = express.Router();
const { subcategory_upload } = require('../Middleware/multerConfig.js')
const { publicCache } = require('../Middleware/cacheControl.js')

const {
  AddSubCategory,
  GetAllSubCategories,
  GetSubCategoryPageData,
  DeleteSubCategory,
  EditSubCategory,
} = require('../Controller/SubCategory.js')

router.post('/addSubCategory', subcategory_upload.single('image'), AddSubCategory)
router.get('/getAllSubCategories', publicCache(60), GetAllSubCategories)
router.get('/page-data', GetSubCategoryPageData)
router.delete('/deleteSubCategory/:id', DeleteSubCategory)
router.put('/editSubCategory/:id', subcategory_upload.single('image'), EditSubCategory)

module.exports = router
