const express = require('express')
const router = express.Router()
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

router.post('/policy', scrapePolicy)
router.post('/sport', scrapeSport)
router.post('/economy', scrapeEconomy)

module.exports = router