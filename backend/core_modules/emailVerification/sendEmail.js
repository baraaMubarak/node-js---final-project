const nodemailer = require('nodemailer');
//send email
module.exports = async (email,code)=>{
    let transport = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user: 'nassemmubarak@gmail.com',
            pass: 'mtxrgdaqdwhjasbc'
        },
    })
    const mailOptions = {
        from: 'nassemmubarak@gmail.com',
        to: email,
        subject: 'bnmaNews - Registration Verification Code',
        // text: `Subject: bnmaNews - Registration Verification Code\n\nDear jklasdmmm99@gmail.com,\n\nThank you for registering with bnmaNews! To complete your registration, please use the following verification code:\n\n<strong>${code}</strong>.\n\nPlease enter this code on our website within the next 30 minutes to complete your registration. If you did not initiate this registration or do not wish to register with bnmaNews, please ignore this email.\n\nThank you for choosing bnmaNews!\n\nSincerely,\nThe bnmaNews Team`,
        html: `
        <p>Dear jklasdmmm99@gmail.com,</p>
        <p>Thank you for registering with bnmaNews! To complete your registration, please use the following verification code:</p>
        <b style="color: yalue;background-color:powderblue;font-size:20px ">  ${code}  </b>
        Please enter this code on our website within the next 30 minutes to complete your registration. If you did not initiate this registration or do not wish to register with bnmaNews, please ignore this email.
        Thank you for choosing bnmaNews!
        Sincerely,<br>The bnmaNews Team
      `
    };
    
    try {
       const result =  await transport.sendMail(mailOptions);
        console.log('Verification email sent:', result);
        return true;
      } catch (error) {
        console.error('Failed to send verification email:', error);
        return false;
    }
    }
    