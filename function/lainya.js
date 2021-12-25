const request = require("request");
const TikTokScraper = require('tiktok-scraper');
const cheerio = require('cheerio')
const formData = require('form-data')
const { default: Axios } = require('axios')
const fetch = require('node-fetch')

function otakuDesuOngoing() {
  return new Promise((resolve, reject) => {
    fetch('https://otakudesu.moe/ongoing-anime', {
      method: 'GET',
      headers: {
        'user-agent': 'Mozilla/5.0 (Linux; Android 9; Redmi 7A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.99 Mobile Safari/537.36'
      }
    })
    .then(rsp => rsp.text())
    .then((data) => {
      const $ = cheerio.load(data)
      const result = []
      $('.venz > ul > li > .detpost').each(function() {
        result.push({
          title: $(this).find('h2.jdlflm').text(),
          thumb: $(this).find('.thumbz > img').attr('src'),
          episode: $(this).find('.epz').text().trim(),
          every: $(this).find('.epztipe').text().trim(),
          last_release: $(this).find('.newnime').text(),
          url: $(this).find('.thumb > a').attr('href')
        })
      })
      resolve({
        status: 200,
        result: result
      })
    })
    .catch(reject)
  })
}

function herolist(){
            return new Promise((resolve, reject) => {
                  Axios.get('https://mobile-legends.fandom.com/wiki/Mobile_Legends:_Bang_Bang_Wiki')
                  .then(({ data }) => {
                       const $ = cheerio.load(data)
                       let data_hero = []
                       let url = []
                       $('div > div > span > span > a').get().map((result) => {
                            const name = decodeURIComponent($(result).attr('href').replace('/wiki/',''))
                            const urln = 'https://mobile-legends.fandom.com' + $(result).attr('href')
                            data_hero.push(name)
                            url.push(urln)
                       })
                       resolve({ status: 200, hero: data_hero })
                  }).catch((e) => reject({ status: 404, message: e.message }))
             })
        }
        function herodetails(name) {
             return new Promise((resolve, reject) => {
                  var splitStr = name.toLowerCase().split(' ');
                  for (var i = 0; i < splitStr.length; i++) {
                       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
                  }
                  const que = splitStr.join(' ')
                  Axios.get('https://mobile-legends.fandom.com/wiki/' + que)
                  .then(({ data }) => {
                       const $ = cheerio.load(data)
                       let mw = []
                       let attrib = []
                       let skill = []
                       const name = $('#mw-content-text > div > div > div > div > div > div > table > tbody > tr > td > table > tbody > tr > td > font > b').text() 
                       $('.mw-headline').get().map((res) => {
                            const mwna = $(res).text()
                            mw.push(mwna)
                       })
                       $('#mw-content-text > div > div > div > div > div > div > table > tbody > tr > td').get().map((rest) => {
                            const haz = $(rest).text().replace(/\n/g,'')
                            attrib.push(haz)
                       })
                       $('#mw-content-text > div > div > div > div > div > div > table > tbody > tr > td > div.progressbar-small.progressbar > div').get().map((rest) => {
                            skill.push($(rest).attr('style').replace('width:',''))
                       })
                       Axios.get('https://mobile-legends.fandom.com/wiki/' + que + '/Story')
                       .then(({ data }) => {
                            const $ = cheerio.load(data)
                            let pre = []
                            $('#mw-content-text > div > p').get().map((rest) => {
                                 pre.push($(rest).text())
                            })
                            const story = pre.slice(3).join('\n')
                            const items = []
                            const character = []
                            $('#mw-content-text > div > aside > section > div').get().map((rest) => {
                                 character.push($(rest).text().replace(/\n\t\n\t\t/g, '').replace(/\n\t\n\t/g,'').replace(/\n/g,''))
                            })
                            $('#mw-content-text > div > aside > div').get().map((rest) => {
                                 items.push($(rest).text().replace(/\n\t\n\t\t/g, '').replace(/\n\t\n\t/g,'').replace(/\n/g,''))
                            })
                            const img = $('#mw-content-text > div > aside > figure > a').attr('href')
                            const chara = character.slice(0,2)
                            const result = { 
                                 creator: zyxmaple, caliph, Hardianto, melcanz, Raku,
                                 status: 200,
                                 hero_name: name + ` ( ${mw[0].replace('CV:',' CV:')} )`,
                                 entrance_quotes: attrib[2].replace('Entrance Quotes','').replace('\n',''),
                                 hero_feature: attrib[attrib.length - 1].replace('Hero Feature',''),
                                 image: img,
                                 items: items,
                                 character: {
                                      chara
                                 },
                                 attributes: {
                                      movement_speed: attrib[12].replace('● Movement Speed',''),
                                      physical_attack: attrib[13].replace('● Physical Attack',''),
                                      magic_power: attrib[14].replace('● Magic Power',''),
                                      attack_speed: attrib[15].replace('● Attack Speed',''),
                                      physical_defense: attrib[16].replace('● Physical Defense',''),
                                      magic_defense: attrib[17].replace('● Magic Defense',''),
                                      basic_atk_crit_rate: attrib[18].replace('● Basic ATK Crit Rate',''),
                                      hp: attrib[19].replace('● HP',''),
                                      mana: attrib[20].replace('● Mana',''),
                                      ability_crit_rate: attrib[21].replace('● Ability Crit Rate',''),
                                      hp_regen: attrib[22].replace('● HP Regen',''),
                                      mana_regen: attrib[23].replace('● Mana Regen','')
                                 },
                                 price: {
                                      battle_point: mw[1].split('|')[0].replace(/ /g,''),
                                      diamond: mw[1].split('|')[1].replace(/ /g,''),
                                      hero_fragment: mw[1].split('|')[2] ? mw[1].split('|')[2].replace(/ /g,'') : 'none'
                                 },
                                 role: mw[2],
                                 skill: {
                                      durability: skill[0],
                                      offense: skill[1],
                                      skill_effects: skill[2],
                                      difficulty: skill[3]
                                 },
                                 speciality: mw[3],
                                 laning_recommendation: mw[4],
                                 release_date: mw[5],
                                 background_story: story
                            }
                            resolve(result)
                       }).catch((e) => reject({ status: 404, message: e.message }))
                  }).catch((e) => reject({ status: 404, message: e.message }))
             })
        }

