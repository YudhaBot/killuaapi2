let { spawn } = require('child_process')
let fs = require('fs')
let path = require('path')
let tmp = path.join(__dirname, '../tmp/')
let { exec } = require('child_process')

function running(img, duration = 10, fps = 60) {
  return new Promise((resolve, reject) => {
    let layers = [
      `color=s=512x512:d=${duration}:r=${fps}[bg]`,
      '[0:v]scale=-2:512[img]',
      `[bg][img]overlay=x='(w+h)*((n/${fps})*-1/${duration})+h'`
    ]

    let n = + new Date + 'run.jpg'
    let i = path.join(tmp, n)
    fs.writeFileSync(i, img)
    console.log(img)
    let o = path.join(tmp, n + '.mp4')
    let args = [
      '-y',
      '-i', i,
      '-t', duration.toString(),
      '-filter_complex', layers.join(';'),
      '-pix_fmt', 'yuv420p',
      '-crf', '18',
      o
    ]
    console.log('ffmpeg', ...args)
    spawn('ffmpeg', args, { stdio: 'inherit' })
    .on('error', reject)
    .on('close', () => {
      try {
        fs.unlinkSync(i)
        resolve(fs.readFileSync(o))
        fs.unlinkSync(o)
      } catch (e) {
        reject(e)
      }
    })
    //.stderr.on('data', a => console.log(a+''))
  })
}
function glitch(img) {
  return new Promise((resolve, reject) => {
                    media = `./tmp/before-glitch.mp4`;
					ran = `./tmp/after-${new Date / 1000}.mp4`;
					fs.writeFileSync(media, img)
					exec(`ffmpeg -i ${media} -vf "rgbashift=rh=-7" -pix_fmt yuv420p ${ran}`, (err, stderr, stdout) => {
						// fs.unlinkSync(media)
						if (err) return reject(err)
						resolve(fs.readFileSync(ran))
						// if (fs.existsSync(ran)) fs.unlinkSync(ran)
					})
			})
}

function blur(img) {
  return new Promise((resolve, reject) => {
                    media = `./tmp/before-blurmp4`;
					ran = `./tmp/after-${new Date / 1000}.mp4`;

					fs.writeFileSync(media, img)
					exec(`ffmpeg -i ${media} -vf tmix=frames=8:weights="1 1 1 1 1 1 1 1" ${ran}`, (err, stderr, stdout) => {
						// fs.unlinkSync(media)
						if (err) return reject(err)
						resolve(fs.readFileSync(ran))
						// if (fs.existsSync(ran)) fs.unlinkSync(ran)

					})
					})
}


module.exports = { blur, glitch, running }
