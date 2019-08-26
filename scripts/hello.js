module.exports = function(bot){
  bot.hear(/飲料菜單 (.*)/, function(res){
    const menuList = [
      {
        name: '珍煮丹',
        menu: 'https://i.imgur.com/Ps7Cpnt.png'
      },
      {
        name: '五十嵐',
        menu: 'https://i.imgur.com/P8UAHJd.jpg'
      },
      {
        name: '迷客夏',
        menu: 'https://i.imgur.com/svnx95V.jpg'
      }
    ]

    const menuData = menuList.find((m) => {
      return m.name === res.match[1]
    })

    res.send(menuData.menu);
  });
}