function asahotak() {
    return new Promise((resolve, reject) => {
        fetch('https://www.cademedia.com/jawaban-tebak-tebakan-asah-otak', {
        	method: 'GET',
      headers: {
        'user-agent': 'Mozilla/5.0 (Linux; Android 9; Redmi 7A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.99 Mobile Safari/537.36'
      }
     })
            .then(res => res.text())
            .then(res => {
                const $ = cheerio.load(res)
                data = []
                go = $('body').find('div.entry-content').text().split('P:')
                for (let i = 2; i < go.length; i++) {
                    x = (go[i].split('J:')[0]).trim()
                    switch (i) {
                        case 229: y = (go[i].split('J:')[1].split('Level')[0].split('Demikian')[0]).trim()
                            break; default: y = (go[i].split('J:')[1].split('Level')[0]).trim()
                    } data.push({ pertanyaan: x, jawaban: y })
                }
                // save json
                const random = data[Math.floor(Math.random() * data.length)]
                   resolve({
        status: 200,
        result: random
      })
            }).catch(reject)
    })
}

function family100() {
    return new Promise((resolve, reject) => {
        fetch('https://teknologital.com/kunci-jawaban-ica-ica', {
        	method: 'GET',
      headers: {
        'user-agent': 'Mozilla/5.0 (Linux; Android 9; Redmi 7A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.99 Mobile Safari/537.36'
      }
     })
            .then(res => res.text())
            .then(res => {
                const $ = cheerio.load(res)
                data = []
                go = $('body').find('div.entry-content').text().split('Jawaban :')
                for (let i = 1; i < go.length; i++) {
                    y = (go[i - 1].split('\n')[1]).trim()
                    z = (go[i].split('\n')[0]).trim()
                    if (i !== 1) {
                        data.push({ pertanyaan: y, jawaban: z })
                    }
                }
                // save json
                const random = data[Math.floor(Math.random() * data.length)]
                resolve({
        status: 200,
        result: data
      })
            }).catch(reject)
    })
}

