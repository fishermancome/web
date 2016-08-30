$(document).ready(function(){
 $('.search').click(function(){
 
 var search = encodeURIComponent($('#inputsth').val());
 var url = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch="+search+"&format=json";
 $.ajax({
 	type:"GET",
 	dataType:"jsonp",
 	url:url,
 	success:function(data){
 		console.log(data);;
 		var pagename = encodeURIComponent(data.query.search[1].title);
 		$('.screen').html(`<iframe src='https://en.wikipedia.org/w/index.php?title=Special:Search&search=${pagename}&fulltext=Search'></iframe>`);
 	}
 });

  });

 $('.random').click(function(){
 	$('.screen').html("<iframe src='https://en.wikipedia.org/wiki/Special:Random'></iframe>");
 });
});