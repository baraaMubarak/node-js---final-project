const cheerio = require('cheerio')
const { Policy, Economy, Sports } = require('../../model/newsModel')

module.exports = async (url, type) => {
    let response = await fetch(url)
    const body = await response.text()
    const $ = cheerio.load(body)


    $('.news-list > .item-li').map(async (i, el) => {
        const title = $(el).find('h3').text()
        const body = $(el).find('p').text()
        const date = $(el).find('time').text()
        const imageUrl = 'elbalad.news' + $(el).find('img').attr('src')
        if(!$(el).find('a').attr('href')){
            return;
        }
        const link = "https://www.elbalad.news/" + $(el).find('a').attr('href')
        if (type === 'policy') {
            const newsExit = await Policy.findOne({ link });
            if (!newsExit) {
                await getElbaladDetails(link).then(async (data) => {
                    await Policy.create({
                        title: title,
                        body: body,
                        date: date,
                        imageUrl: imageUrl,
                        link: link,
                        Comment: [],
                        author: 'قناة البلد',
                        details: data.details,
                        type: 'policy'
                    })
                })
            }
        } else if (type === 'economy') {
            const newsExit = await Economy.findOne({ link });
            if (!newsExit) {
                await getElbaladDetails(link).then(async (data) => {
                    await Economy.create({
                        title: title,
                        body: body,
                        date: date,
                        imageUrl: imageUrl,
                        link: link,
                        Comment: [],
                        author: 'قناة البلد',
                        details: data.details,
                        type: 'economy'
                    })
                })
            }
        } else if (type === 'sport') {
            const newsExit = await Sports.findOne({ link });
            if (!newsExit) {
                await getElbaladDetails(link).then(async (data) => {
                    await Sports.create({
                        title: title,
                        body: body,
                        date: date,
                        imageUrl: imageUrl,
                        link: link,
                        Comment: [],
                        author: 'قناة البلد',
                        details: data.details,
                        type: 'sport'
                    })
                })
            }
        }
    })
}

const getElbaladDetails = async (url) => {
    let response = await fetch(url)
    const body = await response.text()
    const $ = cheerio.load(body)
    let details
    $('.paragraph-list').map(async (i, el) => {
        details += $(el).find('p').text()

    })
    return { details: details }
}