function siapakah() {
    return new Promise((resolve, reject) => {
        fetch('https://tutorialaplikasi.com/kunci-jawaban-tebak-siapakah-aku/', {
        	method: 'GET',
      headers: {
        'user-agent': 'Mozilla/5.0 (Linux; Android 9; Redmi 7A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.99 Mobile Safari/537.36'
      }
     })
            .then(res => res.text())
            .then(res => {
                const $ = cheerio.load(res)
                let data = []
                $('body').find('li').each(function (index, element) {
                    let x = $(this).html().split('<strong>')[0]
                    let y = $(this).find('strong').text()
                    data.push({ pertanyaan: x, jawaban: y })
                })
                data.splice(0, 11)
                data.splice(100, 131)
		const random = data[Math.floor(Math.random() * data.length)]
                resolve({
        author: 'Ramaganz',
        status: 200,
        result: random
      })
            }).catch(reject)
    })
}

function siapakah2() {
    return new Promise((resolve, reject) => {
        fetch('https://jagat-nusantara.blogspot.com/2018/01/kunci-jawaban-tebak-siapakah-aku-m.html', {
        	method: 'GET',
      headers: {
        'user-agent': 'Mozilla/5.0 (Linux; Android 9; Redmi 7A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.99 Mobile Safari/537.36'
      }
     })
            .then(res => res.text())
            .then(res => {
                const $ = cheerio.load(res)
                data = []
                go = $('article').find('div[id="adsmiddle27044024372030888142"]').text()
                for (let i = 0; i < 534; i++) {
                    x = go.split(i + '.')[1].split('\n')[0].trim()
                    y = go.split(i + '.')[1].split('Jawaban:')[1].split('\n')[0].trim()
                    data.push({ pertanyaan: x, jawaban: y })
                }
		const random = data[Math.floor(Math.random() * data.length)]
		resolve({
        author: 'Ramaganz',
        status: 200,
        result: random
      })
            }).catch(reject)
    })
}

function susunkata() {
    return new Promise((resolve, reject) => {
        fetch('https://www.cademedia.com/jawaban-tebak-tebakan-susun-kata', {
        	method: 'GET',
      headers: {
        'user-agent': 'Mozilla/5.0 (Linux; Android 9; Redmi 7A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.99 Mobile Safari/537.36'
      }
     })
            .then(res => res.text())
            .then(res => {
                const $ = cheerio.load(res)
                data = []
                go = $('body').find('article').text()
                for (let i = 2; i < 350; i++) {
                    v = go.split('Level ' + i)[1].split(':')[0]
                    x = go.split('Level ' + i)[1].split(':')[1]
                    if (i !== 21 && i !== 51 && i !== 101 && i !== 151 && i !== 201 && i !== 251 && i !== 301) {
                        if (i == 50 || i == 100 || i == 150 || i == 200 || i == 250 || i == 250 || i == 300) {
                            y = go.split('Level ' + i)[1].split('Jawaban')[1].split('Susun')[0]
                        } else {
                            y = go.split('Level ' + i)[1].split('Jawaban')[1].split('Level')[0]
                        }
                        data.push({ tipe: v.trim(), acak: x.replace(/(Jawaban)/gi, '').trim(), jawaban: y.replace(/:/g, '').trim() })
                        // save json
                        // fs.writeFileSync('./susunkata.json', JSON.stringify(data))
                    }
                }
                data.splice(0, 2)
		const random = data[Math.floor(Math.random() * data.length)]
                 resolve({
        author: 'Ramaganz',
        status: 200,
        result: random
      })
            }).catch(reject)
    })
}

