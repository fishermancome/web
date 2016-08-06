window.onload=function(){
	waterfall('main','box');
	var dataInt={'data':[{'src':'24.jpg'},{'src':'25.jpg'},{'src':'26.jpg'},{'src':'27.jpg'}]}
	window.onscroll=function(){
		if(checkScrollSlide()){
			var oParent=document.getElementById('main');
			for(var i=0;i<dataInt.data.length;i++){
				var oBox=document.createElement('div');
				oBox.className='box';
				oParent.appendChild(oBox);
				var oPic=document.createElement('div');
				oPic.className='pic';
				oBox.appendChild(oPic);
				var img=document.createElement('img');
				img.src="images/"+dataInt.data[i].src;
				oPic.appendChild(img);
			}
			waterfall('main','box');
		}
	}
}

function waterfall(parent,box){
	var oParent=document.getElementById(parent);
	var oBox = getByClass(oParent,box);
	var oBoxW=oBox[0].offsetWidth;
	var cols = Math.floor(document.documentElement.clientWidth/oBoxW);
	oParent.style.cssText='width:'+oBoxW*cols+"px;margin:0 auto;";

	hArr=[];
	for (var i=0;i<oBox.length;i++)
	{
		if(i<cols)
		{
			hArr.push(oBox[i].offsetHeight);
		}
		else{
			minH=Math.min.apply(null,hArr);
			index=MinIndex(hArr,minH);
			oBox[i].style.position='absolute';
			oBox[i].style.top=minH+'px';
			oBox[i].style.left=oBoxW*index+'px';
			hArr[index]+=oBox[i].offsetHeight;

		}
	}
	console.log(hArr);
}

function getByClass(parent,clsName){
	var elements=parent.getElementsByTagName('*');
	var eles=[];
	for(var i=0;i<elements.length;i++)
	{
		if(elements[i].className==clsName)
		{
			eles.push(elements[i]);
		}
	}
	return eles;
}

function MinIndex(arr,val){
	for(var i in arr){
		if(arr[i]==val)
		{
			return i;
		}
	}
}

function checkScrollSlide(){
	var oParent=document.getElementById('main');
	var oBox=getByClass(oParent,'box');
	var lastBoxH=oBox[oBox.length-1].offsetTop+Math.floor(oBox[oBox.length-1].offsetHeight/2);
	var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
	var height = document.documentElement.clientHeight||document.body.clientHeight;
	return (lastBoxH<scrollTop+height)?true:false;
}