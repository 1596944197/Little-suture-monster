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
const fs_1 = require("fs");
electron_1.ipcMain.handle('ping', () => ({ a: 1, b: 2, c: 3 }));
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    const { width, height } = electron_1.screen.getPrimaryDisplay().workAreaSize;
    const win = new electron_1.BrowserWindow({
        width,
        height,
        darkTheme: true,
        webPreferences: {
            preload: path_1.default.join(__dirname, 'preload.js')
        }
    });
    win.webContents.toggleDevTools();
    win.loadFile('../index.html');
    (() => {
        const url = 'http://iwenwiki.com/api/FingerUnion/data.json';
        const req = electron_1.net.request(url);
        req.on('response', response => {
            const buffer = [];
            let size = 0;
            response.on('data', (buf) => {
                buffer.push(buf);
                size += buf.length;
                console.log('正在传输');
            });
            response.on('end', () => {
                var _a;
                const data = Buffer.concat(buffer, size);
                (0, fs_1.writeFileSync)(__dirname.replace('dist', `static\\${(_a = url.split('/').pop()) === null || _a === void 0 ? void 0 : _a.split('?').shift()}`), data);
                console.log('写入完成');
            });
        });
        req.end();
    });
    (() => __awaiter(void 0, void 0, void 0, function* () {
        const ses = electron_1.session.fromPartition('persist:main');
    }))();
});
electron_1.app.whenReady().then(() => {
    init();
    setTimeout(() => {
        electron_1.app.quit();
    }, 3000000);
});
