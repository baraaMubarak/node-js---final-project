const errorHandler = require('./errorMiddleware')
const protect = require('./authMiddle')

module.exports = {
    protect,
    errorHandler
}