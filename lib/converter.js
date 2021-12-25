const { spawn } = require('child_process')
const util = require('util')

 async function webp2png(buffer) {
 return new Promise((resolve, reject) => {
    let sticker = buffer
    if (!sticker) throw sticker
    let bufs = []
    const [_spawnprocess, ..._spawnargs] = ['magick', 'convert', 'webp:-', 'png:-']
    let im = spawn(_spawnprocess, _spawnargs)
    im.on('error', e => reject(e))
    im.stdout.on('data', chunk => bufs.push(chunk))
    im.stdin.write(sticker)
    im.stdin.end()
    im.on('exit', () => {
      resolve(Buffer.concat(bufs))
    })
   })
  }

     async function towebp(buffer, opts = { pack : '', author: "" }) {
 return new Promise(async (resolve, reject) => {
    try {
    let { ext } = !/https?:\/\//.test(buffer) ? await require('file-type').fromBuffer(buffer) : { ext: "png" }
    let isAnimated = /gif|mp4/.test(ext)
    const WSF = require('wa-sticker-formatter')



    const sticker = new WSF.Sticker(buffer, { animated: isAnimated, pack:opts.pack, author: opts.author})

    await sticker.build()

    const sticBuffer = await sticker.get()

    resolve(sticBuffer)
    } catch (e) {
    reject(e)
    }
    })
    }
    
module.exports = { webp2png, towebp }
