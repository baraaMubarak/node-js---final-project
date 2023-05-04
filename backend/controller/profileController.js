const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const validation = require("../core_modules/validation");
const bcrypt = require("bcryptjs");

// @desc  Get User profile
// @route GET api/profile/getProfile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(400).json({
      statusCode: 400,
      message: "User not exists",
      details: {
        user: "User not exists",
      },
    });
    throw new Error("User not exists");
  }
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    image: user.image.userImage,
  });
});

const editProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(400).json({
      statusCode: 400,
      message: "User not exists",
      details: {
        user: "User not exists",
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
    const emailError = validation.emailValidate(email);
    if (emailError) {
      isError = true;
      details.email = emailError;
    }
  }
  let hashedPassword;
  if (password) {
    const passwordError = validation.passwordValidate(password);
    if (passwordError) {
      isError = true;
      details.password = passwordError;
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    console.log("--------------------", password);
    hashedPassword = await bcrypt.hash(password, salt);
  }
  if (phone) {
    const phoneError = validation.phoneNumberValidate(phone);
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

  const updates = {};
  if (name) updates.name = name;
  if (email) updates.email = email;
  if (password) updates.password = hashedPassword;
  if (phone) updates.phone = phone;
  if (req.file)
    updates.image = {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
      data: req.file.buffer,
      userImage: req.file.path,
    };
  const updatedProfile = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
  });
  return res.status(200).json(updatedProfile);
});

module.exports = { getUserProfile, editProfile };
