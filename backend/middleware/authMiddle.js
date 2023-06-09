const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

module.exports = asyncHandler(async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'abc123')
            // Get user from token
            req.user = await User.findById(decoded.id)
            console.log(req.user+' 22 '+decoded.id)

            next()
        } catch (error) {
            console.log(error);
            res.status(401)
            throw new Error('Not authorized')

        }
    }
    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
}
)
