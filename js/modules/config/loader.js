var classifieds = classifieds || {};
classifieds.Loader = (function(){
	return{
		show:function(){
			$('#loader-img').show();
			$('.loader-mask').show();
		},
		hide:function(){
			$('#loader-img').hide();
			$('.loader-mask').hide();
		}
	}
})();