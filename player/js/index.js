window.onload=function(){
	function $$(ele){
		return document.querySelector(ele);
	}

	var audio = $$('#audio');
	var musicMode = 'list';
	var musicIndex =5;
	var bufferTimer = null;
	var volumeTimer = null;


	$$('.play').onclick=function(){
		toPlay('play');
	};

	$$('.pause').onclick=function(){
		toPlay('pause');
	};

	$$('.prev').onclick=function(){
		toPlay('prev');
	};
	$$('.next').onclick=function(){
		toPlay('next');
	};
	//调整播放时间
	$$('.progress_bar').onclick=function(ev){
		adjustProgress(this,ev);
	};
	//音量调节
	$$('.volume').onmouseover=$$('.volume_wrap').onmouseover=function(){
		clearTimeout(volumeTimer);
		removeClass($$('.volume_wrap'),'hidden');
	};

	$$('.volume').onmouseout=$$('.volume_wrap').onmouseout=function(){
		volumeTimer=setTimeout(function(){
			addClass($$('.volume_wrap'),'hidden');
		},300);
	};

	$$('.volume_bar').onclick=function(ev){
		adjustVolume(this,ev);
	};

	//是否静音
	$$('.volume').onclick=function(){

		if(audio.muted === false){
			this.style.color = '#a1a1a1';
			audio.muted = true;
		}
		else if(audio.muted === true){
			this.style.color = '#e74d3c';
			audio.muted = false;
		}
	};

	//播放模式
	$$('.repeat').onclick=function(){
		changeMusicMode(this,'repeat');
	};

	$$('.shuffle').onclick=function(){
		changeMusicMode(this,'shuffle');
	};

	$$('.list').onclick=function(){
		changeMusicMode(this,'list');
	};

	//初始化播放器
	initPlayer(musicIndex-1);
	audio.volume=0.8;
	audio.addEventListener('canplay',bufferBar,false);

	function initPlayer(index){
		//音乐路径
		audio.setAttribute('src',playList[index].musicURL);
		//歌手名字
		$$('.artist_name').innerHTML = playList[index].artist;
		//头像
		$$('.artist_avatar img').setAttribute('src',playList[index].avatarURL);
		//歌名
		$$('.music_name').innerHTML = playList[index].musicName;
		//专辑
		$$('.music_album').innerHTML = playList[index].musicAlbum;
		//进度条
		$$('.progress').style.width = 0+'px';
		//缓冲进度条
		audio.removeEventListener('canplay',bufferBar,false);
		clearInterval(bufferTimer);
		$$('.buffer').style.width= 0 + 'px';
	}

	//播放
	function toPlay(action){
		if(action === 'play'){
			audio.play();
			removeClass($$('.pause'),'hidden');
			addClass($$('.play'),'hidden');
			
		}
		else if(action === 'pause'){
			audio.pause();
			removeClass($$('.play'),'hidden');
			addClass($$('.pause'),'hidden');
		}
		else if(action === 'prev'){
			playMusicMode(action);
		}
		else if(action === 'next'){
			playMusicMode(action);
		}
	}

	//播放结束后播放下一曲
	audio.addEventListener('ended',function(){
		playMusicMode('ended');
	},false);

	//根据播放模式计算歌曲索引
	function playMusicMode(action){
		var musicNum = playList.length;
		console.log(musicNum);
		var index = musicIndex;
		console.log(index);

		//列表循环
		if(musicMode === 'list'){
			if(action === 'prev'){
				if(index === 1){
					index = musicNum;
				}
				else{
					index -= 1;
				}
			}
			else if(action === 'next' || action === 'ended'){
				if(index === musicNum){
					index = 1;
				}else{
					index += 1;
				}
			}
		}

		//随机播放
		if(musicMode === 'shuffle'){
			var randomIndex = parseInt(Math.random()*musicNum);
			index = randomIndex + 1;
			if(index === musicIndex){//下一首和当前相同,跳到下一首
				index += 1;
			}
		}

		//单曲循环
		if(musicMode === 'repeat'){
			if(action === 'prev'){
				if(index === 1){
					index = musicNum;
				}else{
					index -= 1;
				}
			}else if(action === 'next'){
				if(index === musicNum){
					index = 1;
				}else{
					index += 1;
				}
			}else{

			}
		}
		
		musicIndex = index;
		playIndex(index-1);
	}
	function playIndex(index){

		initPlayer(index);
		audio.load();
		audio.addEventListener('canplay',bufferBar,false);
		toPlay('play');
	}
	//更改播放模式
	function changeMusicMode(dom,mode){
		musicMode = mode;
		var option = $$('#option_list').getElementsByTagName('li');
		for(var i=0;i< option.length;i++){
			option[i].style.color = '#a1a1a1';
		}
		dom.style.color = '#e74d3c';
	}

	//显示剩余时间和播放进度
	audio.addEventListener('timeupdate',function(){
			//console.log(audio.duration);
			if(!isNaN(audio.duration)){
				var surplus = audio.duration-audio.currentTime;
				var surplusMin = parseInt(surplus/60);
				var surplusSecond = parseInt(surplus%60);

				if(surplusSecond<10){
					surplusSecond = '0' +surplusSecond;
				}

				$$('.time').innerHTML = '-' + surplusMin + ':' +surplusSecond;

				var progressValue = audio.currentTime/audio.duration*324;
				$$('.progress').style.width = parseInt(progressValue)+'px';
			}
	},false);

	//显示缓冲进度条
	function bufferBar(){
		bufferTimer = setInterval(function(){
			var bufferIndex = audio.buffered.length;
			if(bufferIndex > 0 && audio.buffered != undefined){
				var bufferValue =audio.buffered.end(bufferIndex-1)/audio.duration*324;
				$$('.buffer').style.width = parseInt(bufferValue) + 'px';

				if(Math.abs(audio.duration - audio.buffered.end(bufferIndex-1))<1){
					$$('.buffer').style.width = 324 + 'px';
					clearInterval(bufferTimer);
				}
			}
		},1000);
	}

	//调整播放进度条
	function adjustProgress(dom,ev){
		var event = window.event || ev;
		var progressX = event.clientX -dom.getBoundingClientRect().left;
		audio.currentTime = parseInt(progressX/324*audio.duration);
		audio.removeEventListener('canplay',bufferBar,false);
	}
	//调整音量条
	function adjustVolume(dom,ev){
		var event = window.event || ev;
		var volumeY = dom.getBoundingClientRect().bottom - event.clientY;
		console.log(volumeY);
		audio.volume = (volumeY/80).toFixed(2);
		$$('.volume_now').style.height = volumeY +'px';
	}

	//对class操作的工具函数
	function hasClass(dom,className){
		var classNum = dom.className.split(" "),
			hasClass;

		for(var i =0; i<classNum.length;i++){
			if(classNum[i] === className){
				hasClass = true;
				break;
			}
			else
			{
				hasClass = false;
			}
		}
		return hasClass;
	}

	function addClass(dom,className){
		if(!hasClass(dom,className)){
			dom.className += " "+className;
		}
	}

	function removeClass(dom,className){
		if(hasClass(dom,className)){
			var classNum = dom.className.split(" ");
			for (var i=0;i<classNum.length;i++){
				if(classNum[i] === className){
					
					classNum.splice(i,1);

					dom.className = classNum.join(" ");
					break;
				}
			}
		}
	}

	function replaceClass(dom,className,replaceClass){
		if(hasClass(dom,className)){
			var classNum = dom.classname.split(" ");
			for(var i=0;i<classNum.length;i++){
				if(classNum[i] === className){
					classNum.splice(i,1,replaceClass);
					dom.className = className.join(" ");
					break;
				}
			}
		}
	}


}