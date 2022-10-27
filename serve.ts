import express from 'express';
import { appendFileSync, readFileSync, watch, writeFileSync } from 'fs';
import { exec } from 'node:child_process';
import { WebSocket, WebSocketServer } from 'ws';

// TIP 为了方便理解，全部使用同步函数

// # 全局变量
const template = process.argv[2] || 'index.html'
const cacheTempPath = '_' + template
const dynamicResourceList = new Proxy<string[]>([], {
  set(target, p, value, receiver) {
    if (typeof value === 'string') watchFile(value)
    return Reflect.set(target, p, value, receiver)
  }
})
const UPDATE = 'update'
const CLEAR = 'clear'
const wsServers: Map<WebSocket, WebSocket> = new Map()
let i = 0

const clearTemp = () => writeFileSync(cacheTempPath, '')

const matchMimeType = (filename: string) => {
  const index = filename.match(/\./)?.index

  const MIME: AnyObject = {
    js: 'application/javascript',
    json: 'application/json'
  }

  return typeof index === 'number' ? MIME[filename.slice(index + 1)] : 'application/*'
}

// * 将main.js文件内容提取出来,如果需要，可以拷贝内容到根目录的main.js
const main = `
    const clientWS = new WebSocket('ws://localhost:8000')

    const UPDATE = 'update'
    const CLEAR = 'clear'

    function onOpen() {}

    function onMessage({ data }) {
      if (data === UPDATE) location.reload()
    }

    function onError() {console.error('socket连接失败')}

    clientWS.onopen = onOpen
    clientWS.onmessage = onMessage
    clientWS.onerror = onError
    
    window.onbeforeunload = () => clientWS.send(CLEAR)
`
// # 全局变量结束


// # socket部分
const wss = new WebSocketServer({ port: 8000 });
wss.on('connection', assignment);
wss.on('listening', () => console.log('websocket正在监听'))
wss.on('error', console.warn)

function assignment(ws: WebSocket & { id: number }) {
  console.log('用户连接')
  ws.id = i++
  wsServers.set(ws, ws)
  ws.onmessage = ({ data }) => data === CLEAR ? clearTemp() : null
  ws.onclose = () => (
    wsServers.delete(ws),
    console.log(`id：${ws.id},用户退出`),
    dynamicResourceList.length = 0,
    clearTemp()
  )
}
// # socket部分结束


// # http部分
enum UrlList {
  ICON = '/favicon.ico',
  HOME = '/',
}

const htpServer = express()

htpServer.use(express.static('./src'))

htpServer.get(UrlList.HOME, (req, res) => {
  const temp = readFileSync(template, 'utf-8')
  appendFileSync(cacheTempPath, `
  ${temp.toString()}
  \n<script type="module">
  ${main}
  </script>`)
  return res.end(readFileSync(cacheTempPath))
})

htpServer.get(UrlList.ICON, (req, res) => {
  // # 懒得放图标，拿别人网站的吧
  res.statusCode = 302
  res.setHeader('Location', 'https://developer.mozilla.org/favicon-192x192.png')
  return res.end()
})

htpServer.get('*', (req, res, next) => {
  const url: string = req.url
  if (url in UrlList) return next()

  try {
    const path = '.' + url
    if (dynamicResourceList.find(item => item === path)) {
      return res.end()
    } else {
      dynamicResourceList.push(path)
      const file = readFileSync(path, 'utf-8')

      res.setHeader('Content-Type', matchMimeType(url))
      return res.end(file)
    }
  } catch (error) {
    console.error(error);
    return res.end()
  }
})

htpServer.listen(3000, () => {
  console.log('htp服务开启')
  exec('start http://localhost:3000')
})
// # http部分结束


// # 文件监听部分
let timer: NodeJS.Timeout | null = null
function watchFile(target: string) {
  watch(target, (type) => {
    if (type === 'rename') return new Error('文件缺失')
    if (timer) return
    timer = setTimeout(() => {
      wsServers.forEach(item => item.send(UPDATE))
      timer = null
    });
  })
}
watchFile(template)
// # 文件监听部分结束





// # 原生htp服务
// const htpServer = createServer((req, res) => {
//   const url = req.url as UrlList

//   switch (url) {
//     case UrlList.HOME:
//       const temp = readFileSync(template, 'utf-8')
//       appendFileSync(cacheTempPath, `
//       ${temp.toString()}
//       \n<script type="module">
//       ${main}
//       </script>`)
//       return res.end(readFileSync(cacheTempPath))
//     case UrlList.ICON:
//       // # 懒得放图标，拿别人网站的吧
//       res.statusCode = 302
//       res.setHeader('Location', 'https://developer.mozilla.org/favicon-192x192.png')
//       return res.end()
//     default:
//       try {
//         const path = '.' + url
//         if (dynamicResourceList.find(item => item === path)) {
//           return res.end()
//         } else {
//           dynamicResourceList.push(path)
//           const file = readFileSync(path, 'utf-8')
//           return res.end(file)
//         }
//       } catch (error) {
//         console.error(error);
//         return res.end()
//       }
//   }
// })