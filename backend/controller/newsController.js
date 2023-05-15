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
    let aljazera = await Policy.find({author: "قناة الجزيرة",}).limit(10);
    let alaqsa = await Policy.find({author: "قناة الأقصى",}).limit(10);
    let palestine = await Policy.find({author: "قناة فلسطين",}).limit(10);
    let elbalad = await Policy.find({author: "قناة البلد",}).limit(10);
    // console.log(newsN12)
    for (let i = 0; i < 10; i++) {
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
    let aljazera = await Economy.find({author: "قناة الجزيرة",}).limit(10);
    let palestine = await Economy.find({author: "قناة فلسطين",}).limit(10);
    let payan = await Economy.find({author: "قناة البيان",}).limit(10);
    let elbalad = await Economy.find({author: "قناة البلد",}).limit(10);
    // console.log(newsN12)
    for (let i = 0; i < 10; i++) {
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
    let aljazera = await Sports.find({author: "قناة الجزيرة",}).limit(10);
    let palestine = await Sports.find({author: "قناة فلسطين",}).limit(10);
    let elbalad = await Sports.find({author: "قناة البلد",}).limit(10);
    // console.log(newsN12)
    for (let i = 0; i < 10; i++) {
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
    let policy = [];
    let sports = [];
    let aljazera = await Policy.find({author: "قناة الجزيرة",}).limit(10);
    let palestine = await Sports.find({author: "قناة فلسطين",}).limit(10);
    let albayan = await Economy.find({author: "قناة البيان",}).limit(10);
    let alaqsa = await Policy.find({author: "قناة الأقصى",}).limit(10);
    let elbalad = await Sports.find({author: "قناة البلد",}).limit(10);
    // console.log(newsN12)
    for (let i = 0; i < 10; i++) {
        if(aljazera[i])
            policy.push(aljazera[i])
        if(alaqsa[i])
            policy.push(alaqsa[i])
    }
    for (let i = 0; i < 10; i++) {
        if(palestine[i])
            sports.push(palestine[i])
        if(elbalad[i])
            sports.push(elbalad[i])
    }
    policy.sort(() => Math.random() - 0.5);
    sports.sort(() => Math.random() - 0.5);
    res.status(200).json({

        sport: sports,
        politics: policy,
        economic: albayan

    })
}

// @desc  Post Scrape Policy NEWS
// @route api/news/policy
// @access Private
const scrapePolicy = async (req, res) => {
    // newsN12
    await newsScraping.newsN12('policy');

    //walla
    await newsScraping.walla.newsWallaPolicyScraping('https://www.maariv.co.il/news/politics')
    // palestine
    await newsScraping.palestine('policy');
    //aljazera
    await newsScraping.aljazera('https://www.aljazeera.net/politics/', 'policy')
    //elbalad
    await newsScraping.elbalad('https://elbalad.news/category/2', 'policy')


    // al-aqsa
    await newsScraping.alAqsaPolicy('https://seraj.tv/category/6')

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

// @desc  GET numbers of NEWS
// @route api/news/count
// @access Public
const numberOfNews = async (req, res) => {
    let policyCounter = await Policy.count();
    let economyCounter = await Economy.count();
    let sportCounter = await Sports.count();


    res.status(200).json({
        sport: sportCounter,
        politics: policyCounter,
        economic: economyCounter
    })
}

// @desc  GET numbers of NEWS
// @route api/news/count
// @access Public
const recentPosts = async (req, res) => {

    let aljazera = await Policy.find({author: "قناة الجزيرة",}).limit(2);
    let palestine = await Policy.find({author: "قناة فلسطين",}).limit(2);
    let alaqsa = await Policy.find({author: "قناة الأقصى",}).limit(2);


    res.status(200).json({
        latestNews: [aljazera[0],palestine[0],alaqsa[0]],
        popularPosts: [aljazera[1],palestine[1],alaqsa[1]],
    })
}

const category = async (req, res) => {

    let aljazeraPolicy = await Policy.find({author: "قناة الجزيرة",}).limit(1);
    let palestinePolicy = await Policy.find({author: "قناة فلسطين",}).limit(1);
    let alaqsaPolicy = await Policy.find({author: "قناة الأقصى",}).limit(1);
    let elbaladPolicy = await Policy.find({author: "قناة البلد",}).limit(1);

    let aljazeraSport = await Sports.find({author: "قناة الجزيرة",}).limit(2);
    let palestineSport = await Sports.find({author: "قناة فلسطين",}).limit(1);
    let elbaladSport = await Sports.find({author: "قناة البلد",}).limit(1);

    let aljazeraEconomy = await Economy.find({author: "قناة الجزيرة",}).limit(1);
    let palestineEconomy = await Economy.find({author: "قناة فلسطين",}).limit(1);
    let elbaladEconomy = await Economy.find({author: "قناة البلد",}).limit(1);
    let albayanEconomy = await Economy.find({author: "قناة البيان",}).limit(1);

    res.status(200).json({
        politics:[aljazeraPolicy[0],palestinePolicy[0],alaqsaPolicy[0],elbaladPolicy[0]],
        sport:[aljazeraSport[0],palestineSport[0],aljazeraSport[1],elbaladSport[0]],
        economic:[aljazeraEconomy[0],palestineEconomy[0],albayanEconomy[0],elbaladEconomy[0]],
    })
}




module.exports = {
    getPolicy,
    getEconomy,
    getSports,
    getHomeNews,
    scrapePolicy,
    scrapeSport,
    scrapeEconomy,
    numberOfNews,
    recentPosts,
    category
}