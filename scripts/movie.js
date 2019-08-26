const cheerio = require("cheerio");
const HOST = 'http://www.atmovies.com.tw/';

module.exports = function(bot) {
  bot.hear(/最近的電影/, (res) => {
    const target_url = "http://www.atmovies.com.tw/movie/next/";
    // err錯誤訊息, res回應頭, body回應內容
    bot.http(target_url).get()((err, response, body) => {
      if (response.statusCode !== 200) {
				return res.send("開眼電影網站異常");
      }
      var $ = cheerio.load(body);
      var movieList = $('div.filmtitle > a')
      // console.log(movieList.text())
      movieList.each((i, el) => {
        var title = $(el).text();
        var url = HOST + $(el).attr('href');
        res.send(title+url);
      });
    })
  })
}