const mongoose = require('mongoose')

const newsSchema = mongoose.Schema({
    title: {
        type: String,
        require: [true, 'Enter title'],
    },
    // content in the main page
    body: {
        type: String,
        require: [true, 'Enter body'],
    },
    details: {
        type: String,
        require: [true, 'Enter details'],
    },
    // link of the news – as a reference
    link: {
        type: String,
        require: [true, 'Enter link'],
    },
    date: {
        type: String,
        require: [true, 'Enter date'],
    },
    author: {
        type: String,
        require: [true, 'Enter verifyEmail'],
    },
    image: {
        type: String,
        require: [true, 'Enter image'],
    },
    type: {
        type: String,
        require: [true, 'Enter image'],
    },
    comments: {
        type: Array,
    }


}, {
    timestamps: true
})

module.exports = {
    Policy: mongoose.model('Policy', newsSchema),
    Economy: mongoose.model('Economy', newsSchema),
    Sports: mongoose.model('Sports', newsSchema)
}
