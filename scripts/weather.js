const puppeteer = require('puppeteer')
const cheerio = require("cheerio")

module.exports = function(bot) {
  bot.hear(/天氣如何/, (res) => {
    const targer_url = 'https://www.cwb.gov.tw/V8/C/W/County/County.html?CID=63';

    (async () => {
      const browser = await puppeteer.launch({
          headless: false
          //false 會讓瀏覽器實際開啟
          //true 會再後台開啟
      })
      const page = await browser.newPage()
      const response = await page.goto('https://www.cwb.gov.tw/V8/C/W/County/County.html?CID=63')

      if (response.headers().status !== 200) {
        return res.send('氣象局網站異常')
      }

      await page.waitForSelector('ul')
      let body = await page.content()
      let $ = await cheerio.load(body)
      //我們把cheerio找到的資料轉成文字並存進data這個變數
      let weatherData = [];
      
      await $('ul#36HR_MOD li').each((i, el) => {
        let $2 = cheerio.load($(el).html())
        let data = {}

        data.title = $2('.title').text()
        data.temp = $2('.tem-C').text()
        data.rain = $2('.rain').contents().last().text()

        weatherData.push(data)
      })
      console.log(weatherData)

      res.send(`${weatherData.title} 氣溫: ${data.temp} 降雨機率: ${data.rain}`)
      await browser.close()
  })();
    
  //   res.http(targer_url).get()((err, response, body) => {

  //     if (response.statusCode !== 200) {
  //       return res.send('氣象局網站異常')
  //     }

  //     const $ = cheerio.load(body)
  //     setTimeout(() => {

  //     }, 500)
  //     const test = $('ul#36HR_MOD > li:nth-child(1) > span.title')
  //     console.log(body)
  //     res.send('123')
  //   })
  })
}