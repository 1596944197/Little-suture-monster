import { createServer } from 'node:http';
import { parentPort } from 'node:worker_threads';
import { parse } from 'node:querystring'
import { createWriteStream } from 'node:fs'

const server = createServer((req, res) => {
  const { url, method } = req

  res.setHeader('Access-Control-Allow-Origin', '*')

  if (method === 'POST' && url.includes('upload')) {
    req.setEncoding('binary');
    let body = '';   // 文件数据
    // 边界字符串
    const boundary = req.headers['content-type'].split('; ')[1].replace('boundary=', '');

    // 接收post如data 流 buffer
    req.on('data', function (d) {
      body += d;
    });

    req.on('end', function () {
      const file = parse(body, '\r\n', ':');
      const fileInfo = file['Content-Disposition'].split('; ');
      let fileName = '';
      let ext = '';
      for (const value in fileInfo) {
        if (fileInfo[value].indexOf("filename=") !== -1) {
          fileName = fileInfo[value].substring(10, fileInfo[value].length - 1);

          if (fileName.indexOf('\\') !== -1) {
            fileName = fileName.substring(fileName.lastIndexOf('\\') + 1);
          }
          ext = fileName.substring(fileName.indexOf('.') + 1, fileName.length);
        }
      }

      const upperBoundary = body.toString().indexOf(file['Content-Type'].substring(1)) + file['Content-Type'].substring(1).length;

      const binaryDataAlmost = body.toString().substring(upperBoundary).replace(/^\s\s*/, '').replace(/\s\s*$/, '');

      // 上传文件重命名
      const uuidFileName = `${uuid()}.${ext}`
      // 上传文件 本地存放地址
      const uploadDirFile = `./renderer/public/upload/${uuidFileName}`

      // 创建文件流
      const writerStream = createWriteStream(uploadDirFile);

      // 开始 —— 写入文件到本地
      writerStream.write(binaryDataAlmost.substring(0, binaryDataAlmost.indexOf(`--${boundary}--`)), 'binary');
      // 写入完成
      writerStream.end();
      writerStream.on('finish', function () {
        console.log("write is end。");
        res.end(JSON.stringify({
          path: '/upload/' + uuidFileName,
          code: 200,
        }))
      });
    });
  }

  // eslint-disable-next-line no-unused-vars
  function uuid() {
    const s = [];
    const hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substring(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substring((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    // # 取字符长度
    const uuid = s.join("").slice(0, 20);
    return uuid;
  }
});

server.listen(3000, () => console.log("~upload-server is working"));

parentPort.on('message', (...args) => {
  console.log('child accept', args)
})

parentPort.postMessage('send to main')
