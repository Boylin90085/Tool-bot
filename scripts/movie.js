const cheerio = require("cheerio")
// const HOST = 'https://movies.yahoo.com.tw/'

module.exports = function(bot) {
  bot.hear(/有什麼電影/, (res) => {
    const target_url = 'https://movies.yahoo.com.tw/movie_intheaters.html'
    // err錯誤訊息, res回應頭, body回應內容
    bot.http(target_url).get()((err, response, body) => {

      if (response.statusCode !== 200) {
				return res.send("Yahoo 電影網站異常")
      }

      // 把回應內容丟給 cheerio 處理
      const $ = cheerio.load(body)
      const movieList = $('.release_list > li .release_info .release_movie_name > a')

      // 最多拿10筆
      if (movieList.length > 10) {
        movieList = movieList.splice(0, 9)
      }

      res.send('現在上映中的電影有：')
      $(movieList).each((i, el) => {
        // 把拿到的標題除去多餘的空白
        const title = $(el).text().trim()
        const url = $(el).attr('href')
        res.send(title+' '+url)
      })
    })
  })
}