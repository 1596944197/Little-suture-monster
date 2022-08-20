import { createServer } from 'http';

export default () => {
  const server = createServer((req, res) => {
    res.setHeader('content-type', 'text/html; charset=utf-8');

    res.end('<h2>富强民主文明和谐</h2>');
  });

  server.listen(3333, () => console.log('is ok'));
};

