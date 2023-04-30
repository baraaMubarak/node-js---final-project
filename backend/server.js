const express = require('express')
const { errorHandler } = require('../backend/middleware/errorMiddleware.js')
const { protect } = require('./middleware/authMiddle.js')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db.js')
const { getElbaladNews } = require('./scraping/elbalad/newsElbaladScraping.js')
const port = process.env.PORT || 5000
const app = express()

connectDB()

app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use(express.urlencoded({ extended: false }))

app.use('/api/users', require('./routes/userRouters.js'))
app.use('/api/news', require('./routes/newsRouters.js'))
app.use('/api/profile', require('./routes/profileRouters.js'))

//sport
getElbaladNews('https://elbalad.news/category/5', 'sport')
//policy
getElbaladNews('https://elbalad.news/category/2', 'policy')
//economy
getElbaladNews('https://elbalad.news/category/6', 'economy')

app.use(errorHandler)


app.listen(port, () => console.log(`Server started on port http://localhost:${port}`))
const { translateText } = require('./translator.js');




