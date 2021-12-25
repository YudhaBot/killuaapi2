const axios = require('axios')
const cheerio = require('cheerio')

async function ArtiMimpi(mimpi) {
  return new Promise((resolve, reject) => {
    axios.get(`https://www.primbon.com/tafsir_mimpi.php?mimpi=${mimpi}&submit=+Submit+`)
      .then(({
        data
      }) => {
        const $ = cheerio.load(data)
        const detect = $('#body > font > i').text()
        const isAva = /Tidak ditemukan/g.test(detect) ? false : true
        if (isAva) {
          const isi = $('#body').text().split(`Hasil pencarian untuk kata kunci: ${mimpi}`)[1].replace(/\n\n\n\n\n\n\n\n\n/gi, '\n')
          const res = {
            status: 200,
            result: isi
          }
          resolve(res)
        } else {
          const res = {
            status: 404,
            result: `Arti Mimpi ${mimpi} Tidak Di Temukan`
          }
          resolve(res)
        }
      })
      .catch(reject)
  })
}

module.exports = ArtiMimpi
