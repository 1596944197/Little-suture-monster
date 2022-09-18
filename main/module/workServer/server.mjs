import { createServer } from 'node:http';
import { parentPort } from 'node:worker_threads';

const server = createServer((req, res) => {
  res.setHeader('content-type', "text/html")
  res.end('<h2>test worker thread</h2>');
});

server.listen(3000, () => console.log("~upload-server is working"));

parentPort.on('message', (...args) => {
  console.log('子线程接收', args)
})

parentPort.postMessage('已加载')
