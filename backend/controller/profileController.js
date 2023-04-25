const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

// @desc  Get User profile
// @route GET api/profile/getProfile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {

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
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        image: user.image
    })

    res.json({ massage: 'User data display' })



})

// @desc  Update User profile
// @route PUT api/profile/editProfile
// @access Private
const editProfile = asyncHandler(async (req, res) => {
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

    const updatedProfile = await User.findByIdAndUpdate(req.user._id, req.body, { new: true })
    res.status(200).json(updatedProfile)
})

module.exports = { getUserProfile, editProfile }
