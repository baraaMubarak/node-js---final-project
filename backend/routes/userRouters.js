const {Router} = require('express')
const router = Router()
const multer = require('multer');
const {userController} = require('../controller');
const {protect} = require('../middleware')

router.post('/signup', userController.registerUser)
    .post('/login', userController.loginUser)
    .post('/verifyEmail', protect, userController.emailVerification)
    .get('/verifyEmail', protect, userController.reSendEmailVerification)
    .post('/forgotPassword',userController.sendEmailToForget)
    .put('/changePassword',userController.changePassword)


module.exports = router