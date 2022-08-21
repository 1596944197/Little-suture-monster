import Koa from 'koa';
import jwt from 'jsonwebtoken';


type RequestUrl = '/favicon.ico' | '/' | '/register'

export default () => {
  const app = new Koa();
  app.proxy = true;

  let id = 0;
  app.use(async (ctx, next) => {
    const { originalUrl, cookies, header } = ctx;

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
        const token = jwt.sign({ user: id++ }, `${id}`, { expiresIn: 3600 });
        cookies.set('token', token, { expires: new Date(Date.now() + 3600 * 1000) });
        ctx.body = true;
        return;
      default:
        next();
    }
  });

  app.listen(3000, () => console.log('is ok'));
};
