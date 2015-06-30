$(document).on("click",function(e){
	var source=$(e.target);
	if(!(source.is(".menu-img")) && !(source.is(".profile")) && !(source.is(".back"))){
		if($(".links").is(":visible") && window.innerWidth<=767){
			$(".links").slideUp('slow');
		}
	}
	var source=$(e.target);
	if(!(source.is(".profile")) && !(source.is(".back"))){
		if($(".change-password").is(":visible")){
			$(".change-password").slideUp('slow');
		}
	}
});

