var fn_index=async (ctx,next) =>{
	ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
};

var fn_signin=async (context,next)=>{
	var name=context.request.body.name || '',
	password = context.request.body.password ||'';

	if(name==='admin' && password==='123456'){
		context.response.body=`<h1>Welcome,${name}</h1>`;
	}
	else
	{
		context.response.body=`<h1>login failed</h1><p><a href='/'>Try Again</a></p>`;
	}
};

//公共接口
module.exports={
	'GET /':fn_index,
	'POST /signin':fn_signin
};