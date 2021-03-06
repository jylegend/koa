const Koa=require('koa'); //导入koa

const app=new Koa();

const bodyParse=require('koa-bodyparser');//body 解析

const controller=require('./controllers/controller');

const router=require('koa-router')();

const Sequelize=require('sequelize');

const config=require('./config.js');

var sequelize=new Sequelize(config.database,config.username,config.password,{
	host:config.host,
	dialect:'mysql',
	pool:{
		max:5,
		min:0,
		idle:30000
	}
});
var Pet=sequelize.define('pet',{
	id:{
		type:Sequelize.STRING(50),
		primaryKey:true
	},
	name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT
},{timestamps:false});

var now=Date.now();
// Pet.create({
// 	id:'g-'+now,
// 	name:'Jiangyuan',
// 	gender:false,
// 	birth:new Date().toLocaleTimeString(),
// 	createdAt: now,
//     updatedAt: now,
//     version: 0
// }).then(function(p){
// 	console.log("Success:"+JSON.stringify(p));
// }).catch(function(err){
// 	console.log('Failed:'+err);
// });

(async ()=>{
	var _n = await Pet.create({
		id: 'g-' + now,
		name: 'Jiangyuan',
		gender: false,
		birth: new Date().toLocaleTimeString(),
		createdAt: now,
		updatedAt: now,
		version: 0
	});
	console.log("Success:"+JSON.stringify(p));
})();
/*调用app.use()的顺序决定了middleware的顺序*/
/*如果一个middleware没有调用await next(),后续的middleware将不再执行了*/
/*middleware*/
app.use(async (context,next)=>{
	console.log(`${context.request.method} ${context.request.url}`);//打印url
	await next();
});

app.use(async (context,next)=>{
	const start=new Date().getTime();
	await next();
	const ms=new Date().getTime()-start;
	console.log(`Time : ${ms}ms`);
});

//router url get
router.get('/',async (context,next)=>{
    context.response.type="text/html";
    context.response.body=`<h1>Hello Koa1 </h1>
    	<form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
});

//router url get
router.get('/:name',async(context,next)=>{
	var name=context.params.name;
	context.response.body=`<h1>Hello , ${name} !</h1>`;
});

//bind koa-bodyparser middleware
app.use(bodyParse());
/*nodejs无法解析post请求表单数据，引用middleware koa-bodyparser*/
router.post('/signin',async (context,next)=>{
	var name=context.request.body.name || '',
	password = context.request.body.password ||'';

	if(name==='admin' && password==='123456'){
		context.response.body=`<h1>Welcome,${name}</h1>`;
	}
	else
	{
		context.response.body=`<h1>login failed</h1><p><a href='/'>Try Again</a></p>`;
	}
});
//bind router middleware
app.use(router.routes());

// 对于任何请求，app将调用该异步函数处理请求：
//middleware
//最后注意ctx对象有一些简写的方法，
//例如context.url相当于context.request.url，context.type相当于context.response.type。
// app.use(async(context,next)=>{
//     await next();
//     context.response.type="text/html";
//     context.response.body="<h1>Hello Koa1 </h1>";
// });

app.listen(3000);

console.log("开始监听端口3000:");

