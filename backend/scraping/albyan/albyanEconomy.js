const cheerio = require('cheerio');
const { Economy } = require("../../model/newsModel");

module.exports = async(url)=>{
    const response = await fetch(url)
    const body = await response.text()
    const $ = cheerio.load(body)
  $('ul li article').map(async(index,el)=>{
    const title = $(el).find('article .text h3 a').text()
    const link = $(el).find('article .text h3 a').attr('href')
    if(!link){
      return;
  }
    const newsExit = await Economy.findOne({ link });
    if (!newsExit) {
      await getDetailsNews(link).then(async (data) => {
        await Economy.create({
          title: title,
          body: data.textBody,
          details: data.details,
          date: data.date,
          link: link,
          author: "قناة البيان",
          image: data.imageUrl,
          comments: [],
          type:'policy'
        });
        // console.log(news);
      });
    }
  })
  // console.log(l);
}

const getDetailsNews = async (url) => {
  const response = await fetch(url);
  const body = await response.text();
  const $ = cheerio.load(body);
  const imgUrl =$('.detailsmedia').find('img').attr('src')
  const date =$('.publish-date').find('.published').text()
  const details =$('.articlecontent').find('p').text()
  const textBody =$('.articlecontent').find('p').first().text()
  return {
    imgUrl:imgUrl,
    details: details,
    date: date,
    textBody: textBody,
  };
}
// module.exports = {newsAlbyanEconomyScraping}
