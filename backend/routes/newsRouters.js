const {Router} = require('express')
const router = Router()
const {protect} = require('../middleware')
const {newsController} = require('../controller')

router.get('/home', newsController.getHomeNews)
router.get('/policy', newsController.getPolicy)
router.get('/economy', newsController.getEconomy)
router.get('/sport', newsController.getSports)
router.get('/count', newsController.numberOfNews)
router.get('/recentPosts', newsController.recentPosts)
router.get('/category', newsController.category)

router.post('/policy', newsController.scrapePolicy)
router.post('/sport', newsController.scrapeSport)
router.post('/economy', newsController.scrapeEconomy)


module.exports = router