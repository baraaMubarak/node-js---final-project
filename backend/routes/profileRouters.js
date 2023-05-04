const {Router} = require('express')
const router = Router()
const {protect} = require('../middleware')
const {profileController} = require('../controller')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const timestamp = new Date().toISOString();
        const filename = timestamp + '_' + file.originalname;
        cb(null, filename.replaceAll(':','-'));
    }
  })
  
  const upload = multer({ storage: storage })
router.get('/getProfile', protect, profileController.getUserProfile)
router.put('/editProfile', upload.single('image'),protect, profileController.editProfile)

module.exports = router