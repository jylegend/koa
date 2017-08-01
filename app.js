const Koa=require('koa'); //导入koa

const app=new Koa();

// 对于任何请求，app将调用该异步函数处理请求：
app.use(async(context,next)=>{
    await next();
    context.response.type="text/html";
    context.response.body="<h1>Hello Koa </h1>";
});

app.listen(3000);
console.log("开始监听端口3000:");

