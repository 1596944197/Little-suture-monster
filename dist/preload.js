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
electron_1.ipcRenderer.on('showPicture', (_, filePaths) => __awaiter(void 0, void 0, void 0, function* () {
    filePaths.forEach(handlePath);
    function handlePath(path) {
        const img = document.createElement('img');
        img.style.width = '100%',
            img.src = path;
        document.body.append(img);
    }
}));
