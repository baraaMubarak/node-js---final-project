const express = require('express')
const router = express.Router()

const { getUserProfile, editProfile } = require('../controller/profileController')

// router.get('/getProfile', protect, getUserProfile)
// router.put('/editProfile', protect, editProfile)

module.exports = router