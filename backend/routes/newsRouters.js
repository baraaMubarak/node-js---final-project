const {Router} = require('express')
const router = Router()
const {protect} = require('../middleware')
const {newsController} = require('../controller')

router.get('/home', newsController.getHomeNews)
router.get('/policy', newsController.getPolicy)
router.get('/economy', newsController.getEconomy)
router.get('/sport', newsController.getSports)

router.post('/policy',protect, newsController.scrapePolicy)
router.post('/sport',protect, newsController.scrapeSport)
router.post('/economy',protect, newsController.scrapeEconomy)

module.exports = router