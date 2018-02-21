const koa = require('koa');
const app = new koa();
const Router = require('koa-router');
const serve = require('koa-static');
const {join} = require('path')

const formidable = require('../middleware/koa-formidable');
const router = new Router();

router.post('/upload', formidable({
  uploadDir: join(__dirname, 'uploadFiles')
}), (ctx, next) => {
  console.log(ctx.request.files);
  console.log(ctx.request.body);
  ctx.body = '上传成功'
});

app.use(serve(`${__dirname}/public`));

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
