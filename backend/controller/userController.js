const asyncHandler = require("express-async-handler");
const { sendEmaile } = require('../core_modules/emailVerification')
const User = require('../model/userModel')
const {  
    nameValidate,
    emailValidate,
    passwordValidate,
    phoneNumberValidate 
} = require('../core_modules/validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')




//@desc    Register new user
//@route   POST /api/users/signup
//@access  Public 
const regesturUser = asyncHandler(async (req, res) => {
    const code = generateVerificationCode();
    isError = false;
  const { name, email, passwored, phone } = req.body;
      let details = {}
      //validate naem
      const nameError = nameValidate(!name?'':name);
      if(nameError){
        isError = true
        details.naem = nameError;
    }
    //validate email
    const emailError = emailValidate(!email?'':email)
    if(emailError){
        isError=true;
        details.emailError = emailError
    }
    console.log(details);
    //validate passwored
    const passwordError = passwordValidate(!passwored?'':passwored)
    if(passwordError){
        isError = true;
        details.passwored = passwordError
    }
    //validate Phone number
    const phoneError = phoneNumberValidate(!phone?'':phone)
    if(phoneError){
        isError = true
        details.phone = phoneError
    }
        if(isError){
            res.status(400).json({
            statusCode: 400,
            message: "Enter require data",
            details: details,
            });
            throw new Error("Enter require data");
        }else{
            const emailExists = await User.findOne({email})
            if(emailExists){
                res.status(400).json({
                    statusCode: 400,
                    message: "Email already exists",
                    details: {
                        user:'Email already exists'
                    },
                    });
                throw new Error('Email already exists')
            }
            const phoneExists = await User.findOne({phone})
            if(phoneExists){
                res.status(400).json({
                    statusCode: 400,
                    message: "Phone number already exists",
                    details: {
                        user:'Phone number already exists'
                    },
                    });
                throw new Error('Phone number already exists')
            }

            //hash passwored
            const salt = await bcrypt.genSalt(10)
            const hashedPasswored = await bcrypt.hash(passwored,salt)
            //create user
            const user =await User.create({
                name : name,
                email:email,
                phone:phone,
                verificationCode:code,
                verifyEmail:false,
                passwored:hashedPasswored,
                image: {
                    filename: req.file.originalname,
                    contentType: req.file.mimetype,
                    data: req.file.buffer,
                    userImage:req.file.path
                },
            })
            if(!user){
                res.status(400).json({
                    statusCode: 400,
                    message: "Not successful",
                    details: {
                        message:'Not successful'
                    },
                    });
                throw new Error('Not successful')
            }
            if(!await sendEmaile(user.email,code)){
                res.status(400).json({
                    statusCode: 400,
                    message: "Not successful",
                    details: {
                        message:'Not successful'
                    },
                    });
                throw new Error('Not successful')
            }
            res.status(200).json({ 
                statusCode: 200,
                message: "Thank you for registering with bnmaNews! We have sent a verification code to your email. Please enter the code on our website within the next 30 minutes to complete your registration.",
                user:{
                    _id: user.id,
                    name:user.name,
                    email:user.email,
                    phone:user.phone,
                    verifyEmail:user.verifyEmail,
                    image: 'http://localhost:8000/'+user.image.userImage,
                    token:generateToken(user._id),
                }
                }); 
        }
});


//@desc    Authenticate a user
//@route   POST /api/users/login
//@access  Public 
const loginUser = asyncHandler(async(req,res)=>{
    let details = {}
    const { email , passwored } = req.body;
    if((!email||!passwored)){
        let details = {}
        if(!email){
            details.email = 'Please enter your email.'
        }
        if(!passwored){
            details.passwored = 'Please enter your passwored.'
        }
        res.status(400).json({
            statusCode: 400,
            message: "Enter require data",
            details: details,
            });
            throw new Error("Enter require data")
    }
    //validate email
    const emailError = emailValidate(!email?'':email)
    if(emailError){
        details.emailError = emailError
        res.status(400).json({
            statusCode: 400,
            message: emailError,
            details: details,
        });
            throw new Error(emailError)
    }
    const user = await User.findOne({email})
    if(!user){
        res.status(400).json({
            statusCode: 400,
            message: 'User not found',
            details: {user:"User not found"},
            });
            throw new Error('User not found')
    }
    if(!await bcrypt.compare(passwored,user.passwored)){
        res.status(400).json({
            statusCode: 400,
            message: 'Passwored not correct',
            details: {user:"Passwored not correct"},
            });
            throw new Error('Passwored not correct')
    }
    res.status(201).json({
        _id: user.id,
        name:user.name,
        email:user.email,
        phone:user.phone,
        verifyEmail:user.verifyEmail,
        image: 'http://localhost:8000/'+user.image.userImage,
        token:generateToken(user._id),
    })
})



