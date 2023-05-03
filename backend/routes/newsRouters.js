const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddle.js')
const {
    getPolicy,
    getEconomy,
    getHomeNews,
    getSports,
    scrapePolicy,
    scrapeSport,
    scrapeEconomy
} = require('../controller/newsController')

router.get('/home', getHomeNews)
router.get('/policy', getPolicy)
router.get('/economy', getEconomy)
router.get('/sport', getSports)

router.post('/policy',protect, scrapePolicy)
router.post('/sport',protect, scrapeSport)
router.post('/economy',protect, scrapeEconomy)

module.exports = router