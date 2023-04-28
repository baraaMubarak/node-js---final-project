const express = require('express')
const { errorHandler } = require('./middleWare/errorMiddleWare')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db.js')
const port = process.env.PORT || 5000
const app = express()
connectDB()
app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use(express.urlencoded({ extended: false }))
app.use('/api/users', require('./routes/userRouters.js'))
app.use('/api/news', require('./routes/newsRouters.js'))
app.use('/api/profile', require('./routes/profileRouters.js'))







app.use(errorHandler)


app.listen(port, () => console.log(`Server started on port http://localhost:${port}`))
const { translateText } = require('./translator.js');




