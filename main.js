(async () => {
  const { app, BrowserWindow } = require('electron') 
  const { ipcMain } = require('electron')
  const path = require('path')
/**
 * Модуль app, который управляет жизненным циклом событий вашего приложения.
 * Модуль BrowserWindow, который создает окна приложений и управляет ими.
 * Для упаковки приложения обязательно должны быть заполнены поля description и author в package json
 */
  const createWindow = () => {
    const win = new BrowserWindow({ //создается окно в ос с размерами указанными в настройках
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js') //файл управления документом, так как отсюда нельзя обращаться к документу DOM
      }
    })
    ipcMain.handle('ping', () => 'pong') //отдаем информацию из основного процесса
    win.loadFile('index.html') // подключение документа который откроется в окне ос
    //win.loadURL('https://github.com') //загрузка ссылки в приложение
  }
  
  await app.whenReady()

  createWindow()
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })
})()

