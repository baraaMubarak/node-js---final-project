//validate password
module.exports=(password)=> {
    const minLength = 8;
    const maxLength = 50;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  
    if (password==='') {
      return "Please enter a password.";
    } else if (password.length < minLength) {
      return `Your password must be at least ${minLength} characters long.`;
    } else if (password.length > maxLength) {
      return `Your password must be less than ${maxLength} characters long.`;
    } else if (!passwordRegex.test(password)) {
      return "Your password must contain at least one uppercase letter, one lowercase letter, and one number.";
    }
  
    return null;
  }