function tekateki() {
    return new Promise((resolve, reject) => {
        fetch('https://www.kabargames.id/kunci-jawaban-tebak-tebakan-2020', {
        	method: 'GET',
      headers: {
        'user-agent': 'Mozilla/5.0 (Linux; Android 9; Redmi 7A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.99 Mobile Safari/537.36'
      }
     })
            .then(res => res.text())
            .then(res => {
                const $ = cheerio.load(res)
                data = []
                go = $('body').find('div.post__content').text()
                for (let i = 1; i < 201; i++) {
                    v = (go.split('Level ' + i + 'Pertanyaan:')[1].split('Jawaban')[0]).trim()
                    switch (i) {
                        case 1: x = go.split('Level ' + i + ' – 20Level ' + i)[1].split('Jawaban:')[1]
                            break
                        case 21: x = go.split('Level ' + i + ' – 40Level ' + i)[1].split('Jawaban:')[1]
                            break
                        case 41: x = go.split('Level ' + i + ' – 60Level ' + i)[1].split('Jawaban:')[1]
                            break
                        case 61: x = go.split('Level ' + i + ' – 80Level ' + i)[1].split('Jawaban:')[1]
                            break
                        case 81: x = go.split('Level ' + i + ' – 100Level ' + i)[1].split('Jawaban:')[1]
                            break
                        case 101: x = go.split('Level ' + i + ' – 120Level ' + i)[1].split('Jawaban:')[1]
                            break
                        case 121: x = go.split('Level ' + i + ' – 140Level ' + i)[1].split('Jawaban:')[1]
                            break
                        case 141: x = go.split('Level ' + i + ' – 160Level ' + i)[1].split('Jawaban:')[1]
                            break
                        case 161: x = go.split('Level ' + i + ' – 180Level ' + i)[1].split('Jawaban:')[1]
                            break
                        case 181: x = go.split('Level ' + i + ' – 200Level ' + i)[1].split('Jawaban:')[1]
                            break
                        default: x = go.split('Level ' + i)[1].split('Jawaban:')[1]
                    }
                    if (i == 20 || i == 40 || i == 60 || i == 80 || i == 100 || i == 120 || i == 140 || i == 160 || i == 180) {
                        y = (x.split('Kunci')[0]).trim()
                    } else if (i == 200) {
                        y = (x.split('Nah')[0]).trim()
                    } else {
                        y = (x.split('Level')[0]).trim()
                    }
                    data.push({ pertanyaan: v, jawaban: y })
                    // save json
                    // fs.writeFileSync('./tekateki.json', JSON.stringify(data))
                }
		const random = data[Math.floor(Math.random() * data.length)]
		resolve({
        author: 'Ramaganz',
        status: 200,
        result: random
      })
            }).catch(reject)
    })
}

function tebakGambar() {
  return new Promise((resolve, reject) => {
    const baseUrl = 'https://jawabantebakgambar.net'
    fetch(baseUrl + '/all-answers/', {
      method: 'GET',
      headers: {
        'user-agent': 'Mozilla/5.0 (Linux; Android 9; Redmi 7A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.99 Mobile Safari/537.36'
      }
    })
    .then(rsp => rsp.text())
    .then((data) => {
      const $ = cheerio.load(data)
      const result = []
      $('ul.images > li > a').each(function() {
        result.push({
          image: baseUrl + $(this).find('img').attr('data-src'),
          answer: $(this).find('span').text()
        })
      })
      const random = result[Math.floor(Math.random() * result.length)]
      resolve({
        status: 200,
        result: random
      })
    })
    .catch(reject)
  })
}

