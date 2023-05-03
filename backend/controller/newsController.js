const {Policy, Sports, Economy} = require('../model/newsModel')
// const {newsN12} = require("../scraping/newsN12/newsnewsN12");
const newsScraping= require('../scraping')

// @desc  Get Policy NEWS
// @route api/news/policy
// @access Public
const getPolicy = async (req, res) => {
    let news = [];
    // let newsN12 = await Policy.find({author: "newsN12",}).limit(3);
    // let walla = await Policy.find({author: "قناة واللا العبرية",}).limit(3);
    let aljazera = await Policy.find({author: "aljazera.net",}).limit(3);
    let alaqsa = await Policy.find({author: "قناة الأقصى",}).limit(3);
    let palestine = await Policy.find({author: "قناة فلسطين",}).limit(3);
    let elbalad = await Policy.find({author: "elbalad.news",}).limit(3);
    // console.log(newsN12)
    for (let i = 0; i < 3; i++) {
        if(aljazera[i])
            news.push(aljazera[i])
        if(alaqsa[i])
            news.push(alaqsa[i])
        if(palestine[i])
            news.push(palestine[i])
        if(elbalad[i])
            news.push(elbalad[i])

    }
    news.sort(() => Math.random() - 0.5);
    res.status(200).json(news)
}

// @desc  Get Economy NEWS
// @route api/news/economy
// @access Public
const getEconomy = async (req, res) => {
    let news = [];
    let aljazera = await Economy.find({author: "aljazera.net",}).limit(3);
    let palestine = await Economy.find({author: "قناة فلسطين",}).limit(3);
    let payan = await Economy.find({author: "قناة البيان",}).limit(3);
    let elbalad = await Economy.find({author: "elbalad.news",}).limit(3);
    // console.log(newsN12)
    for (let i = 0; i < 3; i++) {
        if(aljazera[i])
            news.push(aljazera[i])
        if(palestine[i])
            news.push(palestine[i])
        if(payan[i])
            news.push(payan[i])
        if(palestine[i])
            news.push(palestine[i])
        if(elbalad[i])
            news.push(elbalad[i])
    }
    news.sort(() => Math.random() - 0.5);
    res.status(200).json(news)
}

// @desc  Get Sport NEWS
// @route api/news/sport
// @access Public
const getSports = async (req, res) => {
    let news = [];
    let aljazera = await Sports.find({author: "aljazera.net",}).limit(5);
    let palestine = await Sports.find({author: "قناة فلسطين",}).limit(5);
    let elbalad = await Sports.find({author: "elbalad.news",}).limit(3);
    // console.log(newsN12)
    for (let i = 0; i < 5; i++) {
        if(aljazera[i])
            news.push(aljazera[i])
        if(palestine[i])
            news.push(palestine[i])
        if(elbalad[i])
            news.push(elbalad[i])

    }
    news.sort(() => Math.random() - 0.5);
    res.status(200).json(news)
}

// @desc  Get Home NEWS
// @route api/news/home
// @access Public
const getHomeNews = async (req, res) => {
    let news = [];
    // let newsN12 = await Sports.find({author: "newsN12",}).limit(3);
    // let walla = await Policy.find({author: "قناة واللا العبرية",}).limit(3);
    let aljazera = await Policy.find({author: "aljazera.net",}).limit(3);
    let palestine = await Sports.find({author: "قناة فلسطين",}).limit(3);
    let albayan = await Economy.find({author: "قناة البيان",}).limit(3);
    let alaqsa = await Policy.find({author: "قناة الأقصى",}).limit(3);
    let elbalad = await Sports.find({author: "elbalad.news",}).limit(3);
    // console.log(newsN12)
    for (let i = 0; i < 3; i++) {
        if(aljazera[i])
            news.push(aljazera[i])
        if(palestine[i])
            news.push(palestine[i])
        if(albayan[i])
            news.push(albayan[i])
        if(alaqsa[i])
            news.push(alaqsa[i])
        if(elbalad[i])
            news.push(elbalad[i])
    }
    news.sort(() => Math.random() - 0.5);
    res.status(200).json(news)
}

// @desc  Post Scrape Policy NEWS
// @route api/news/policy
// @access Private
const scrapePolicy = async (req, res) => {
    // newsN12
    await newsScraping.newsN12('policy');
    // al-aqsa
    await newsScraping.alAqsaPolicy('https://seraj.tv/category/6')
    //walla
    await newsScraping.walla.newsWallaPolicyScraping('https://www.maariv.co.il/news/politics')

    //aljazera
    await newsScraping.aljazera('https://www.aljazeera.net/politics/', 'policy')
     //elbalad
    await newsScraping.elbalad('https://elbalad.news/category/2', 'policy')
    // palestine
    await newsScraping.palestine('policy');

    res.send({message: 'success'})
}

// @desc  Post Scrape Sport NEWS
// @route api/news/sport
// @access Private
const scrapeSport = async (req, res) => {
    //newsN12
    await newsScraping.newsN12('sport');
    //walla
    await newsScraping.walla.newsWallaSportScraping(`https://sport1.maariv.co.il/world-soccer/`)
    //aljazera
    await newsScraping.aljazera('https://www.aljazeera.net/sport/', 'sport')
    await newsScraping.elbalad('https://elbalad.news/category/5', 'sport')
    //palestine
    await newsScraping.palestine('sport');
    res.send({message: 'success'})
}

// @desc  Post Scrape Economy NEWS
// @route api/news/economy
// @access Private
const scrapeEconomy = async (req, res) => {

    //aljazera
    await newsScraping.aljazera('https://www.aljazeera.net/ebusiness/', 'economy')
    //albyan
    await newsScraping.albyanEconomy('https://www.albayan.ae/economy/arab')
    //palestine
    await newsScraping.palestine('economy');

    await  newsScraping.elbalad('https://elbalad.news/category/6','economy')
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