const express = require('express')
const routers = require('./routes')
const { errorHandler } = require('../backend/middleware')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db.js')
const port = process.env.PORT || 5000
const app = express()


connectDB()
// newsWallaPolicyScraping('https://www.maariv.co.il/news/politics')

var cors = require('cors');
app.use(cors());

app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use(express.urlencoded({ extended: false }))

app.use('/api/users', routers.userRouters)
app.use('/api/news', routers.newsRouters)
app.use('/api/profile', routers.profileRouters)

// //sport
// getElbaladNews('https://elbalad.news/category/5', 'sport')
// //policy
// getElbaladNews('https://elbalad.news/category/2', 'policy')
// //economy
// getElbaladNews('https://elbalad.news/category/6', 'economy')

app.use(errorHandler)


app.listen(port, () => console.log(`Server started on port http://localhost:${port}`))
const { translateText } = require('./translator.js');




