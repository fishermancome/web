window.onload=function(){
	var exp='';
	var ans=0;
	buttons=document.getElementById('buttons');
	display=document.getElementById('display');
	buttons.addEventListener('click',function(e){
		var buttonType= e.target.innerText;
		switch(buttonType){
			case "AC":
			exp="";
			display.innerText =exp;
			break;
			case "CE":
			exp=exp.slice(0,-1);
			display.innerText = exp;
			break;

			case "=":
			try{
				ans=eval(exp.toLowerCase());
				display.innerText=ans;
				exp = "";
			}
			catch(err){
				display.innerText="error";
			}
			break;
			default:
			exp += buttonType;
			display.innerText = exp;
		}
	});
}