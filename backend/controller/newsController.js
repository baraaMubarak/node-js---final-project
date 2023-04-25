const Policy = require('../model/newsModel')
const getPolicy = (req, res) => {
    Policy.find({}).then((data) => {
        res.status(200).send(data)
    })
}
const getEconomy = (req, res) => {
    res.send({
        message: 'Economy'
    })
}
const getSports = (req, res) => {
    res.send({
        message: 'Sports'
    })
}
const getHomeNews = (req, res) => {
    res.send({
        message: 'Home'
    })
}

module.exports = {
    getPolicy,
    getEconomy,
    getSports,
    getHomeNews
}