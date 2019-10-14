module.exports = function(bot){
  bot.hear(/貓貓飲料 (.*)/, function(res){
    const menuList = [
      {
        name: '珍煮丹',
        menu: 'https://i.imgur.com/Ps7Cpnt.png'
      },
      {
        name: ['五十嵐', '50嵐'],
        menu: 'https://i.imgur.com/P8UAHJd.jpg'
      },
      {
        name: '迷客夏',
        menu: 'https://i.imgur.com/svnx95V.jpg'
      },
      {
        name: ['comebuy', 'Comebuy', 'ComeBuy'],
        menu: 'https://i.imgur.com/TJss7kg.jpg'
      }
    ]

    let result = null
    
    for (let i = 0; i < menuList.length; i++) {
      if (Array.isArray(menuList[i].name)) {
        for (let j = 0; j < menuList[i].name.length; j++) {
          if (menuList[i].name[j] === res.match[1]) {
            result = menuList[i]
          }
        }
      }
      if (menuList[i].name === res.match[1]) {
        result = menuList[i]
      }
      
      if (result !== null) {
        break
      }
    }

    res.send(result.menu)
  })
}