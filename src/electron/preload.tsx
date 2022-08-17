import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('version', () => process.versions);
contextBridge.exposeInMainWorld('ping', () => ipcRenderer.invoke('ping'));