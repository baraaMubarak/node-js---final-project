//validate name
module.exports = (name) => {
  const minLength = 8;
  const maxLength = 50;

  if (name === '') {
    return "Please enter your name.";
  } else if (name.length < minLength) {
    return `Your name must be at least ${minLength} characters long.`;
  } else if (name.length > maxLength) {
    return `Your name must be less than ${maxLength} characters long.`;
  }
  return null;
}
