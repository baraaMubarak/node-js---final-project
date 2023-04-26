const express = require('express')
const { errorHandler } = require('./middleWare/errorMiddleWare')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db.js')
const port = process.env.PORT || 5000
const { newsWallaPolicyScraping } = require('./scraping/newsWallaPolicyScraping')
const { newsWallaSportScraping } = require('./scraping/newsWallaSportScraping')
const {  getAljazeraNews } = require('./scraping/aljazera/newsAljazeraScraping')
const app = express()
connectDB()
app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use(express.urlencoded({ extended: false }))
app.use('/api/users', require('./routes/userRouters.js'))
app.use('/api/news', require('./routes/newsRouters.js'))
app.use('/api/profile', require('./routes/profileRouters.js'))

//walla
const urlPolicy = `https://www.maariv.co.il/news/politics`
newsWallaPolicyScraping(urlPolicy)
const urlSport = `https://sport1.maariv.co.il/world-soccer/`
newsWallaSportScraping(urlSport)


//aljazera
const urlSportAljazera = 'https://www.aljazeera.net/sport/'
getAljazeraNews(urlSportAljazera, 'sport')
const urlPolicyAljazera = 'https://www.aljazeera.net/politics/'
getAljazeraNews(urlPolicyAljazera, 'policy')
const urlEconomicAljazera = 'https://www.aljazeera.net/ebusiness/'
getAljazeraNews(urlEconomicAljazera, 'economy')


    app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port http://localhost:${port}`))
const { translateText } = require('./translator.js');
