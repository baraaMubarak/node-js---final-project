const {Policy, Sports, Economy} = require('../model/newsModel')
const {N12} = require("../scraping/newsN12");
const {  newsAlAqsaPolicyScraping } = require('../scraping/al-aqsa/newsAlAqsaPolicyScraping')
const { newsWallaPolicyScraping } = require('../scraping/walla/newsWallaPolicyScraping')
const { newsWallaSportScraping } = require('../scraping/walla/newsWallaSportScraping')


/*
"قناة واللا العبرية"
"N12"
"aljazera.net"
 */
const getPolicy = async (req, res) => {
    let n12 = await Policy.find({author: "N12",}).limit(3);
    let walla = await Policy.find({author: "قناة واللا العبرية",}).limit(3);
    let aljazera = await Policy.find({author: "aljazera.net",}).limit(3);
    // console.log(n12)
    for (let i = 0; i < 3; i++) {
        n12.push(walla[i], aljazera[i])
    }
    n12.sort(() => Math.random() - 0.5);
    res.status(200).send(n12)
}
const getEconomy = async (req, res) => {
    let aljazera = await Economy.find({author: "aljazera.net",}).limit(10);
    res.status(200).send(aljazera)
}
const getSports = async (req, res) => {
    let n12 = await Sports.find({author: "N12",}).limit(3);
    let walla = await Sports.find({author: "قناة واللا العبرية",}).limit(3);
    let aljazera = await Sports.find({author: "aljazera.net",}).limit(3);
    // console.log(n12)
    for (let i = 0; i < 3; i++) {
        n12.push(walla[i], aljazera[i])
    }
    n12.sort(() => Math.random() - 0.5);
    res.status(200).send(n12)
}
const getHomeNews = async (req, res) => {
    let n12 = await Sports.find({author: "N12",}).limit(3);
    let walla = await Policy.find({author: "قناة واللا العبرية",}).limit(3);
    let aljazera = await Economy.find({author: "aljazera.net",}).limit(3);
    // console.log(n12)
    for (let i = 0; i < 3; i++) {
        n12.push(walla[i], aljazera[i])
    }
    n12.sort(() => Math.random() - 0.5);
    res.status(200).send(n12)
}
const scrapePolicy = async (req, res) => {
    await N12('policy');
    // al-aqsa
   await newsAlAqsaPolicyScraping('https://seraj.tv/category/6')
   //walla
    newsWallaPolicyScraping('https://www.maariv.co.il/news/politics')

    //aljazera
    const urlPolicyAljazera = 'https://www.aljazeera.net/politics/'
    getAljazeraNews(urlPolicyAljazera, 'policy')

    res.send({message: 'success'})
}


const scrapeSport = async (req, res) => {
    await N12('sport');
    res.send({message: 'success'})
    //walla
    const urlSport = `https://sport1.maariv.co.il/world-soccer/`
    newsWallaSportScraping(urlSport)
    //aljazera
    const urlSportAljazera = 'https://www.aljazeera.net/sport/'
    getAljazeraNews(urlSportAljazera, 'sport')
}

const scrapeEconomy = async (req, res) => {
    
    //aljazera
    const urlEconomicAljazera = 'https://www.aljazeera.net/ebusiness/'
    getAljazeraNews(urlEconomicAljazera, 'economy')

    res.send({message: 'success'})
}

module.exports = {
    getPolicy,
    getEconomy,
    getSports,
    getHomeNews,
    scrapePolicy,
    scrapeSport,
    scrapeEconomy
}