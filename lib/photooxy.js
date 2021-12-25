const { default: axios } = require("axios");
const cheerio = require('cheerio');
const qs = require('qs');
const request = require('request');

function oxy(teks, url) {
    return new Promise((resolve, reject) => {
        const data = qs.stringify({
            'text_1': teks,
            'login': 'OK' 
        })
        const config = {
        method: 'post',
        url,
        headers: { 
            'authority': 'photooxy.com', 
            'content-type': 'application/x-www-form-urlencoded', 
            'user-agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36', 
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,/;q=0.8,application/signed-exchange;v=b3;q=0.9',
        },
        data : data
        }
        axios(config)
        .then(({data}) => {
            const $ = cheerio.load(data)
            const result = $('div.btn-group > a').attr('href')
            resolve({result: result});
        })
    })
}

async function slidePhotooxy(text, value) {
    return new Promise((resolve, reject) => {
        request({ method: 'POST',
            url: 'https://photooxy.com/other-design/make-a-video-that-spells-your-name-237.html',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            formData: { optionNumber_0: value, text_1: text, login: 'OK' } }, 
            async function (error, response, body) {
            if (error) throw new Error(error);
                const $ = cheerio.load(body)
                const result = $('div.btn-group > a').attr('href')
                resolve({
                    status: 200,
                    creator: 'Melcanz',
                    result: result
                });
        });
    })
}

module.exports = { oxy, slidePhotooxy }