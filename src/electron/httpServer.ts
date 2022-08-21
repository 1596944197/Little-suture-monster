import Koa from 'koa';
import jwt from 'jsonwebtoken';

const token = jwt.sign({ foo: 'foo' }, 'shhh');
export default () => {
  const app = new Koa();

  app.use(async ctx => {
    ctx.cookies.set('token', token, { overwrite: true });
    ctx.body = '<h2>hello world</h2>';
  });

  app.listen(3000, () => console.log('is ok'));
};
