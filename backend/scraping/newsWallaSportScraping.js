const cheerio = require('cheerio')
const { Sports } = require('../model/newsModel')

const newsWallaSportScraping = async(url)=>{
    const response = await fetch(url)
    const body = await response.text()
    const $ = cheerio.load(body)

    $('.post-card').map(async(index,el)=>{
        const link = $(el).find('a').attr('href')
        const title = $(el).find('.row .title-post h3').text()
        const body = $(el).find('.row .excerpt-post p').text()
        await getDetailsNews(link).then(async(data) =>{
            const newsExit = await Sports.findOne({link}) 
            if(!newsExit){
                await Sports.create({
                    title: title,
                    body:body,
                    details:data.details,
                    date:data.date,
                    link:link,
                    author:'قناة واللا العبرية',
                    image:data.imageUrl,
                    comments:[]
                })
            }
            
      });
    })

}

const getDetailsNews = async(url)=>{
    const response = await fetch(url)
    const body = await response.text()
    const $ =  cheerio.load(body)
    const details =  $('.entry-content').find('p').text()
    const imageUrl =  $('.entry-content').find('img').attr('src')
    const date =  $('.posted-on').find('.entry-date').text()
   return {
    details:details,
    date:date,
    imageUrl:imageUrl
   }

}
module.exports = {
    newsWallaSportScraping
}
// getDetailsNews('https://sport1.maariv.co.il/world-soccer/premier-league/article/1091494/');