const {translate} = require('@vitalets/google-translate-api');

const translateText = async (text) => {
    const translatedText = await translate(text, {to: 'ar'});
    return translatedText.text;
};

module.exports = {translateText};

// how to use it:
/*
const {translateText} = require('./translator.js');

translateText('hello world in any language').then((data) => {
        console.log(data)// اهلا بالعالم بأي لغة
    }
);
 */