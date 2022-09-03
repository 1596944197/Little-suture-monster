import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("version", () => process.versions);
contextBridge.exposeInMainWorld("ping", async () => await ipcRenderer.invoke("ping"));
