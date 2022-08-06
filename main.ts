import { app, BrowserWindow } from 'electron'


const createWindow = () => {
  const win = new BrowserWindow({
    width: 700,
    height: 700,
    darkTheme: true
  })

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)