import { app, BrowserWindow } from 'electron'
import path from 'path'


const createWindow = () => {
  const win = new BrowserWindow({
    width: 1080,
    height: 700,
    darkTheme: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('../index.html')
}

app.whenReady().then(createWindow)