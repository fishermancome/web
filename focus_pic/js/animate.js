window.onload=function(){
	var container = document.getElementById('container');
	var list = document.getElementById('list');
	var buttons = document.getElementById('buttons').getElementsByTagName('span');
	var prev = document.getElementById('prev');
	var next = document.getElementById('next');
	var index = 1;
	var isanimate = false;
	

	function showButton(){
		for (var i=0 ;i<buttons.length;i++){
			if(buttons[i].className == "on"){
				buttons[i].className = '';
				break;
			}
		}
		buttons[index-1].className= "on";
	}

	function animated(offset){
		isanimate = true;
		var newLeft = parseInt(list.style.left) + offset;
		var time = 300;
		var interval = 10;
		var speed = offset/(time/interval);

		function go(){
			if((speed<0 && parseInt(list.style.left)>newLeft) || (speed >0 && parseInt(list.style.left)<newLeft)){
				list.style.left = parseInt(list.style.left) + speed +'px';
				setTimeout(go,interval);
			}else{
				
				list.style.left = newLeft +'px';

				if(newLeft>0){
					list.style.left = -2400 +'px';
				}
				if(newLeft<-2400){
					list.style.left= 0 +'px';
				}
				isanimate=false;
			}
		}
		go();
		
	}

	function play(){
		timer = setTimeout(function(){
			next.onclick();
			play()
		},3000);
	}
	function stop(){
		clearInterval(timer);
	}

	next.onclick=function(){
		if(index == 5){
			index = 1;
		}
		else{
			index += 1;
		}
		showButton();
		if(isanimate == false)
		{animated(-600);}
	}

	prev.onclick=function(){
		if(index == 1){
			index =5;
		}
		else{
			index -= 1;
		}
		showButton();
		if(isanimate == false)
			{
				animated(600);
			}
	}

	for(var i=0; i<buttons.length;i++){
		buttons[i].onclick=function(){
			if(this.className=="on"){
				return ;
			}
			var myIndex = parseInt(this.getAttribute('index'));
			var offset = -600*(myIndex-index);

			index = myIndex;
			animated(offset);
			showButton();

		}
	}
	container.onmouseover = stop;
	container.onmouseout  = play;
	play();
}