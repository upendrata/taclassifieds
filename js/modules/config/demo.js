$(document).on("click",function(e){
	var source=$(e.target);
	if(!(source.is(".menu-img"))){
		if($(".links").is(":visible") && window.innerWidth<=767){
			$(".links").slideUp('slow');
		}
	}
});

$(window).resize(function(){
	
});
