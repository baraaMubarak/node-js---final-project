const express = require('express')
const router = express.Router()
const { protect1 } = require('../middleWare/authMiddleware.js')
const { getUserProfile, editProfile } = require('../controller/profileController')

// router.get('/getProfile', protect, getUserProfile)
// router.put('/editProfile', protect, editProfile)
protect1()
module.exports = router