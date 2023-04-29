const cheerio = require('cheerio');

async function N12(type) {
    let branch;
    if(type === 'policy'){
        branch = "/news-politics?partner=NewsNavBar";
    }else if(type === 'sport'){
        branch = '/news-sport?partner=NewsNavBar'
    }else{
        return;
    }
    console.log("Start scraping N12")
    const websiteLink = "https://www.mako.co.il";
    const response = await fetch(websiteLink + branch);
    const body = await response.text();
    const $ = cheerio.load(body);

    $('.grid-ordering > li').map(async (i, el) => {
        var title = $(el).find('a').text();
        const link = $(el).find('a').attr('href');
        var body = $(el).find('span > a').text();
        const date = $(el).find('small').text();
        const imageUrl = $(el).find('img').attr('src');

        const response2 = await fetch(websiteLink + link);
        const body2 = await response2.text();
        const $2 = cheerio.load(body2);
        let details;
        $2('body').map((i, el) => {
            title = $(el).find('h1').text();
            body = $(el).find('h2').text();
            details = $(el).find('article > section > p:not(:has(script)) ').text();
        });

        console.log('e')
        console.log(`-----------------${i}`)
        console.log(`Header: ${title}`);
        console.log(`Body: ${body}`);
        console.log(`Details: ${details}`);
        console.log(`Date: ${date}`);
        console.log(`Image URL: ${imageUrl}`);
        console.log(`Link: ${websiteLink + link}`);
        const news = {
            title,
            body,
            details,
            link: websiteLink+ link,
            date,
            author: "N12",
            image: imageUrl,
            type:type
        }

        if(type === 'policy') {
            const {Policy} = require('../model/newsModel');
            const newsExit = await Policy.findOne({ link });
            if(!newsExit) {
                await Policy.create(news);
            }
        }else if(type === 'sport'){
            const {Sports} = require('../model/newsModel');
            const newsExit = await Sports.findOne({ link });
            if(!newsExit) {
                await Sports.create(news);
            }
        }

    });
}


module.exports = {N12};














