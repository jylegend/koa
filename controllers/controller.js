const fs=require('fs'); //引入fs文件操作模块

function addMapping(router,mapping){
	for(var url in mapping){
		if(url.startWith('GET')){
			var path=url.substring(4);
			router.get(path,mapping[url]);
			console.log(`register URL mapping : GET  ${path}`);
		}
		else if(url.startWith('POST')){
			var path=url.substring(5);
			router.post(path,mapping[url]);
			console.log(`register URL mapping : POST  ${path}`);
		}
		else{
			console.log(`Invalid URL :${url}`);
		}
	}
}
function addControllers(router){
	var files=fs.readdirSync(__dirname);
	//过滤js文件
	var js_files=files.filter((f)=>{
		return f.endsWith('.js');
	});
	for (var f of js_files) {
        console.log(`process controller: ${f}...`);
        let mapping = require(__dirname +'/'+ f);
        addMapping(router, mapping);
    }
}

module.exports=function(dir){
	let 
		controller_dir=dir || 'controllers',
		router=require('koa-router')();
	addControllers(router);
	return router.routes();
};

String.prototype.startWith=function(str){     
  var reg=new RegExp("^"+str);     
  return reg.test(this);        
}  

String.prototype.endWith=function(str){     
  var reg=new RegExp(str+"$");     
  return reg.test(this);        
}

