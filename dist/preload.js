"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('version', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
});
electron_1.contextBridge.exposeInMainWorld('ping', () => electron_1.ipcRenderer.invoke('ping'));
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector);
        if (element) {
            element.innerText = text;
        }
    };
    for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.versions[dependency]);
    }
});
electron_1.ipcRenderer.on('SET_SOURCE', (event, sourceId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stream = yield navigator.mediaDevices.getUserMedia({
            audio: false,
            video: true
        });
        handleStream(stream);
    }
    catch (e) {
        console.warn(e);
    }
    function handleStream(stream) {
        const video = document.querySelector('video');
        video.srcObject = stream;
        video.onloadedmetadata = (e) => video.play();
    }
}));
electron_1.ipcRenderer.on('showImages', (_, filePaths) => __awaiter(void 0, void 0, void 0, function* () {
    filePaths.forEach(handlePath);
    function handlePath(path) {
        const img = document.createElement('img');
        img.style.display = 'block';
        img.src = path;
        document.body.append(img);
    }
}));
electron_1.ipcRenderer.on('MainProcess', (_, main) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('ccc', main);
}));
