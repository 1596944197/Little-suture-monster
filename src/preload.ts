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
		}
	};

	for (const dependency of ['chrome', 'node', 'electron']) {
		replaceText(`${dependency}-version`, process.versions[dependency]);
	}
});

ipcRenderer.on('SET_SOURCE', async (event, sourceId) => {
	try {
		const stream = await navigator.mediaDevices.getUserMedia({
			audio: false,
			video: true
		})
		handleStream(stream)
	} catch (e) {
		console.warn(e)
	}

	function handleStream(stream: MediaStream) {
		const video: HTMLVideoElement = document.querySelector('video')!
		video.srcObject = stream
		video.onloadedmetadata = (e) => video.play()
	}
})
ipcRenderer.on('showImages', async (_, filePaths: string[]) => {
	filePaths.forEach(handlePath)

	function handlePath(path: string) {
		const img = document.createElement('img')
		img.style.display = 'block'
		img.src = path
		document.body.append(img)
	}
})
ipcRenderer.on('MainProcess', async (_, main) => {
	console.log('ccc', main)
})
