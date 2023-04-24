const cheerio = require("cheerio")
const {translateText} = require('../translator')
getNews = async(url)=>{
    const response = await fetch(url)
    const body = await response.text()
    const $ =  cheerio.load(body)

     $('.category-five-articles-small-item').map(async(index,el)=>{
        const imageUrl = $(el).find('.category-five-articles-small-item-img img').attr('src')
        const title = $(el).find('.category-five-articles-text-wrap .category-five-articles-small-item-title').text()
        const link = $(el).find('a').attr('href')
        await getDetailsNews(link)
        // console.log(link);
        
    })
    // console.log(l);
}
const getDetailsNews = async(url)=>{
    const response = await fetch(url)
    const body = await response.text()
    const $ =  cheerio.load(body)
    let textBody;
    $('.article-body').map((index,el)=>{
        textBody += $(el).find('p').text()
    })
    console.log(textBody);

}
const url = `https://www.maariv.co.il/news/politics`
getNews(url)