import express from 'express';
import exp from 'express';
import jwt from 'jsonwebtoken';

// type RequestUrl = '/favicon.ico' | '/' | '/register'

const app = exp();
let i = 0;
// app.use('/static', express.static('/public'));
export default () => {
  app.get('/', (req, res) => {
    res.statusCode = 302;
    res.setHeader('location', "http://127.0.0.1:5173/");
  });

  app.get('/register', (req, res) => {
    res.cookie('token', jwt.sign({ user: i }, `${i++}`, { expiresIn: 3600 * 100 }));
    res.end();
  });
  console.log(123);
};
app.listen(3001, () => console.log('is ok'));

