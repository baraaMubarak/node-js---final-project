const express = require('express')
const router = express.Router()
const multer = require('multer');
const { regesturUser, loginUser, emailVirivication, reSendEmailVirivication } = require('../controller/userController')
const { protect } = require('../middleWare/authMiddleware')

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

router.post('/signup',upload.single('image'),regesturUser)
router.post('/login',loginUser)
router.post('/verifyEmail',protect,emailVirivication)
router.get('/verifyEmail',protect,reSendEmailVirivication)


module.exports=router