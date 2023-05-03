const cheerio = require("cheerio")
const { Policy, Economy, Sports } = require('../../model/newsModel')    

module.exports = async (url, type) => {
    try {
        let response = await fetch(url)
        const body = await response.text()
        const $ = cheerio.load(body)

        $('.gc').map(async (i, el) => {
            const title = $(el).find('.gc__title').text()
            const body = $(el).find('.gc__body-wrap').text()
            const date = $(el).find('.screen-reader-text').text()
            const imageUrl = 'https://www.aljazeera.net/' + $(el).find('.responsive-image > img').attr('src')

            const link = url + $(el).find('.u-clickable-card__link').attr('href')
            if(!link){
                return;
            }
            if (type === 'policy') {
                const newsExit = await Policy.findOne({ link });
                if (!newsExit) {
                    await getDetailsNews(link).then(async (data) => {
                        await Policy.create({
                            title: title,
                            body: body,
                            date: date,
                            imageUrl: imageUrl,
                            link: link,
                            Comment: [],
                            author: 'قناة الجزيرة',
                            details: data.details,
                            type: 'policy'
                        })
                    })
                }
            } else if (type === 'economy') {
                const newsExit = await Economy.findOne({ link });
                if (!newsExit) {
                    await getDetailsNews(link).then(async (data) => {
                        await Economy.create({
                            title: title,
                            body: body,
                            date: date,
                            imageUrl: imageUrl,
                            link: link,
                            Comment: [],
                            author: 'قناة الجزيرة',
                            details: data.details,
                            type: 'economy'
                        })
                    })
                }
            } else if (type === 'sport') {
                const newsExit = await Sports.findOne({ link });
                if (!newsExit) {
                    await getDetailsNews(link).then(async (data) => {
                        await Sports.create({
                            title: title,
                            body: body,
                            date: date,
                            imageUrl: imageUrl,
                            link: link,
                            Comment: [],
                            author: 'قناة الجزيرة',
                            details: data.details,
                            economy: 'sport'
                        })
                    })
                }
            }

        })

    } catch (error) {

        console.log(error);
    }
}


const getDetailsNews = async (url) => {
    let response = await fetch(url);
    const body = await response.text();
    const $ = cheerio.load(body);
    let details
    $('.wysiwyg--all-content').map(async (i, el) => {
        details += $(el).find('p').text()
        // console.log(details)
    })
    return { details: details }
}

// module.exports = {
//     getAljazeraNews
// }