function tiktokDown(url) {
  return new Promise((resolve, reject) => {
    const baseUrl = 'https://musicaldown.com'
    fetch(baseUrl, {
      method: 'GET',
      headers: {
        'cookie': '_ga=GA1.2.688739287.1629705556; session_data=9870dd1869284d4b242c75054922ca80; _gid=GA1.2.879595532.1630422474; _gat_gtag_UA_197840056_1=1; __gads=ID=4762a0dcb9efc7df-224881c43bcb0053:T=1629705557:RT=1630422562:S=ALNI_MbtviOkS9FNAff0DmsmPc0mMGs08w',
        'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'
      }
    })
    .then(rsp => rsp.text())
    .then((data) => {
      const $ = cheerio.load(data)
      const action = $('form').attr('action')
      const urlName = $('form > div > div > input').eq(0).attr('name')
      const tokenName = $('form > div > div > input').eq(1).attr('name')
      const tokenValue = $('form > div > div > input').eq(1).attr('value')
      const bodyForm = new formData()
      bodyForm.append(urlName, url)
      bodyForm.append(tokenName, tokenValue)
      bodyForm.append('verify', 1)
      fetch(baseUrl + action, {
        method: 'POST',
        body: bodyForm,
        headers: {
          'cookie': '_ga=GA1.2.688739287.1629705556; session_data=9870dd1869284d4b242c75054922ca80; _gid=GA1.2.879595532.1630422474; _gat_gtag_UA_197840056_1=1; __gads=ID=4762a0dcb9efc7df-224881c43bcb0053:T=1629705557:RT=1630422562:S=ALNI_MbtviOkS9FNAff0DmsmPc0mMGs08w',
          'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'
        }
      })
      .then(rsp => rsp.text())
      .then((data) => {
        const $$ = cheerio.load(data)
        const action2 = $$('form').attr('action')
        fetch(baseUrl + action2, {
          method: 'GET',
          headers: {
            'cookie': '_ga=GA1.2.688739287.1629705556; session_data=9870dd1869284d4b242c75054922ca80; _gid=GA1.2.879595532.1630422474; _gat_gtag_UA_197840056_1=1; __gads=ID=4762a0dcb9efc7df-224881c43bcb0053:T=1629705557:RT=1630422562:S=ALNI_MbtviOkS9FNAff0DmsmPc0mMGs08w',
            'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'
          }
        })
        .then(rsp => rsp.text())
        .then((data) => {
          const $$$ = cheerio.load(data)
          resolve({
            status: 200,
            result: {
              thumb: $$('.welcome.section > .container > .row > .col.s12.l4 > img').attr('src'),
              mp4: {
                server_1: $$('.welcome.section > .container > .row > .col.s12.l8 > a').eq(0).attr('href'),
                server_2: $$('.welcome.section > .container > .row > .col.s12.l8 > a').eq(1).attr('href'),
                direct_link: $$('.welcome.section > .container > .row > .col.s12.l8 > a').eq(2).attr('href'),
                qr: $$('.welcome.section > .container > .row > .col.s12.l8 > p > img').attr('src')
              },
              mp3: {
                preview: $$$('.welcome.section > .container > .row > .col.s12.l4 > audio > source').attr('src'),
                server_1: $$$('.welcome.section > .container > .row > .col.s12.l8 > a').eq(0).attr('href'),
                server_2: $$$('.welcome.section > .container > .row > .col.s12.l8 > a').eq(1).attr('href'),
                direct_link: $$$('.welcome.section > .container > .row > .col.s12.l8 > a').eq(2).attr('href'),
                qr: $$$('.welcome.section > .container > .row > .col.s12.l8 > p > img').attr('src')
              }
            }
          })
        })
        .catch(reject)
      })
      .catch(reject)
    })
    .catch(reject)
  })
}

