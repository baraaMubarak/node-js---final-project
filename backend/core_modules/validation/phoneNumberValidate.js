 //validate phone
 module.exports = (phoneNumber) =>{
    if(phoneNumber===''){
        return 'Please enter a phone number.'
    }else{
        const regex = /^\+?[1-9]\d{1,14}$/; // Regular expression for a valid phone number
    const isValidate = regex.test(phoneNumber);
    if (!isValidate) {
        return "Phone number is invalid.";
    }else{
        return null
    }
    }
  }