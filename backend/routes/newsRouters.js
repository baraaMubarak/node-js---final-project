const express = require('express')
const router = express.Router()
const { protect } = require('../middleWare/authMiddle.js')
const {
    getPolicy,
    getEconomy,
    getHomeNews,
    getSports,
    scrapePolicy,
    scrapeSport,
    scrapeEconomy
} = require('../controller/newsController')

router.get('/policy', getPolicy)
router.get('/economy', getEconomy)
router.get('/sport', getSports)
router.get('/home', getHomeNews)

router.post('/policy',protect, scrapePolicy)
router.post('/sport',protect, scrapeSport)
router.post('/economy',protect, scrapeEconomy)

module.exports = router