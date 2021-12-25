const canvacord = require("canvacord");
const { cekKey } = require("../database/db");
const knights = require("canvas-hikki")
const option = require('knights-canvas')
const { sticker } = require("../tools/sticker");
const fs = require('fs')
const __path = process.cwd()
const tmp = __path+'/tmp/canvas_tmp'
const example_profile = 'https://i.ibb.co/G5mJZxs/rin.jpg'
const example_icon = 'https://i.ibb.co/G5mJZxs/rin.jpg'
const example_bg = 'https://i.ibb.co/4YBNyvP/images-76.jpg'
// welcome
async function welcome(req, res) {
    const username = req.query.username;
    const groupname = req.query.groupname;
    const groupicon = req.query.groupicon;
    const membercount = req.query.membercount;
    const profile = req.query.profile;
    const background = req.query.background;
    const apikey = req.query.apikey
    if (username === undefined || groupname === undefined || groupicon === undefined || membercount === undefined || profile === undefined || background === undefined || apikey === undefined)  {
        res.status(403).send({
            status: 403,
            message: 'masukan parlementer username & groupname & groupicon & membercount & profile & background & apikey'
        })
    } else {
        const check = await cekKey(apikey);
        if (!check) return res.status(403).send({
            status: 403,
            message: `apikey ${apikey} not found, please register first!`
        });
    const img = await new option.Welcome()
    .setUsername(username)
    .setGuildName(groupname)
    .setGuildIcon(groupicon)
    .setMemberCount(membercount)
    .setAvatar(profile)
    .setBackground(background)
    .toAttachment();
let Buffering = img.toBuffer();
  await fs.writeFile(tmp+'.png', Buffering, (err) => {
      if (err) return res.send({message: 'failed Write Image Next Try'})
      res.sendFile(tmp+'.png')
  })
}
  }
  
async function welcome2(req, res) {
    const username = req.query.username;
    const groupname = req.query.groupname;
    const membercount = req.query.membercount;
    const profile = req.query.profile;
    const background = req.query.background;
    const apikey = req.query.apikey
    if (username === undefined || groupname === undefined || membercount === undefined || profile === undefined || background === undefined || apikey === undefined)  {
        res.status(403).send({
            status: 403,
            message: 'masukan parlementer username & groupname & groupicon & membercount & profile & background & apikey'
        })
    } else {
        const check = await cekKey(apikey);
        if (!check) return res.status(403).send({
            status: 403,
            message: `apikey ${apikey} not found, please register first!`
        });
    const img = await new knights.Welcome2()
    .setUsername(username)
    .setAvatar(profile)
    .setGroupname(groupname)
    .setMember(membercount)
    .setBg(background)
    .toAttachment();
let Buffering = img.toBuffer();
  await fs.writeFile(tmp+'.png', Buffering, (err) => {
      if (err) return res.send({message: 'failed Write Image Next Try'})
      res.sendFile(tmp+'.png')
  })
}
  }
  async function leave2(req, res) {
    const username = req.query.username;
    const membercount = req.query.membercount;
    const profile = req.query.profile;
    const background = req.query.background;
    const apikey = req.query.apikey
    if (username === undefined || membercount === undefined || profile === undefined || background === undefined || apikey === undefined)  {
        res.status(403).send({
            status: 403,
            message: 'masukan parlementer username & groupicon & membercount & profile & background & apikey'
        })
    } else {
        const check = await cekKey(apikey);
        if (!check) return res.status(403).send({
            status: 403,
            message: `apikey ${apikey} not found, please register first!`
        });
    const img = await new knights.Goodbye2()
    .setUsername(username)
    .setAvatar(profile)
    .setMember(membercount)
    .setBg(background)
    .toAttachment();
let Buffering = img.toBuffer();
  await fs.writeFile(tmp+'.png', Buffering, (err) => {
      if (err) return res.send({message: 'failed Write Image Next Try'})
      res.sendFile(tmp+'.png')
  })
}
  }

  async function welcome3(req, res) {
    const username = req.query.username;
    const profile = req.query.profile;
    const apikey = req.query.apikey
    if (username === undefined || profile === undefined || apikey === undefined)  {
        res.status(403).send({
            status: 403,
            message: 'masukan parlementer username & profile & apikey'
        })
    } else {
        const check = await cekKey(apikey);
        if (!check) return res.status(403).send({
            status: 403,
            message: `apikey ${apikey} not found, please register first!`
        });
    const img = await new knights.Welcome3()
    .setUsername(username)
    .setAvatar(profile)
    .toAttachment();
let Buffering = img.toBuffer();
  await fs.writeFile(tmp+'.png', Buffering, (err) => {
      if (err) return res.send({message: 'failed Write Image Next Try'})
      res.sendFile(tmp+'.png')
  })
}
  }
  async function leave3(req, res) {
    const username = req.query.username;
    const profile = req.query.profile;
    const apikey = req.query.apikey
    if (username === undefined || profile === undefined || apikey === undefined)  {
        res.status(403).send({
            status: 403,
            message: 'masukan parlementer username & profile & apikey'
        })
    } else {
        const check = await cekKey(apikey);
        if (!check) return res.status(403).send({
            status: 403,
            message: `apikey ${apikey} not found, please register first!`
        });
    const img = await new knights.Goodbye3()
    .setUsername(username)
    .setAvatar(profile)
    .toAttachment();
let Buffering = img.toBuffer();
  await fs.writeFile(tmp+'.png', Buffering, (err) => {
      if (err) return res.send({message: 'failed Write Image Next Try'})
      res.sendFile(tmp+'.png')
  })
}
  }
