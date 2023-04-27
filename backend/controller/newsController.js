const Policy = require('../model/newsModel')
const {N12} = require("../scraping/newsN12");
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
const scrapePolicy = async (req, res) => {
    const news = await N12('policy');
    console.log(news)
    res.send({message:'success'})
}



const scrapeSport = async (req, res)=>{
    await N12('sport');
    res.send({message:'success'})
}

module.exports = {
    getPolicy,
    getEconomy,
    getSports,
    getHomeNews,
    scrapePolicy,
    scrapeSport
}