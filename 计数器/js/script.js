var milisec = 0;
	var seconds = 0;
	var mins=0;
	var hours=0;
	var sec_display;
	var mins_display;
	var hours_display;
	var timer;
	var timer_ticking = false;

	var captions = {start:"start timer",stop:"stop timer"};
	var classes = {start:"start round",stop:"stop round"};

	function timer_callback(){
		if(milisec>=9){
			milisec = 0;
			seconds += 1;
		}
		else{
			milisec += 1;
		}
		if(seconds>=60){
			seconds=0;
			mins += 1;
		}
		if(mins>=60){
			mins=0;
			hours += 1;
			if(hours === 1){
				$('#glass').addClass("font-medium").removeClass("font-big");
			}
		}
		displaytime();
		timer = setTimeout(timer_callback,100);
	}

	function displaytime(){
		if(seconds<10)
		{
			sec_display ="0" +seconds;
		}
		else{
			sec_display=seconds;
		}
		if(mins<10){
			mins_display = "0" +mins;
		}
		else{
			mins_display=mins;
		}
		if(hours<10){
			if(hours>0){
				hours_display = "0" + hours+":";
			}
			else{
				hours_display="";
			}
		}else{
			hours_display=hours+":";
		}
		$('#glass strong').html(hours_display+mins_display+":"+sec_display+"."+milisec);
	}

	function start(){
		timer_ticking=true;
		timer_callback();
		$('.start').html(captions.stop).attr("class",classes.stop);
	}
	function stop(){
		timer_ticking=false;
		clearTimeout(timer);
		$('.stop').html(captions.start).attr('class',classes.start);
	}

	function reset(){
		stop();
		milisec =seconds=mins=hours=0;
		displaytime();
	}

	$(document).ready(function(){
		$('#glass').click(function(){
			if(timer_ticking === true){
				stop();
			}else{
				start();
			}
		});
		$('.start').on('click',start);
		$('.stop').on('click',stop);
		$('.reset').click(reset);
	});

