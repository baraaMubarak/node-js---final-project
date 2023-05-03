const cheerio = require('cheerio');
const {Policy, Sports} = require("../../model/newsModel");
// const translateText = require('../translator')
const asyncHandler = require("express-async-handler");


module.exports =  palestineNEWS = async(type) => {
   try {
    let branch;
    if(type === 'policy'){
        branch = "/political-news";
    }else if(type === 'sport'){
        branch = '/sports-news'
    }else{
        branch = '/economic-news'
    }
    console.log("Start scraping palestine")
    const websiteLink = "https://www.pbc.ps";
    const response = await fetch(websiteLink + branch);
    const body = await response.text();
    const $ = cheerio.load(body);
    $('.elementor-posts-container > article').map(async (i, el) => {
        const link = $(el).find('h3 > a' ).attr('href')
        const title = $(el).find('h3 > a' ).text()
        const imageUrl = $(el).find('img' ).attr('src')
        if(!link){
            return;
        }
        const response2 = await fetch(link)
        const body2 = await response2.text();
        const $2 = cheerio.load(body2)
        let details;
        let date;
        await $2('body').map((i1, el1) => {
            details = $2(el1).find('.entry-content > p:not(:has(img))').text()
            date = $2(el1).find('.published').text()
            if(details.includes('<!DOCTYPE html>')){
                details = `الصفحة غير موجودة، انظر: ${link}`
            }
        })

        // console.log('e')
        // console.log(`-----------------${i}`)
        // console.log(`Header: ${title}`);
        // // console.log(`Body: ${body}`);
        // console.log(`Details: ${details}`);
        // console.log(`Date: ${date}`);
        // console.log(`Image URL: ${imageUrl}`);
        // console.log(`Link: ${link}`);
        const news = {
            title,
            body:details,
            details,
            link: link,
            date,
            author: "قناة فلسطين",
            image: imageUrl,
            type:type
        }

        if(type === 'policy') {
            const newsExit = await Policy.findOne({ link });
            if(!newsExit) {
                await Policy.create(news);
            }
        }else if(type === 'sport'){
            const newsExit = await Sports.findOne({ link });
            if(!newsExit) {
                await Sports.create(news);
            }
        }else if(type === 'economy'){
            const {Economy} = require('../../model/newsModel');
            const newsExit = await Economy.findOne({ link });
            if(!newsExit) {
                await Economy.create(news);
            }
        }

    });
   } catch (error) {
    
   }
}


// module.exports = {palestineNEWS};