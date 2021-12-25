exports.igdl = async(link) => {
    let { pathname } = new URL(link)
    return new Promise((resolve, reject) => {
    require("axios")({ 
			url: "https://www.instagramsave.com/",
			method: "GET",
			headers: {
				"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36"
			}
		}).then((response) => {
		Promise.all([require("axios")({
				url: "https://www.instagramsave.com/system/action.php",
				method: "POST",
				headers: {
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36",
					"cookie": response.headers["set-cookie"][0].split(";")[0]
				},
				data: new URLSearchParams(Object.entries({
					url: "https://www.instagram.com"+pathname,
					action: "post",
					token: String((require("cheerio")).load(response.data)("#token").attr("value")),
					json: ""
				}))
			})]).then((respon) => {
				 resolve(respon[0].data)
			})
		})
  })
}

exports.igstory = async(username) => {
    return new Promise((resolve, reject) => {
    require("axios")({ 
			url: "https://www.instagramsave.com/",
			method: "GET",
			headers: {
				"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36"
			}
		}).then((response) => {
		Promise.all([require("axios")({
				url: "https://www.instagramsave.com/system/action.php",
				method: "POST",
				headers: {
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36",
					"cookie": response.headers["set-cookie"][0].split(";")[0]
				},
				data: new URLSearchParams(Object.entries({
					url: "https://www.instagram.com/"+username,
					action: "story",
					token: String((require("cheerio")).load(response.data)("#token").attr("value")),
					json: ""
				}))
			})]).then((respon) => {
				 resolve(respon[0].data)
			})
		})
  })
}
