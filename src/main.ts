import { app, BrowserWindow,ipcMain } from 'electron';
import path from 'path';


const createWindow = () => {
	const win = new BrowserWindow({
		width: 1080,
		height: 700,
		darkTheme: true,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js')
		}
	});
	ipcMain.handle('ping', () => ({a:1,b:2,c:3}));
	win.loadFile('../index.html');
};

app.whenReady().then(()=>{
	createWindow();
	setTimeout(() => {
		app.quit();
	}, 300000);
});