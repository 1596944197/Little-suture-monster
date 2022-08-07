import { app, BrowserWindow, ipcMain, net, screen, session } from 'electron';
import path from 'path';
import { writeFileSync } from 'fs';
import shell from 'shelljs';
import { createServer } from 'http';

shell.config.execPath = shell.which('node')?.toString() || '';

ipcMain.handle('ping', () => ({ a: 1, b: 2, c: 3 }));

const init = async () => {
	const { width, height } = screen.getPrimaryDisplay().workAreaSize;
	const win = new BrowserWindow({
		width,
		height,
		darkTheme: true,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js')
		}
	});

	win.webContents.toggleDevTools();
	win.loadFile('../index.html');

	(() => {
		const url = 'http://iwenwiki.com/api/FingerUnion/data.json';
		const req = net.request(url);
		req.on('response', response => {
			const buffer: Buffer[] = [];
			let size = 0;
			response.on('data', (buf) => {
				buffer.push(buf);
				size += buf.length;
				console.log('正在传输');
			});
			response.on('end', () => {
				const data = Buffer.concat(buffer, size);
				writeFileSync(__dirname.replace('dist', `static\\${url.split('/').pop()?.split('?').shift()}`), data);
				console.log('写入完成');
			});
		});
		req.end();
	});

	(async () => {
		// const ses = session.fromPartition('persist:main');
		shell.exec('echo %USERPROFILE%');
	})();
};

app.whenReady().then(() => {
	init();
	setTimeout(() => {
		app.quit();
	}, 3000000);
});


const server = createServer((req, res) => {
	res.setHeader('content-type', 'text/html; charset=utf-8');
	res.end('<h2>我操你大爷</h2>');
});

server.listen(3333, () => console.log('服务启动成功'));


