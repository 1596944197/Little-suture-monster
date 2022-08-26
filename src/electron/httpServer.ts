import exp from 'express';
import jwt from 'jsonwebtoken';

type RequestUrl = '/favicon.ico' | '/' | '/register'

const app = exp();
let i = 0;
export default () => {
  app.get('/', (req, res) => {
    res.send('<h2>我操</h2>');
  });

  app.get('/register', (req, res) => {
    res.cookie('token', jwt.sign({ user: i }, `${i++}`, { expiresIn: 3600 * 100 }));
    res.end();
  });

  app.listen(3000, () => console.log('is ok'));
};
