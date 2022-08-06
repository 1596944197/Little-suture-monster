import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('version', {
	node: () => process.versions.node,
	chrome: () => process.versions.chrome,
	electron: () => process.versions.electron,
});
contextBridge.exposeInMainWorld('ping', () => ipcRenderer.invoke('ping'));

window.addEventListener('DOMContentLoaded', () => {
	const replaceText = (selector: string, text) => {
		const element = document.getElementById(selector);
		if (element) {
			element.innerText = text;
			window.foo;
		}
	};

	for (const dependency of ['chrome', 'node', 'electron']) {
		replaceText(`${dependency}-version`, process.versions[dependency]);
	}
});