var data = ['董聪慧','陈晨','史容舟','汤丽荣','俞璐璐','张海红','张红梅','陈季辉','陈林','陈泽','顾光通','胡礼男','胡扬帆','惠恒杉','蒋志一','李俊','刘明亮','梅旭璋','尚钰琨','孙杰','王平','王万鹏','徐冬','薛冒杰','张剑虹','张俊港','赵斌','赵宵','钟继伟','朱贵荣','朱俊'],
    timer = null,
    flag = 0;

window.onload=function(){

		$$('pic1').onclick=playFun;
		$$('pic2').onclick=stopFun;
}

function $$(id){
	return document.getElementById(id);
}

function playFun(){
	var show = $$('show');
	clearInterval(timer);
	timer=setInterval(function(){
		var name = data[Math.floor(Math.random()*data.length)];
		show.innerHTML = name;
	},20);
	
}

function stopFun(){
	if(data.length-1 === 0){
		//$$('show').innerHTML='测试结束';
	}
	else{
		clearInterval(timer);
		//console.log($$('show').innerHTML+"  "+data.length);
		data.splice(data.indexOf($$('show').innerHTML),1);
	}
}	