import Koa from 'koa';

export default () => {
  const app = new Koa();

  app.use(async ctx => {
    ctx.body = '<h2>hello world</h2>';
  });

  app.listen(3000, () => console.log('is ok'));
};
