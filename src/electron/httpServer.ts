import Koa from 'koa';
import jwt from 'jsonwebtoken';
import { createReadStream } from 'original-fs';


type RequestUrl = '/favicon.ico' | '/' | '/register'

export default () => {
  const app = new Koa();
  app.proxy = true;

  let id = 0;
  app.use(async (ctx, next) => {
    const { originalUrl, cookies } = ctx;

    switch (originalUrl as RequestUrl) {
      case '/':
        ctx.status = 302;
        ctx.set({
          location: 'http://127.0.0.1:5173/'
        });
        return;
      case '/favicon.ico':
        ctx.body = '';
        return null;
      case '/register':
        const token = jwt.sign({ user: id++ }, `${id}`, { expiresIn: 3600 * 1000 });
        cookies.set('token', token, { expires: new Date(Date.now() + 3600 * 1000) });
        ctx.body = true;
        return;
      default:
        next();
    }
  });

  app.use(async (ctx, next) => {
    const { originalUrl } = ctx;
    if (originalUrl.includes('public')) {
      const arg = /^\/public\/(.*)/g.exec(originalUrl)?.slice(1)[0];
      if (arg) {
        const stream = createReadStream(`./static/${arg}`, 'utf-8');
        ctx.body = stream;
      }
      else ctx.status = 400;
    }
    await next();
  });

  app.listen(3000, () => console.log('is ok'));
};
