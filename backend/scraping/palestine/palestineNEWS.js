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
    let response = await fetch(websiteLink + branch);
    const body = await response.text();
    const $ = cheerio.load(body);
    $('.elementor-posts-container > article').map(async (i, el) => {
        const link = $(el).find('h3 > a' ).attr('href')
        const title = $(el).find('h3 > a' ).text()
        const imageUrl = $(el).find('img' ).attr('src')
        if(!link){
            return;
        }
        try {
            console.log(link)
            let response2 = await fetch(link)
            const body2 = await response2.text();
            const $2 = cheerio.load(body2)
            let details;
            let body3;
            let date;
            await $2('body').map((i1, el1) => {
                console.log(1)
                details = $2(el1).find('.entry-content > p:not(:has(img))').text()
                console.log(2)
                body3 = $2(el1).find('.entry-content > p:not(:has(img))').first().text()
                console.log(3)
                date = $2(el1).find('.published').text()
                console.log(4)
                if (details.includes('<!DOCTYPE html>')) {
                    details = `الصفحة غير موجودة، انظر: ${link}`
                }
            })

            // console.log('e')
            // console.log(`-----------------${i}`)
            // console.log(`Header: ${title.trim()}`);
            // console.log(`Body: ${body3.trim()}`);
            // console.log(`Details: ${details.trim()}`);
            // console.log(`Date: ${date.trim()}`);
            // console.log(`Image URL: ${imageUrl}`);
            // console.log(`Link: ${link}`);
            const news = {
                title: title.trim(),
                body: body3.trim(),
                details: details.trim(),
                link: link.trim(),
                date: date.trim(),
                author: "قناة فلسطين",
                image: imageUrl.trim(),
                type: type.trim()
            }

            if (type === 'policy') {
                const newsExit = await Policy.findOne({link});
                if (!newsExit) {
                    await Policy.create(news);
                }
            } else if (type === 'sport') {
                const newsExit = await Sports.findOne({link});
                if (!newsExit) {
                    await Sports.create(news);
                }
            } else if (type === 'economy') {
                const {Economy} = require('../../model/newsModel');
                const newsExit = await Economy.findOne({link});
                if (!newsExit) {
                    await Economy.create(news);
                }
            }
        }catch (e){
            console.log(e)
        }

    });
   } catch (error) {
    
   }
}


// module.exports = {palestineNEWS};