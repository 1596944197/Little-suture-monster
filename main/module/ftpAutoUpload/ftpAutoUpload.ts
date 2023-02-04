import { SFTPOptions } from "./types";
import Client from "ssh2-sftp-client";
import { exec } from "node:child_process";

/**
 * ### auto upload
 * @date 2023/2/4 - 16:05:43
 *
 * @async
 * @param {string} url
 * @param {SFTPOptions} options
 * @returns {*}
 */
async function AutoUploadForSFTP(url: string, options: SFTPOptions) {
  if (typeof url === "string") {
    console.log("...starting execute command");

    const distDir = options.localDistDir;
    const rename = options.distRename;

    const cmd = `cd ${distDir} && ${distDir.slice(0, 2)} && ${
      options.buildCommand || "npm run build"
    } ${rename ? `&& ren dist ${rename}` : ""} `;

    const ChildProcess = await exec(cmd);
    ChildProcess.on("error", (err) => {
      console.log("err", err);
      throw new Error();
    });

    const sftp = new Client();
    await sftp.connect({
      host: url,
      password: options.password,
      username: options.username,
    });
    sftp.on("upload", (info) => {
      console.log(`Listener: Uploaded ${info.source}\n`);
    });

    const result = await sftp.uploadDir(
      `${distDir}/${rename}`,
      options.remoteDir
    );
    console.log(result);
    sftp.end();
  }
}

export { AutoUploadForSFTP };
