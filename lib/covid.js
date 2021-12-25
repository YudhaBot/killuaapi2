const axios = require('axios')
const cheerio = require('cheerio')

const covid = async (negara) => {
const res = await axios.get(`https://www.worldometers.info/coronavirus/country/${negara}/`) 
const $ = cheerio.load(res.data)
hasil = {}
a = $('div#maincounter-wrap')
hasil.status = res.status
hasil.kasus = parseInt($(a).find('div > span').eq(0).text().replace(/[^0-9]/g, ''))
hasil.kematian = parseInt($(a).find('div > span').eq(1).text().replace(/[^0-9]/g, ''))
hasil.sembuh = parseInt($(a).find('div > span').eq(2).text().replace(/[^0-9]/g, ''))
return hasil
}


module.exports = covid
