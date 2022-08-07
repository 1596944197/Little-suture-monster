import { app, BrowserWindow, ipcMain, desktopCapturer, dialog } from 'electron';
import path from 'path';


ipcMain.handle('ping', () => ({ a: 1, b: 2, c: 3 }));

const createWindow = async () => {
	const win = new BrowserWindow({
		width: 1080,
		height: 700,
		darkTheme: true,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js')
		}
	});

	const data = await dialog.showOpenDialog({
		properties: ['openFile', 'multiSelections'],
		filters: [
			{
				name: 'Images', extensions: ['jpg', 'png', 'gif']
			}
		]
	})
	win.webContents.send('showImages', data.filePaths)

	win.webContents.send('MainProcess', win)

	win.webContents.toggleDevTools()
	win.loadFile('../index.html');
};

app.whenReady().then(() => {
	createWindow();
	setTimeout(() => {
		app.quit();
	}, 3000000);
});

