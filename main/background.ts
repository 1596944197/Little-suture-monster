import { app } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import { AutoUploadForSFTP } from "./module/ftpAutoUpload/ftpAutoUpload";

const isProd: boolean = process.env.NODE_ENV === "production";

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";

// WorkerAsync();

AutoUploadForSFTP("2323", {
  username: "232323",
  password: "232323",
  localDistDir: "D:/code/git-company-code/gdc-aquatic-web",
  remoteDir: "/usr/local/src/apache-tomcat-8.5.23/webapps/aquaticPC",
  buildCommand: "npm run build",
  packagedDirectory: "dist",
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
