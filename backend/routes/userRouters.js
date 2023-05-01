const express = require('express')
const router = express.Router()
const multer = require('multer');
const { registerUser, loginUser, emailVerification, reSendEmailVerification } = require('../controller/userController')
const {protect} = require('../middleware/authMiddle.js')

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//         const timestamp = new Date().toISOString();
//         const filename = timestamp + '_' + file.originalname;
//         cb(null, filename.replaceAll(':','-'));
//     }
//   })

//   const upload = multer({ storage: storage })
// ,upload.single('image')

router.post('/signup', registerUser)
router.post('/login', loginUser)
router.post('/verifyEmail', protect, emailVerification)
router.get('/verifyEmail', protect, reSendEmailVerification)


module.exports = router