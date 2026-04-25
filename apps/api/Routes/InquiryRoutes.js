const express = require('express');
const router = express.Router();

const {AddInquiry,GetInquiry, sendEmail } = require('../Controller/Inquiry.js')

router.post('/addInquiry', AddInquiry)
router.get('/getInquiry', GetInquiry)
router.post('/sendEmail', sendEmail);

module.exports = router