//@desc    Verify email user
//@route   POST /api/users/verifyEmail
//@access  Private 
const emailVirivication = asyncHandler(
    async(req,res)=>{
        const { code } = req.body
        if(!code){
            res.status(400).json({
                statusCode: 400,
                message: "Error: enter code.",
                details: {
                    message:'Error: enter code.'
                },
                });
            throw new Error('Error: enter code.')
        }
        if(!(Number.isInteger(parseInt(code))&&parseInt(code).toString().length===4)){
            res.status(400).json({
                statusCode: 400,
                message: "Error: Code must contain four integers.",
                details: {
                    message:'Error: Code must contain four integers.'
                },
                });
            throw new Error('Error: Code must contain four integers.')
        }
        const {id,verificationCode} = await User.findById(req.user._id)
          if(!id){
              res.status(400).json({
                  statusCode: 400,
                  message: 'User not found',
                  details: {user:"User not found"},
                  });
                  throw new Error('User not found')
          }
        console.log(!(verificationCode==code));
        if(!(verificationCode==code)){
            res.status(400).json({
                statusCode: 400,
                message: "Your verification code is invalid. Please try again.",
                details: {
                    message:'Your verification code is invalid. Please try again.'
                },
                });
            throw new Error('Your verification code is invalid. Please try again.')
        }
        const user = await User.findByIdAndUpdate(id,{
            verifyEmail:true
        })
        if(!user){
            res.status(400).json({
                statusCode: 400,
                message: "Not successfully Please try again.",
                details: {
                    message:'Not successfully Please try again.'
                },
                });
            throw new Error('Not successfully Please try again.')
        }
        res.status(201).json({
            _id: user.id,
            name:user.name,
            email:user.email,
            phone:user.phone,
            verifyEmail:true,
            image: 'http://localhost:8000/'+user.image.userImage,
            token:generateToken(user._id),
        })
    }
)

//@desc    ReSend code to emaile
//@route   GET /api/users/verifyEmail
//@access  Private 
const reSendEmailVirivication = asyncHandler(
    async(req,res)=>{
        const user = await User.findById(req.user._id)
     if(!user){
         res.status(400).json({
             statusCode: 400,
             message: 'User not found',
             details: {user:"User not found"},
             });
             throw new Error('User not found')
     }
     const code = generateVerificationCode();
     const userUpdate = await User.findByIdAndUpdate(user._id,{
        verificationCode:code,
    })
    if(!userUpdate){
        res.status(400).json({
            statusCode: 400,
            message: "Not successfully Please try again.",
            details: {
                message:'Not successfully Please try again.'
            },
            });
        throw new Error('Not successfully Please try again.')
    }
        if(!await sendEmaile(user.email,code)){
            res.status(400).json({
                statusCode: 400,
                message: "Not successful",
                details: {
                    message:'Not successful'
                },
                });
            throw new Error('Not successful')
        }
        res.status(201).json({
            message:'Successfully'
        })
    }
)

//get token user
const generateToken = (id)=>{
    return jwt.sign({ id },process.env.JWT_SECRET||'abc123',{
        expiresIn: '30d'
    })
}
//get code to send email
const generateVerificationCode = () => {
    let code = '';
    const possibleDigits = '123456789'; // exclude '0'
    for (let i = 0; i < 4; i++) {
      code += possibleDigits.charAt(Math.floor(Math.random() * possibleDigits.length));
    }
    return code;
  };



  module.exports = {
    regesturUser,
    loginUser,
    emailVirivication,
    reSendEmailVirivication
  }