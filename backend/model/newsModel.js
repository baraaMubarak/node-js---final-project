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
        type: Boolean,
        require: [true, 'Enter verifyEmail'],
    },
    image: {
        filename: {type: String},
        contentType: {type: String},
        userImage: {type: String},
        data: {type: Buffer},
    },
    comments: {
        type: Array,
    }


}, {
    timestamps: true
})

module.exports = mongoose.model('Policy', newsSchema)
module.exports = mongoose.model('Economy', newsSchema)
module.exports = mongoose.model('Sports', newsSchema)