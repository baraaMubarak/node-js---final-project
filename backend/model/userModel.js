const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Enter name'],
    },
    email: {
        type: String,
        require: [true, 'Enter email'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'Please add password']
    },
    phone: {
        type: String,
        require: [true, 'Enter phone'],
        unique: true
    },
    verificationCode: {
        type: String,
        require: [true, 'Enter code'],
    },
    verifyEmail: {
        type: Boolean,
        require: [true, 'Enter verifyEmail'],
    },
    forgetPasswordCode:{
        type: String,
        require: [false, 'Enter code'],
    },
    image: {
        filename: { type: String },
        contentType: { type: String },
        userImage: { type: String },
        data: { type: Buffer },
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)