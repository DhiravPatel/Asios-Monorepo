const express = require('express');
const router = express.Router();

const {AddProductInquiry,GetProductInquiry,sendEmail } = require('../Controller/ProductInquiry.js')

router.post('/addProductInquiry', AddProductInquiry)
router.get('/getProductInquiry', GetProductInquiry)
router.post('/sendEmail', sendEmail);

module.exports = router