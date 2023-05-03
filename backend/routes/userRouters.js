const {Router} = require('express')
const router = Router()
const multer = require('multer');
const {userController} = require('../controller');
const {protect} = require('../middleware')

router.post('/signup', userController.registerUser)
router.post('/login', userController.loginUser)
router.post('/verifyEmail', protect, userController.emailVerification)
router.get('/verifyEmail', protect, userController.reSendEmailVerification)


module.exports = router