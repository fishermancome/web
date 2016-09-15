function $$(id){
	return document.getElementById(id);
}

function JSON_CALLBACK(data) {
		$$('city').innerHTML = data.city+','+data.country;
}


function getLocation(){
	var js = document.createElement('script');
		head = document.getElementsByTagName('head')[0];
	js.src='http://ipinfo.io/json?callback=JSON_CALLBACK';
	head.appendChild(js);
}

function getTemp() {
	
	
    var js1 = document.createElement('script'),
        head = document.getElementsByTagName('head')[0];

    var api='http://api.openweathermap.org/data/2.5/weather?q=',
    	city = 'Nanjing,CN',
    	appid = '&APPID=7e5c874948bed4a493d83b2ee60112f7',
    	cb='&callback=JSON_CALLBACK1';
    	
    var url = api+city+appid+cb;
    js1.src=url;
    head.appendChild(js1);
}
function JSON_CALLBACK1(data) {
		console.log(data);
		$$('TT').innerHTML = Math.round(KtoC(Number(data['main'].temp)))+' \'C';
		$$('icon').innerHTML = data['weather']['0'].description;
}

getLocation();
getTemp();


function KtoC(kk){
	return kk-273.15;
}

