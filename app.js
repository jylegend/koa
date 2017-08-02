const Koa=require('koa'); //导入koa

const app=new Koa();

const bodyParse=require('koa-bodyparser');//body 解析

const controller=require('./controllers/controller');

app.use(bodyParse());

app.use(controller());

app.listen(3000);

console.log("开始监听端口3000:");

