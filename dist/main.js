"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const createWindow = () => {
    const win = new electron_1.BrowserWindow({
        width: 1080,
        height: 700,
        darkTheme: true,
        webPreferences: {
            preload: path_1.default.join(__dirname, 'preload.js')
        }
    });
    electron_1.ipcMain.handle('ping', () => ({ a: 1, b: 2, c: 3 }));
    win.loadFile('../index.html');
};
electron_1.app.whenReady().then(() => {
    createWindow();
    setTimeout(() => {
        electron_1.app.quit();
    }, 300000);
});