function igStory(username) {
  return new Promise((resolve, reject) => {
    const baseUrl = 'https://igmp4.com'
    fetch(baseUrl + '/download-stories.php', {
      method: 'GET',
      headers: {
        'cookie': 'PHPSESSID=ccb3ar0ul5jiu3knt2rh7pv4g4',
        'sec-ch-ua': '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36'
      }
    })
    .then(rsp => rsp.text())
    .then((data) => {
      const $ = cheerio.load(data)
      const token = $('input[name="token"]').attr('value')
      const bodyForm = new formData()
      bodyForm.append('url', 'https://www.instagram.com/' + username)
      bodyForm.append('action', 'story')
      bodyForm.append('token', token)
      bodyForm.append('json', '')
      fetch(baseUrl + '/system/action.php', {
        method: 'POST',
        body: bodyForm,
        headers: {
          'cookie': 'PHPSESSID=ccb3ar0ul5jiu3knt2rh7pv4g4',
          'sec-ch-ua': '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36'
        }
      })
      .then(v => v.json())
      .then((data) => {
        resolve({
          status: 200,
          result: data.medias
        })
      })
      .catch(reject)
    })
    .catch(reject)
  })
}

async function whois(domain = 'caranya.my.id') {
  return new Promise((resolve, reject) => {
    var options = { 
      method: 'POST',
      url: 'https://www.hostinger.co.id/whois',
      headers: { 
        'content-type': 'application/x-www-form-urlencoded'
      },
      form: { 
        domain: `${domain}`, 
        submit: 'search' 
      }
    };

    request(options, async function (error, response, body) {
      if (error) throw new Error(error);
      const result = JSON.parse(body);
      resolve({
        result: result["domain"]
      });
    });
  });
}

function random(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function strong() {
    var string = "1234567890ABCDEFGIJKLMNOPQRSTUVWXYZabcdefgijklmnopqrstuvwxyz`~!@#$%^&*()_+=";
    var ranInt = random(0,string.length - 1);
    return string[ranInt];
}

function memorable() {
    var string = "1234567890ABCDEFGIJKLMNOPQRSTUVWXYZabcdefgijklmnopqrstuvwxyz";
    var ranInt = random(0,string.length - 1);
    return string[ranInt];
}

function strongPass(x){
    var ranPass = "";
    if(x != null){
        for(var i=0; i < x.length; i++){
            var rx = x[i];
            ranPass += rx == "x" ? strong() : rx;
        }
    }
    return ranPass;
}

function memorablePass(x){
    var ranPass = "";
    if(x != null){
        for(var i=0; i < x.length; i++){
            var rx = x[i];
            ranPass += rx == "x" ? memorable() : rx;
        }
    }
    return ranPass;
}

function genPassword() {
    return new Promise((resolve, reject) => {
        const low = memorablePass("xxxxxxxx")
        const medium = memorablePass("xxxxxxxxxxxx")
        const strong = strongPass("xxxxxxxxxxxxxxxx")
        const verStrong = strongPass("xxxxxxxxxxxxxxxxxxxxxxxx")
        const res = {
            low: low,
            medium: medium,
            strong: strong,
            verStrong: verStrong
        }
        resolve(res)
    })
}

const TiktokStalk = (username) => new Promise((resolve, reject) => {
  if (url === 'undefined') { reject('masukan text nya kak.') }
  try {
  TiktokData(username).then(data => {
    resolve(data);
  });
  } catch (error) {
      reject({
    code:400,
    message: error
  });
  }
})


async function TiktokData(url) {
	const videoMeta = await TikTokScraper.getVideoMeta(url);
    return ({
		Status: 200,
    result: {
    Id: videoMeta.collector[0].id,
    CreateTime: videoMeta.collector[0].createTime,
		Judul: videoMeta.collector[0].text,
    Thumb: videoMeta.collector[0].imageUrl,
		WithWM: videoMeta.collector[0].videoUrl,
    }
  });
}


const Tiktok = (url) => new Promise((resolve, reject) => {
    if (url === 'undefined') { reject('masukan text nya kak.') }
    try {
		TiktokData(url).then(data => {
			resolve(data);
		});
    } catch (error) {
        reject({
			code:400,
			message: error
		});
    }
})


module.exports = {
  whois,
  Tiktok,
  tiktokDown,
  otakuDesuOngoing,
  tebakGambar,
  TiktokStalk,
  igStory,
  genPassword,
  asahotak,
  family100,
  siapakah,
  siapakah2,
  susunkata,
  tekateki
};
