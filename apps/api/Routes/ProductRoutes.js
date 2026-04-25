const express = require('express');
const router = express.Router();
const {product_upload} = require('../Middleware/multerConfig.js')

const {AddProduct, GetAllProducts, DeleteProduct, EditProduct, GetProductsBySubCategory,GetProductById} = require('../Controller/Product.js')


router.post('/addProduct',product_upload.single('image'), AddProduct)
router.get('/getAllProducts', GetAllProducts)
router.get('/getProductBySubCategory/:subcategory', GetProductsBySubCategory)
router.get('/getProductById/:id', GetProductById)
router.delete('/deleteProduct/:id', DeleteProduct)
router.put('/editProduct/:id',product_upload.single('image'), EditProduct)

module.exports = router