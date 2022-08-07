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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
electron_1.ipcMain.handle('ping', () => ({ a: 1, b: 2, c: 3 }));
const createWindow = () => __awaiter(void 0, void 0, void 0, function* () {
    const win = new electron_1.BrowserWindow({
        width: 1080,
        height: 700,
        darkTheme: true,
        webPreferences: {
            preload: path_1.default.join(__dirname, 'preload.js')
        }
    });
    const data = yield electron_1.dialog.showOpenDialog({
        properties: ['openFile', 'multiSelections'],
        filters: [
            {
                name: 'Images', extensions: ['jpg', 'png', 'gif']
            }
        ]
    });
    win.webContents.send('showImages', data.filePaths);
    win.webContents.send('MainProcess', win);
    win.webContents.toggleDevTools();
    win.loadFile('../index.html');
});
electron_1.app.whenReady().then(() => {
    createWindow();
    setTimeout(() => {
        electron_1.app.quit();
    }, 3000000);
});
