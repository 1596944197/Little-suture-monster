import express, { json } from 'express';
import exp from 'express';
import jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';

// type RequestUrl = '/favicon.ico' | '/' | '/register'

const app = exp();
let i = 0;
app.use('/static', express.static('public', {
  cacheControl: true,
  maxAge: 3600 * 1000
}));

const userInfo = JSON.parse(readFileSync('public/data.json', 'utf-8'));

export default () => {
  app.get('/', (req, res) => {
    res.end();
  });

  app.get('/register', (req, res) => {
    const { account, password } = req.body;
    res.cookie('token', jwt.sign({ user: i }, `${i++}`, { expiresIn: 3600 * 1000 }));
    res.end();
  });
};
app.listen(3000, () => console.log('is ok'));

