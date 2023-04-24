const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:[true,'Enter name'],
    },
    email:{
        type:String,
        require:[true,'Enter emaile'],
        unique:true
    },
    passwored:{
        type:String,
        require: [true,'Please add passwored']
    },
    phone:{
        type:String,
        require:[true,'Enter phone'],
        unique:true
    },
    verificationCode:{
        type:String,
        require:[true,'Enter code'],
    },
    verifyEmail:{
        type:Boolean,
        require:[true,'Enter verifyEmail'],
    },
    image: {
        filename: { type: String },
        contentType: { type: String },
        userImage: { type: String },
        data: { type: Buffer },
      },
},{
    timestamps : true
})

module.exports = mongoose.model('User',userSchema)