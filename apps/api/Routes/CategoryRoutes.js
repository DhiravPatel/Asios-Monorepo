const express = require('express');
const router = express.Router();
const {category_upload} = require('../Middleware/multerConfig.js')

const {AddCategory, GetAllCategories, DeleteCategory, EditCategory} = require('../Controller/Category.js')

router.post('/addCategory',category_upload.single('image'), AddCategory)
router.get('/getAllCategories', GetAllCategories)
router.delete('/deleteCategory/:id', DeleteCategory)
router.put('/editCategory/:id', category_upload.single('image'), EditCategory)

module.exports = router