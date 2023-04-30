const {translate} = require('@vitalets/google-translate-api');

let instance = null;

class Translator {
    constructor() {
        if (!instance) {
            instance = this;
        }

        return instance;
    }


    async translateText(text) {
        await this.delay(1000)
        const translatedText = await translate(text, {to: 'ar', delay:1000});
        return translatedText.text;
    }



    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

module.exports = new Translator();