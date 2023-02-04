import { app } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import { AutoUploadForSFTP } from "./module/ftpAutoUpload/ftpAutoUpload";
import { WorkerAsync } from "./module/workServer/worker";

const isProd: boolean = process.env.NODE_ENV === "production";

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";

WorkerAsync();

AutoUploadForSFTP("232323", {
  username: "2422424",
  password: "2424242424",
  localDistDir: "D:/code/git-company-code/gdc-aquatic-web",
  remoteDir: "/usr/local/src/apache-tomcat-8.5.23/webapps/aquaticPC",
  distRename: "aquaticPC",
  buildCommand: "npm run build",
});

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main");

  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});
