const express = require('express')
const router = express.Router()
const { protect } = require('../middleWare/authMiddleware')
const { getUserProfile } = require('../controller/profileController')

router.get('/getProfile',protect,getUserProfile)

module.exports=router