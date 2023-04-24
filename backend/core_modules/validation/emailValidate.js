//validate email
module.exports = (email) => {
    if (email === '') {
      return "Please enter your email.";
    } else if (!emailPattern(email)) {
      return "The email address is invalid.";
    } else if (!email.endsWith('@gmail.com')) {
      return "Please enter a valid Gmail address.";
    } else {
      return null;
    }
  };
  
  const emailPattern = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  