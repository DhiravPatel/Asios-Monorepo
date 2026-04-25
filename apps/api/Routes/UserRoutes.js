const express = require('express')
const router = express.Router()

const {AddUser,LoginUser} = require('../Controller/User.js')

router.post('/addUser', AddUser)
router.post('/login', LoginUser)


module.exports = router