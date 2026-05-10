const express = require('express');
const router = express.Router();
const { product_upload } = require('../Middleware/multerConfig.js')
const { publicCache } = require('../Middleware/cacheControl.js')

const {
  AddProduct,
  GetAllProducts,
  GetProductPageData,
  DeleteProduct,
  EditProduct,
  GetProductById,
} = require('../Controller/Product.js')

router.post('/addProduct', product_upload.single('image'), AddProduct)
router.get('/getAllProducts', publicCache(30), GetAllProducts)
router.get('/page-data', GetProductPageData)
router.get('/getProductById/:id', publicCache(120), GetProductById)
router.delete('/deleteProduct/:id', DeleteProduct)
router.put('/editProduct/:id', product_upload.single('image'), EditProduct)

module.exports = router