async function createTrigger(url) {
    let img = await canvacord.Canvacord.trigger(url)
    return img
}
async function affect(url) {
    let img = await canvacord.Canvacord.affect(url)
    return img
}

async function beautiful(url) {
    let img = await canvacord.Canvacord.beautiful(url)
    return img
}
async function bed(...url) {
    let img = await canvacord.Canvacord.bed(...url)
    return img
}

async function kiss(...url) {
    let img = await canvacord.Canvacord.kiss(...url)
    return img
}

async function kissRouter(req, res) {
    let url = req.query.url;
    let url2 = req.query.url2
    let apikey = req.query.apikey;
    if (url === undefined || apikey === undefined || url2 === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url, url2 & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    kiss(url, url2)
    .then(async buffer => {
        fs.writeFile(tmp+'.png', buffer, (err) => {
            res.sendFile(tmp+'.png')
        })
    }).catch(e => {
        res.status(400).send({
            status: 400,
            message: 'error internal server contact owner rest api'
        })
    })

}

async function leave(req, res) {
    const username = req.query.username;
    const groupname = req.query.groupname;
    const groupicon = req.query.groupicon;
    const membercount = req.query.membercount;
    const profile = req.query.profile;
    const background = req.query.background;
    const apikey = req.query.apikey
    if (username === undefined || groupname === undefined || groupicon === undefined || membercount === undefined || profile === undefined || background === undefined || apikey === undefined)  {
        res.status(403).send({
            status: 403,
            message: 'masukan parlementer username & groupname & groupicon & membercount & profile & background & apikey'
        })
    } else {
        const check = await cekKey(apikey);
        if (!check) return res.status(403).send({
            status: 403,
            message: `apikey ${apikey} not found, please register first!`
        });
    const img = await new option.Goodbye()
    .setUsername(username)
    .setGuildName(groupname)
    .setGuildIcon(groupicon)
    .setMemberCount(membercount)
    .setAvatar(profile)
    .setBackground(background)
    .toAttachment();
let Buffering = img.toBuffer();
  await fs.writeFile(tmp+'.png', Buffering, (err) => {
      if (err) return res.send({message: 'failed Write Image Next Try'})
      res.sendFile(tmp+'.png')
  })
}
  }
  

async function Promote(req, res) {
    const username = req.query.username;
    const groupname = req.query.groupname;
    const groupicon = req.query.groupicon;
    const membercount = req.query.membercount;
    const profile = req.query.profile;
    const background = req.query.background;
    const apikey = req.query.apikey
    if (username === undefined || groupname === undefined || groupicon === undefined || membercount === undefined || profile === undefined || background === undefined || apikey === undefined)  {
        res.status(403).send({
            status: 403,
            message: 'masukan parlementer username & groupname & groupicon & membercount & profile & background & apikey'
        })
    } else {
        const check = await cekKey(apikey);
        if (!check) return res.status(403).send({
            status: 403,
            message: `apikey ${apikey} not found, please register first!`
        });
    const img = await new option.Promote()
    .setUsername(username)
    .setGuildName(groupname)
    .setGuildIcon(groupicon)
    .setMemberCount(membercount)
    .setAvatar(profile)
    .setBackground(background)
    .toAttachment();
let Buffering = img.toBuffer();
  await fs.writeFile(tmp+'.png', Buffering, (err) => {
      if (err) return res.send({message: 'failed Write Image Next Try'})
      res.sendFile(tmp+'.png')
  })
}
  }
  
async function Demote(req, res) {
    const username = req.query.username;
    const groupname = req.query.groupname;
    const groupicon = req.query.groupicon;
    const membercount = req.query.membercount;
    const profile = req.query.profile;
    const background = req.query.background;
    const apikey = req.query.apikey
    if (username === undefined || groupname === undefined || groupicon === undefined || membercount === undefined || profile === undefined || background === undefined || apikey === undefined)  {
        res.status(403).send({
            status: 403,
            message: 'masukan parlementer username & groupname & groupicon & membercount & profile & background & apikey'
        })
    } else {
        const check = await cekKey(apikey);
        if (!check) return res.status(403).send({
            status: 403,
            message: `apikey ${apikey} not found, please register first!`
        });
    const img = await new option.Demote()
    .setUsername(username)
    .setGuildName(groupname)
    .setGuildIcon(groupicon)
    .setMemberCount(membercount)
    .setAvatar(profile)
    .setBackground(background)
    .toAttachment();
let Buffering = img.toBuffer();
  await fs.writeFile(tmp+'.png', Buffering, (err) => {
      if (err) return res.send({message: 'failed Write Image Next Try'})
      res.sendFile(tmp+'.png')
  })
}
  }
  async function kaneki(req, res) {
      const q = req.query.text;
      const apikey = req.query.apikey;
      if (q === undefined || apikey === undefined) {
          res.status(403).send({
              status: 403,
              message: "masukan parlementer text & apikey"
          })
      } else {
        let cek = await cekKey(apikey)
        if (!cek) return res.status(403).send({
            status: 403,
            message: "invalid Apikey First Create Account To Get Apikey"
        })
      let img = await new knights.Gfx1()
      .setName(q)
      .toAttachment()
      let buffering = img.toBuffer()
      fs.writeFile(tmp+'.png', buffering, (err) => {
          if (err) return res.status(400).send({
              status: 400,
              message: "fiture error please contact owner"
          })
          res.sendFile(tmp+'.png')
      })
  }
}
async function loli(req, res) {
    const q = req.query.text;
    const apikey = req.query.apikey;
    if (q === undefined || apikey === undefined) {
        res.status(403).send({
            status: 403,
            message: "masukan parlementer text & apikey"
        })
    } else {
      let cek = await cekKey(apikey)
      if (!cek) return res.status(403).send({
          status: 403,
          message: "invalid Apikey First Create Account To Get Apikey"
      })
    let img = await new knights.Gfx2()
    .setName(q)
    .toAttachment()
    let buffering = img.toBuffer()
    fs.writeFile(tmp+'.png', buffering, (err) => {
        if (err) return res.status(400).send({
            status: 400,
            message: "fiture error please contact owner"
        })
        res.sendFile(tmp+'.png')
    })
}
}
async function sadboy(req, res) {
    const q = req.query.text;
    const q2 = req.query.text2;
    const apikey = req.query.apikey;
    if (q === undefined || apikey === undefined || q2 === undefined) {
        res.status(403).send({
            status: 403,
            message: "masukan parlementer text text2 & apikey"
        })
    } else {
      let cek = await cekKey(apikey)
      if (!cek) return res.status(403).send({
          status: 403,
          message: "invalid Apikey First Create Account To Get Apikey"
      })
    let img = await new knights.Gfx3()
    .setText1(q)
    .setText2(q2)
    .toAttachment()
    let buffering = img.toBuffer()
    fs.writeFile(tmp+'.png', buffering, (err) => {
        if (err) return res.status(400).send({
            status: 400,
            message: "fiture error please contact owner"
        })
        res.sendFile(tmp+'.png')
    })
}
}
async function girlNeko(req, res) {
    const q = req.query.text;
    const q2 = req.query.text2;
    const apikey = req.query.apikey;
    if (q === undefined || apikey === undefined || q2 === undefined) {
        res.status(403).send({
            status: 403,
            message: "masukan parlementer text text2 & apikey"
        })
    } else {
      let cek = await cekKey(apikey)
      if (!cek) return res.status(403).send({
          status: 403,
          message: "invalid Apikey First Create Account To Get Apikey"
      })
    let img = await new knights.Gfx4()
    .setText1(q)
    .setText2(q2)
    .toAttachment()
    let buffering = img.toBuffer()
    fs.writeFile(tmp+'.png', buffering, (err) => {
        if (err) return res.status(400).send({
            status: 400,
            message: "fiture error please contact owner"
        })
        res.sendFile(tmp+'.png')
    })
}
}
async function rem(req, res) {
    const q = req.query.text;
    const apikey = req.query.apikey;
    if (q === undefined || apikey === undefined) {
        res.status(403).send({
            status: 403,
            message: "masukan parlementer text & apikey"
        })
    } else {
      let cek = await cekKey(apikey)
      if (!cek) return res.status(403).send({
          status: 403,
          message: "invalid Apikey First Create Account To Get Apikey"
      })
    let img = await new knights.Gfx5()
    .setText(q)
    .toAttachment()
    let buffering = img.toBuffer()
    fs.writeFile(tmp+'.png', buffering, (err) => {
        if (err) return res.status(400).send({
            status: 400,
            message: "fiture error please contact owner"
        })
        res.sendFile(tmp+'.png')
    })
}
}
async function customGfx2(req, res) {
    const q = req.query.text;
    const q2 = req.query.text2;
    const bg = req.query.bg;
    const apikey = req.query.apikey;
    if (q === undefined || apikey === undefined || q2 === undefined || bg === undefined) {
        res.status(403).send({
            status: 403,
            message: "masukan parlementer text text2 bg & apikey"
        })
    } else {
      let cek = await cekKey(apikey)
      if (!cek) return res.status(403).send({
          status: 403,
          message: "invalid Apikey First Create Account To Get Apikey"
      })
    let img = await new knights.customGfx2()
    .setText1(q)
    .setText2(q2)
    .setBg(bg)
    .toAttachment()
    let buffering = img.toBuffer()
    fs.writeFile(tmp+'.png', buffering, (err) => {
        if (err) return res.status(400).send({
            status: 400,
            message: "fiture error please contact owner"
        })
        res.sendFile(tmp+'.png')
    })
}
}
async function customGfx(req, res) {
    const q = req.query.text;
    const bg = req.query.bg;
    const apikey = req.query.apikey;
    if (q === undefined || apikey === undefined || bg === undefined) {
        res.status(403).send({
            status: 403,
            message: "masukan parlementer text & apikey"
        })
    } else {
      let cek = await cekKey(apikey)
      if (!cek) return res.status(403).send({
          status: 403,
          message: "invalid Apikey First Create Account To Get Apikey"
      })
    let img = await new knights.customGfx()
    .setText(q)
    .setBg(bg)
    .toAttachment()
    let buffering = img.toBuffer()
    fs.writeFile(tmp+'.png', buffering, (err) => {
        if (err) return res.status(400).send({
            status: 400,
            message: "fiture error please contact owner"
        })
        res.sendFile(tmp+'.png')
    })
}
}
async function createTrigger(url) {
    let img = await canvacord.Canvacord.trigger(url)
    return img
}
async function affect(url) {
    let img = await canvacord.Canvacord.affect(url)
    return img
}

async function beautiful(url) {
    let img = await canvacord.Canvacord.beautiful(url)
    return img
}
async function bed(...url) {
    let img = await canvacord.Canvacord.bed(...url)
    return img
}

async function kiss(...url) {
    let img = await canvacord.Canvacord.kiss(...url)
    return img
}

async function kissRouter(req, res) {
    let url = req.query.url;
    let url2 = req.query.url2
    let apikey = req.query.apikey;
    if (url === undefined || apikey === undefined || url2 === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url, url2 & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    kiss(url, url2)
    .then(async buffer => {
        fs.writeFile(tmp+'.png', buffer, (err) => {
            res.sendFile(tmp+'.png')
        })
    }).catch(e => {
        res.status(400).send({
            status: 400,
            message: 'error internal server contact owner rest api'
        })
    })

}
async function spank(...url) {
    let img = await canvacord.Canvacord.spank(...url)
    return img
}

async function spankRouter(req, res) {
    let url = req.query.url;
    let url2 = req.query.url2
    let apikey = req.query.apikey;
    if (url === undefined || apikey === undefined || url2 === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url, url2 & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    spank(url, url2)
    .then(async buffer => {
        fs.writeFile(tmp+'.png', buffer, (err) => {
            res.sendFile(tmp+'.png')
        })
    }).catch(e => {
        res.status(400).send({
            status: 400,
            message: 'error internal server contact owner rest api'
        })
    })

}
async function slap(...url) {
    let img = await canvacord.Canvacord.slap(...url)
    return img
}

async function slapRouter(req, res) {
    let url = req.query.url;
    let url2 = req.query.url2
    let apikey = req.query.apikey;
    if (url === undefined || apikey === undefined || url2 === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url, url2 & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    slap(url, url2)
    .then(async buffer => {
        const toWebp = await sticker(buffer, null, 'triggred from rest api', 'hardianto.xyz')
        fs.writeFile(tmp+'.webp', toWebp, (err) => {
            res.sendFile(tmp+'.webp')
        })
    }).catch(e => {
        res.status(400).send({
            status: 400,
            message: 'error internal server contact owner rest api'
        })
    })

}
async function facepalm(url) {
    let img = await canvacord.Canvacord.facepalm(url)
    return img
}
async function rainbow(url) {
    let img = await canvacord.Canvacord.rainbow(url)
    return img
}
async function rip(url) {
    let img = await canvacord.Canvacord.rip(url)
    return img
}
async function trash(url) {
    let img = await canvacord.Canvacord.trash(url)
    return img
}
async function hitler(url) {
    let img = await canvacord.Canvacord.hitler(url)
    return img
}
async function joker(url) {
    let img = await canvacord.Canvacord.jokeOverHead(url)
    return img
}
async function distracted(...url) {
    let img = await canvacord.Canvacord.distracted(...url)
    return img
}
async function jail(url) {
    let img = await canvacord.Canvacord.jail(url)
    return img
}
async function delete_(url) {
    let img = await canvacord.Canvacord.delete(url, true)
    return img  
}

async function deleteRouter(req, res) {
    let url = req.query.url;
    let apikey = req.query.apikey;
    if (url === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    delete_(url)
    .then(async buffer => {
        fs.writeFile(tmp+'.png', buffer, (err) => {
            res.sendFile(tmp+'.png')
        })
    }).catch(e => {
        res.status(400).send({
            status: 400,
            message: 'error internal server contact owner rest api'
        })
    })

}
async function wasted(url) {
    let img = await canvacord.Canvacord.wasted(url)
    return img
}

async function wastedRouter(req, res) {
    let url = req.query.url;
    let apikey = req.query.apikey;
    if (url === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    wasted(url)
    .then(async buffer => {
        fs.writeFile(tmp+'.png', buffer, (err) => {
            res.sendFile(tmp+'.png')
        })
    }).catch(e => {
        res.status(400).send({
            status: 400,
            message: 'error internal server contact owner rest api'
        })
    })

}

async function wanted(url) {
    let img = await canvacord.Canvacord.wanted(url)
    return img
}

async function wantedRouter(req, res) {
    let url = req.query.url;
    let apikey = req.query.apikey;
    if (url === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url, url2 & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    wanted(url)
    .then(async buffer => {
        fs.writeFile(tmp+'.png', buffer, (err) => {
            res.sendFile(tmp+'.png')
        })
    }).catch(e => {
        res.status(400).send({
            status: 400,
            message: 'error internal server contact owner rest api'
        })
    })

}
async function shit(url) {
    let img = await canvacord.Canvacord.shit(url)
    return img
}

async function shitRouter(req, res) {
    let url = req.query.url;
    let apikey = req.query.apikey;
    if (url === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url, url2 & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    shit(url)
    .then(async buffer => {
        fs.writeFile(tmp+'.png', buffer, (err) => {
            res.sendFile(tmp+'.png')
        })
    }).catch(e => {
        res.status(400).send({
            status: 400,
            message: 'error internal server contact owner rest api'
        })
    })

}
async function triggerRouter(req, res) {
    let url = req.query.url;
    let apikey = req.query.apikey;
    if (url === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    createTrigger(url)
    .then(async buffer => {
        const toWebp = await sticker(buffer, null, 'triggred from rest api', 'hardianto.xyz')
        fs.writeFile(tmp+'.webp', toWebp, (err) => {
            res.type('webp')
            res.sendFile(tmp+'.webp')
        })
    }).catch(e => {
        res.status(400).send({
            status: 400,
            message: 'error internal server contact owner rest api'
        })
    })

}

async function beautifulRouter(req, res) {
    let url = req.query.url;
    let apikey = req.query.apikey;
    if (url === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    beautiful(url)
    .then(async buffer => {
        fs.writeFile(tmp+'.webp', buffer, (err) => {
            res.sendFile(tmp+'.webp')
        })
    }).catch(e => {
        res.status(400).send({
            status: 400,
            message: 'error internal server contact owner rest api'
        })
    })

}

async function jokerRouter(req, res) {
    let url = req.query.url;
    let apikey = req.query.apikey;
    if (url === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    joker(url)
    .then(async buffer => {
        fs.writeFile(tmp+'.png', buffer, (err) => {
            res.sendFile(tmp+'.png')
        })
    }).catch(e => {
        res.status(400).send({
            status: 400,
            message: 'error internal server contact owner rest api'
        })
    })

}

async function jailRouter(req, res) {
    let url = req.query.url;
    let apikey = req.query.apikey;
    if (url === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    jail(url)
    .then(async buffer => {
        fs.writeFile(tmp+'.png', buffer, (err) => {
            res.sendFile(tmp+'.png')
        })
    }).catch(e => {
        res.status(400).send({
            status: 400,
            message: 'error internal server contact owner rest api'
        })
    })

}
async function distractedRouter(req, res) {
    let url = req.query.url;
    let url2 = req.query.url2;
    let url3 = req.query.url3;
    let apikey = req.query.apikey;
    if (url === undefined || url2=== undefined || url3 === undefined ||apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url, url2, url3 & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    distracted(url, url2, url3)
    .then(async buffer => {
        fs.writeFile(tmp+'.png', buffer, (err) => {
            res.sendFile(tmp+'.png')
        })
    }).catch(e => {
        res.status(400).send({
            status: 400,
            message: 'error internal server contact owner rest api'
        })
    })

}
async function faceRouter(req, res) {
    let url = req.query.url;
    let apikey = req.query.apikey;
    if (url === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url, url2 & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    facepalm(url)
    .then(async buffer => {
        fs.writeFile(tmp+'.png', buffer, (err) => {
            res.sendFile(tmp+'.png')
        })
    }).catch(e => {
        res.status(400).send({
            status: 400,
            message: 'error internal server contact owner rest api'
        })
    })

}

async function trashRouter(req, res) {
    let url = req.query.url;
    let apikey = req.query.apikey;
    if (url === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url, url2 & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    trash(url)
    .then(async buffer => {
        fs.writeFile(tmp+'.png', buffer, (err) => {
            res.sendFile(tmp+'.png')
        })
    }).catch(e => {
        res.status(400).send({
            status: 400,
            message: 'error internal server contact owner rest api'
        })
    })

}

async function hitlerRouter(req, res) {
    let url = req.query.url;
    let apikey = req.query.apikey;
    if (url === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    hitler(url)
    .then(async buffer => {
        fs.writeFile(tmp+'.png', buffer, (err) => {
            res.sendFile(tmp+'.png')
        })
    }).catch(e => {
        res.status(400).send({
            status: 400,
            message: 'error internal server contact owner rest api'
        })
    })

}
async function ripRouter(req, res) {
    let url = req.query.url;
    let apikey = req.query.apikey;
    if (url === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    rip(url)
    .then(async buffer => {
        fs.writeFile(tmp+'.png', buffer, (err) => {
            res.sendFile(tmp+'.png')
        })
    }).catch(e => {
        res.status(400).send({
            status: 400,
            message: 'error internal server contact owner rest api'
        })
    })

}
async function rainbowRouter(req, res) {
    let url = req.query.url;
    let apikey = req.query.apikey;
    if (url === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url, url2 & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    rainbow(url)
    .then(async buffer => {
        fs.writeFile(tmp+'.png', buffer, (err) => {
            res.sendFile(tmp+'.png')
        })
    }).catch(e => {
        res.status(400).send({
            status: 400,
            message: 'error internal server contact owner rest api'
        })
    })

}

async function bedRouter(req, res) {
    let url = req.query.url;
    let url2 = req.query.url2
    let apikey = req.query.apikey;
    if (url === undefined || apikey === undefined || url2 === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url, url2 & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    bed(url, url2)
    .then(async buffer => {
        const toWebp = await sticker(buffer, null, 'triggred from rest api', 'hardianto.xyz')
        fs.writeFile(tmp+'.webp', toWebp, (err) => {
            res.sendFile(tmp+'.webp')
        })
    }).catch(e => {
        res.status(400).send({
            status: 400,
            message: 'error internal server contact owner rest api'
        })
    })

}

async function affectRouter(req, res) {
    let url = req.query.url;
    let apikey = req.query.apikey;
    if (url === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    affect(url)
    .then(async buffer => {
        const toWebp = await sticker(buffer, null, 'triggred from rest api', 'hardianto.xyz')
        fs.writeFile(tmp+'.webp', toWebp, (err) => {
            res.sendFile(tmp+'.webp')
        })
    }).catch(e => {
        res.status(400).send({
            status: 400,
            message: 'error internal server contact owner rest api'
        })
    })

}

// async function zombieRouter(req, res) {
//     let url = req.query.url;
//     let apikey = req.query.apikey;
//     if (url === undefined || apikey === undefined) return res.status(404).send({
//         status: 404,
//         message: `Input Parameter url, url2 & apikey`
//     });
//     const check = await cekKey(apikey);
//     if (!check) return res.status(403).send({
//         status: 403,
//         message: `apikey ${apikey} not found, please register first!`
//     });
//    await zombie.transform({
//        photo: example_profile,
//        destinyFolder: tmp
//    }).then(data => {
//        console.log(data)
//     }).catch(e => {
//         console.log(e)
//         res.status(400).send({
//             status: 400,
//             message: 'error internal server contact owner rest api'
//         })
//     })

// }
module.exports = {
    affectRouter,
    beautifulRouter,
    bedRouter,
    customGfx,
    customGfx2,
    deleteRouter,
    distractedRouter,
    kaneki,
    loli,
    sadboy,
    girlNeko,
    rem,
    jailRouter,
    jokerRouter,
    kissRouter,
    spankRouter,
    shitRouter,
    slapRouter,
    faceRouter,
    rainbowRouter,
    ripRouter,
    trashRouter,
    hitlerRouter,
    wantedRouter,
    wastedRouter,
    welcome,
    leave,
    welcome2,
    leave2,
    welcome3,
    leave3,
    Promote,
    Demote,
    triggerRouter,
}