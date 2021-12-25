const fetch = require("node-fetch");
const cheerio = require("cheerio");
const FormData = require("form-data");

async function pin(quert) {

let form = new FormData();
  form.append("query", quert);
  form.append("cek", "cek");
  let res = await fetch("https://tools.darkclownsecurity.id/pn", {
    method: "POST",
    headers: {
      cookie: "__cfduid=dfcdd16ef21b6d9d602b9b07ade2b97bf1619485230",
      origin: "https://tools.darkclownsecurity.id",
      referer: "https://tools.darkclownsecurity.id/pn",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36",
      ...form.getHeaders(),
    },
    body: form.getBuffer(),
  });
let to = j => JSON.stringify(j, null, "\t");

let result = [];

  let html = await res.text();
  let $ = cheerio.load(html);

let tam = [];

$("div.card").each(function(){

let gambar = $(this).find("img[height='500']").attr("src");
tam.push(gambar);
});
has = []

for (let i of tam) {
i ? has.push(i) : ''
}
return has


}
async function pin2(q) {
  hem = []
  d = await fetch(`https://api.fdci.se/rep.php?gambar=${q}`)
  g = await d.json()
  for (let i of g) {
    i ? hem.push(i) : ''
  }
  return hem
}

module.exports = require('./scraper').pinterest