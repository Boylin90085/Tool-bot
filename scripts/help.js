module.exports = function(bot) {
  bot.hear(/貓貓會做什麼/, (res) => {
    const cmd = [
      '貓貓飲料 店名(目前有: 五十嵐, 珍煮丹, 迷客夏, comebuy)',
      '貓貓電影'
    ]

    cmd.forEach((c) => {
      res.send(c);
    })
  });
}