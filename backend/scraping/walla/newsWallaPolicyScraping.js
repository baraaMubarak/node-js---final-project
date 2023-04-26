const cheerio = require("cheerio");
const { translateText } = require("../../translator");
const { Policy } = require("../../model/newsModel");
newsWallaPolicyScraping = async (url) => {
  const response = await fetch(url);
  const body = await response.text();
  const $ = cheerio.load(body);
  $(".category-five-articles-small-item").map(async (index, el) => {
    const imageUrl = $(el)
      .find(".category-five-articles-small-item-img img")
      .attr("src");
    const title = $(el)
      .find(
        ".category-five-articles-text-wrap .category-five-articles-small-item-title"
      )
      .text();
    const link = $(el).find("a").attr("href");
    const newsExit = await Policy.findOne({ link });
    if (!newsExit) {
      await getDetailsNews(link).then(async (data) => {
        await Policy.create({
          title: title,
          body: data.textBody,
          details: data.details,
          date: data.date,
          link: link,
          author: "قناة واللا العبرية",
          image: imageUrl,
          comments: [],
        });
        // console.log(news);
      });
    }
    // console.log(link);
  });
  // console.log(l);
};
const getDetailsNews = async (url) => {
  const response = await fetch(url);
  const body = await response.text();
  const $ = cheerio.load(body);
  let details;
  $(".article-body").map((index, el) => {
    details += $(el).find("p").text();
  });
  const date = $(".article-publish-data").find(".article-publish-date").text();
  const textBody = $(".article-details-body-container")
    .find(".article-description h2")
    .text();
  return {
    details: details,
    date: date,
    textBody: textBody,
  };
};

module.exports = {
  newsWallaPolicyScraping,
};
