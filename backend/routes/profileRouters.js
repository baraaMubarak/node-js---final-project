const {Router} = require('express')
const router = Router()
const {protect} = require('../middleware')
const {profileController} = require('../controller')

router.get('/getProfile', protect, profileController.getUserProfile)
router.put('/editProfile', protect, profileController.editProfile)

module.exports = router