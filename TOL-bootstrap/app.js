const isProduction = process.env.NODE_ENV === 'production';
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const templating = require('./templating');
const controller = require('./controller');

//记录URL以及页面执行时间
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}`);
  var
     start = new Date().getTime(),
     execTime;
  await next();
  execTime = new Date().getTime() - start;
  ctx.response.set('X-Response-Time',`${execTime}ms`);
});

//处理静态文件
if(! isProduction) {
  let staticFiles = require('./static-files');
  app.use(staticFiles('/static/',__dirname + '/static'));
}

//解析POST请求
app.use(bodyParser());

//使用Nunjucks
app.use(templating("views", {
  noCache: !isProduction,
  watch: !isProduction
}));



//使用middleware
app.use(controller());


app.listen(233);
