import { app, BrowserWindow, ipcMain, net, screen } from 'electron';
import path from 'path';
import { exec } from 'child_process';
import server from './httpServer';

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

server();

ipcMain.handle('ping', () => ({ a: 1, b: 2, c: 3 }));

const init = async () => {
	const { width, height } = screen.getPrimaryDisplay().size;
	const win = new BrowserWindow({
		width,
		height,
		darkTheme: true,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js')
		}
	});

	win.webContents.toggleDevTools();
	win.loadURL('http://127.0.0.1:5173/');

	(async () => {
		// const ses = session.fromPartition('persist:main');

		const host = 'http://127.0.0.1:3333';

		const setProxy = (host: string) => {
			exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyEnable /t REG_DWORD /d 1 /f');
			exec(`reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyServer /t REG_SZ /d ${host} /f`);
			// exec('netsh winhttp import proxy source=ie');
			// exec(`netsh winhttp set proxy ${host}`);
		};

		const deleteProxy = () => {
			exec('reg delete "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyEnable /f');
			exec('reg delete "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyServer /f');
			exec('netsh winhttp reset proxy');
		};

		const getProxy = () => exec('reg query "HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings"');

		setProxy(host);
	});
};

app.whenReady().then(() => {
	init();
	setTimeout(() => {
		app.quit();
	}, 3000000);
});


function request({ url, method, data }: { url: string, method: string, data: any }) {
	return new Promise((resolve, reject) => {
		const req = net.request({ url, method });
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
				console.log('写入完成');
				resolve(data.toString());
			});
			response.on('error', reject);
		});
		req.write(data);
		req.end();
	});
}
