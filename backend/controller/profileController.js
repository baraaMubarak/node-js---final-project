const asyncHandler = require('express-async-handler')

const User = require('../model/userModel')

const getUserProfile = asyncHandler(async (req, res) => {
    
    console.log(req.user._id)

    const user = await User.findById(req.user._id)
    if (!user) {

        res.status(400).json({
            statusCode: 400,
            message: "User not exists",
            details: {
                user: 'User not exists'
            },
        });
        throw new Error('User not exists')
    }

    res.status(200).json({
        _id:user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        image: user.image
    })

    res.json({ massage: 'User data display' })



})
module.exports = { getUserProfile }