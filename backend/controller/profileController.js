const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')
const mongoose = require('mongoose')
const validation = require('../core_modules/validation')
const bcrypt = require('bcryptjs')


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
// const editProfile = asyncHandler(async (req, res) => {
//     const user = await User.findById(req.user._id)
//     if (!user) {
//         res.status(400).json({
//             statusCode: 400,
//             message: "User not exists",
//             details: {
//                 user: 'User not exists'
//             },
//         });
//         throw new Error('User not exists')
//     }

//     const updatedProfile = await User.findByIdAndUpdate(req.user._id, req.body, { new: false })
//     res.status(200).json(updatedProfile)
// })


// const editProfile = asyncHandler(async (req, res) => {
//     const allowedFields = ['name', 'password','email','phone']; // Fields allowed to be updated
//     const user = await User.findById(req.user._id);
//     if (!user) {
//         res.status(400).json({
//             statusCode: 400,
//             message: "User not exists",
//             details: {
//                 user: 'User not exists'
//             },
//         });
//         throw new Error('User not exists');
//     }

//     // Extract only the allowed fields from the request body
//     const updatedFields = {};
//     allowedFields.forEach((field) => {
//         if (req.body[field] !== undefined) {
//             updatedFields[field] = req.body[field];
//         }
//     });

//     // Prevent certain fields from being updated
//     if (req.body.verifyEmail || req.body.verificationCode) {
//         res.status(400).json({
//             statusCode: 400,
//             message: "verifyEmail and verificationCode fields cannot be updated",
//         });
//         throw new Error('verifyEmail and verificationCode fields cannot be updated');
//     }

//     // Update the allowed fields in the user object
//     Object.assign(user, updatedFields);

//     // Save the updated user object
//     await user.save();

//     // Select only the fields to be included in the response
// const responseFields = { _id: user._id, name: user.name, phone: user.phone, email: user.email, password: user.password };
//     // Return the updated user object with only the selected fields
//     const updatedUser = await User.findById(req.user._id).select(responseFields);
//     res.status(200).json(updatedUser);
// });

// const editProfile = asyncHandler(async (req, res) => {
//     const user = await User.findById(req.user._id);
//     if (!user) {
//         res.status(400).json({
//             statusCode: 400,
//             message: "User not exists",
//             details: {
//                 user: 'User not exists'
//             },
//         });
//     }
//     if (!name && !email && !password && !phone) {
//         return res.status(400).json({
//             statusCode: 400,
//             message: "At least one field must be updated",
//         });
//     }
//     // Prevent certain fields from being updated
//     if (req.body.verifyEmail || req.body.verificationCode) {
//         res.status(400).json({
//             statusCode: 400,
//             message: "verifyEmail and verificationCode fields cannot be updated",
//         });
//         throw new Error('verifyEmail and verificationCode fields cannot be updated');
//     }


//     const { name, email, password, phone } = req.body;
//     const salt = await bcrypt.genSalt(10)
//     const hashedPassword = await bcrypt.hash(password, salt)
//     let details = {}
//     isError = false;
//     if (name) {
//         const nameError = nameValidate(!name ? '' : name);
//         if (nameError) {
//             isError = true
//             details.name = nameError;
//         }
//     } if (email) {
//         const emailError = emailValidate(!email ? '' : email)
//         if (emailError) {
//             isError = true;
//             details.emailError = emailError
//         }
//     } if (password) {
//         const passwordError = passwordValidate(!password ? '' : password)
//         if (passwordError) {
//             isError = true;
//             details.password = passwordError
//         }
//     } if (phone) {
//         const phoneError = phoneNumberValidate(!phone ? '' : phone)
//         if (phoneError) {
//             isError = true
//             details.phone = phoneError
//         }
//     }
//     if (isError) {
//         res.status(400).json({
//             statusCode: 400,
//             message: "Enter a valid data",
//             details: details,
//         });
//         throw new Error("Enter a valid data");
//     } else {
//         user.name = name
//         user.password = hashedPassword
//         user.email = email
//         user.phone = phone
//         const updatedProfile = await User.findByIdAndUpdate(req.user._id, req.body, { new: true })
//         res.status(200).json(updatedProfile)

//     }


// })

const editProfile = async (req, res) => {

    const user = await User.findById(req.user._id);

    if (!user) {
        return res.status(400).json({
            statusCode: 400,
            message: "User not exists",
            details: {
                user: 'User not exists'
            },
        });
    }

    const { name, email, password, phone, image } = req.body;

    // Validate existence of fields
    if (!name && !email && !password && !phone && !image) {
        return res.status(400).json({
            statusCode: 400,
            message: "At least one field must be updated",
        });
    }

    // Prevent certain fields from being updated
    if (req.body.verifyEmail || req.body.verificationCode) {
        return res.status(400).json({
            statusCode: 400,
            message: "verifyEmail and verificationCode fields cannot be updated",
        });
    }

    // Validate input fields
    const details = {};
    let isError = false;
    if (name) {
        const nameError = validation.nameValidate(name);
        if (nameError) {
            isError = true;
            details.name = nameError;
        }
    }
    if (email) {
        const emailError = validation.emailValidate(email)
        if (emailError) {
            isError = true;
            details.email = emailError;
        }
    }
    if (password) {
        const passwordError = validation.passwordValidate(password)
        if (passwordError) {
            isError = true;
            details.password = passwordError;
        }
    }
    console.log('*----------------2-----',phone);
    if (phone) {
        const phoneError = validation.phoneNumberValidate(phone)
        if (phoneError) {
            isError = true;
            details.phone = phoneError;
        }
    }
    if (isError) {
        return res.status(400).json({
            statusCode: 400,
            message: "Enter a valid data",
            details: details,
        });
    }

    // Update user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;
    if (password) updates.password = hashedPassword;
    if (phone) updates.phone = phone;
    if (image) updates.image = image;


    const updatedProfile = await User.findByIdAndUpdate(
        req.user._id,
        updates,
        { new: true }
    );
    return res.status(200).json(updatedProfile);

}



// const responseFields = { _id: user._id, name: user.name, phone: user.phone, email: user.email, password: user.password };
// const updatedUser = await User.findById(req.user._id).select(responseFields);
// res.status(200).json(updatedUser);



module.exports = { getUserProfile, editProfile }
