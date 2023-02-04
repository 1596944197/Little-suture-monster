import { SFTPOptions } from "./types";
import Client from "ssh2-sftp-client";

/**
 * ### 自动更新sftp服务器内容
 * @date 2023/2/1 - 17:13:36
 *
 * @async
 * @template T extends string
 * @param {AutoUploadForSFTPType<T>} url
 * @param {string[]} args
 * @returns {*}
 */
async function AutoUploadForSFTP(url: string, options: SFTPOptions) {
  if (typeof url === "string") {
    console.log("...starting exec command");
    const sftp = new Client();
    await sftp.connect({
      host: url,
      password: options.password,
      username: options.username,
    });
    sftp.on("upload", (info) => {
      console.log(`Listener: Uploaded ${info.source}`);
    });

    const result = await sftp.uploadDir(options.localDir, options.remoteDir);
    console.log(result);
  }
}

export { AutoUploadForSFTP };
