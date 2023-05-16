const nodemailer = require('nodemailer');
const Mailgen = require("mailgen");
//send email
module.exports = async (email,code,name)=>{
    let transport = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user: 'bnmanews@gmail.com',
            pass: 'gukkxtqiaifgfxtl'
        },
    })

// create a mailgen instance
const mailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "BNMA NEWS",
    link: "BNMA NEWS",
  },
});

// generate a verification code
const verificationCode = code;

// define the email template
const emailStyle = {
  body: {
    name: name,
    intro: "Welcome to BNMA NEWS!",
    table: {
      data: [
        {
          key: "Verification Code",
          value: verificationCode,
        },
      ],
      columns: {
        customWidth: {
          key: "20%",
          value: "80%",
        },
        customAlignment: {
          key: "left",
          value: "right",
        },
      },
    },
    action: {
      instructions: "Please enter this code on the verification page to complete the process.",
      button: {
        color: "#22BC66",
        text: code,
        link: code,
      },
    },
    outro: "If you did not request this verification code, please ignore this email.",
  },
};

// generate an HTML email with mailgen
const emailBody = mailGenerator.generate(emailStyle);

    const mailOptions = {
        from: 'bnmanews@gmail.com',
        to: email,
        subject: 'bnmaNews - Registration Verification Code',
        html: emailBody,
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
    