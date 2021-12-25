const axios = require('axios')
const fetch = require('node-fetch')
const FormData = require('form-data')
const { fromBuffer } = require('file-type')

async function convertSticker(base64, author, pack){
  buff = Buffer.from(base64, 'base64')
  url = await upimg(buff)
 fs = await fetch(`https://api.xteam.xyz/sticker/wm?url=${url}&author=${author}&packname=${pack}`)
 fh = await fs.buffer()
 return fh
}

async function upimg(buffer) {
  const { ext } = await fromBuffer(buffer) || {}
  let form = new FormData
  form.append('file', buffer, 'tmp.' + ext)
  let res = await fetch('https://file.io/?expires=1d', { // 1 Day Expiry Date
    method: 'POST',
    body: form
  })
  let json = await res.json()
  if (!json.success) throw json
console.log(json)
  return json.link
}
module.exports = convertSticker