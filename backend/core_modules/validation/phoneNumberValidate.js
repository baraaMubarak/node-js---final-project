//validate phone
module.exports = (phoneNumber) => {
    if (phoneNumber === '') {
        return 'Please enter a phone number.'
    } else {
        const regex = /^\+[0-9]{12}$/; // Regular expression for a valid phone number
        const isValidate = regex.test(phoneNumber);
        if (!isValidate) {
            return "Phone number is invalid. hent number +970592815701";
        } else {
            return null
        }
    }
}