const cheerio = require("cheerio")
const { Policy } = require("../../model/newsModel");

module.exports = async(url)=>{
    let response = await fetch(url)
    const body = await response.text()
    const $ = cheerio.load(body)
    $('.category .item').map(async(index,el)=>{
       const title = $(el).find('.title').text()
       const link = $(el).find('.eff').attr('href')
       if(!link){
        return;
       }
       const imageUrl = $(el).find('.thumb a img').attr('src')
    const newsExit = await Policy.findOne({ link });
    if (!newsExit) {
      await getDetailsNews(link).then(async (data) => {
        await Policy.create({
            title: title,
            body: data.textBody,
            details: data.details,
            date: data.date,
            link: link,
            author: "قناة الأقصى",
            image: imageUrl,
            comments: [],
            type:'policy'
          });
      });
    }
}
    )

}
const getDetailsNews = async (url) => {
    try {
        let response = await fetch(url);
        const body = await response.text();
        const $ = cheerio.load(body);
        const date = $(".post-details").find(".datetime").text();
        const details = $(".post-text2").find("p").text();
        const textBody = $(".post-text2").find("p").first().text();
        console.log(textBody);
        return {
            details: details,
            date: date,
            textBody: textBody,
        };
    }catch (e) {
        console.log(e)
    }
  };
  // module.exports = {newsAlAqsaPolicyScraping}
