const cheerio = require("cheerio");
const HOST = 'http://www.atmovies.com.tw/';

module.exports = function(bot) {
  bot.hear(/上映中的電影/, (res) => {
    // const target_url = "http://www.atmovies.com.tw/movie/next/";
    const target_url = 'https://movies.yahoo.com.tw/movie_intheaters.html';
    // err錯誤訊息, res回應頭, body回應內容
    bot.http(target_url).get()((err, response, body) => {
      if (response.statusCode !== 200) {
				return res.send("Yahoo 電影網站異常");
      }
      const $ = cheerio.load(body);
      const movieList = $('.release_list > li .release_info .release_movie_name > a');
      // console.log(movieList.text())
      if (movieList.length > 10) {
        movieList = movieList.splice(0, 9)
      }
      $(movieList).each((i, el) => {
        const title = $(el).text().trim();
        const url = $(el).attr('href');
        res.send(title+' '+url);
      });
    })
  })
}