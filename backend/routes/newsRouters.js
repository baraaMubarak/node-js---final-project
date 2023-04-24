const express = require('express')
const router = express.Router()
const {
    getPolicy,
    getEconomy,
    getHomeNews,
    getSports
} = require('../controller/newsController')

router.get('/policy', getPolicy)
router.get('/economy', getEconomy)
router.get('/sport', getSports)
router.get('/home', getHomeNews)

module.exports = router