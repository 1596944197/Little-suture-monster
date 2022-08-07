import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('version', {
	node: () => process.versions.node,
	chrome: () => process.versions.chrome,
	electron: () => process.versions.electron,
});
contextBridge.exposeInMainWorld('ping', () => ipcRenderer.invoke('ping'));


ipcRenderer.on('showPicture', async (_, filePaths: string[]) => {
	filePaths.forEach(handlePath);

	function handlePath(path: string) {
		const img = document.createElement('img');
		img.style.width = '100%',
			img.src = path;
		document.body.append(img);
	}
});

window.onload = () => document.body.style.margin = '0';
