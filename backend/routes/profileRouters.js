const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddle.js')
const { getUserProfile, editProfile } = require('../controller/profileController')

// router.get('/getProfile', protect, getUserProfile)
// router.put('/editProfile', protect, editProfile)

module.exports = router