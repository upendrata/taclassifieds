$(document).on("click",function(e){
	var source=$(e.target);
	if(!(source.is("#menu-icon"))){
		if($(".links").hasClass("slide-menu")){
			$('.links').removeClass("slide-menu");
			if(window.innerWidth<=767){
				$(".links").addClass("hide");
			}
		}
	}
});
$(window).resize(function(){
	$('.links').removeClass("slide-menu");
	if(window.innerWidth<=767){
		$(".links").addClass("hide");
	}
});
