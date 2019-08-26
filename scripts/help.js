module.exports = function(bot) {
  bot.hear(/你會做什麼/, (res) => {
    const cmd = [
      '飲料菜單 店名(目前有: 五十嵐, 珍煮丹, 迷客夏)'
    ]

    cmd.forEach((c) => {
      res.send(c)
    })
  })
}