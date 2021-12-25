const axios = require('axios')



function convertSticker(base64, author, pack){
 return new Promise((resolve, reject) =>{
   console.log('Creating Sticker Wm')
   console.log('author : '+author)
   console.log('pack : '+pack)
axios('https://sticker-api-tpe3wet7da-uc.a.run.app/prepareWebp', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json;charset=utf-8',
      'User-Agent': 'axios/0.21.1',
      'Content-Length': 151330
    },
    data: `{"image": "${base64}","stickerMetadata":{"author":"${author}","pack":"${pack}","keepScale":true,"removebg":"HQ"},"sessionInfo":{"WA_VERSION":"2.2106.5","PAGE_UA":"WhatsApp/2.2037.6 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36","WA_AUTOMATE_VERSION":"3.6.10 UPDATE AVAILABLE: 3.6.11","BROWSER_VERSION":"HeadlessChrome/88.0.4324.190","OS":"Windows Server 2016","START_TS":1614310326309,"NUM":"6247","LAUNCH_TIME_MS":7934,"PHONE_VERSION":"2.20.205.16"},"config":{"sessionId":"session","headless":true,"qrTimeout":20,"authTimeout":0,"cacheEnabled":false,"useChrome":true,"killProcessOnBrowserClose":true,"throwErrorOnTosBlock":false,"chromiumArgs":["--no-sandbox","--disable-setuid-sandbox","--aggressive-cache-discard","--disable-cache","--disable-application-cache","--disable-offline-load-stale-cache","--disk-cache-size=0"],"executablePath":"C:\\\\Program Files (x86)\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe","skipBrokenMethodsCheck":true,"stickerServerEndpoint":true}}`
  }).then(({data}) =>{
    resolve(Buffer.from(data.webpBase64, 'base64'))
  }).catch(new Error('error'))
 }) 
}
const fetch = require('node-fetch')
const upimg = require('./upimg')

async function gif2webp(base64, author, pack){
  buff = Buffer.from(base64, 'base64')
  url = await upimg(buff)
 fs = await fetch(`https://api.xteam.xyz/sticker/wm?url=${url}&author=${author}&packname=${pack}`)
 fh = await fs.buffer()
 return fh
}

module.exports = convertSticker || gif2webp