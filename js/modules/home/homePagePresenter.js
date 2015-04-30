var classifieds = classifieds || {};
classifieds.homePagePresenter = function(){
	return{
		showHomePage: function(){
			var pageModelObj = new pageModel();
			pageModelObj.fetch({
				type:"GET",
				url:"codebase/getClassifiedsForHomePage.php",
				dataType:"JSON",
				beforeSend:function(){
					classifieds.Loader.show();
				},
				success:function(resp){
					var classifiedObj = new classifiedCollection(resp);
					var homePageObj = new classified.homePageView({el:'#page-container',template:"#ta-classified-homepage-tpl",model:classifiedObj});
				},
				error:function(resp){
					alert("error");
				},
				complete:function(){
					classifieds.Loader.hide();
				}
			});
			if(sessionStorage.getItem('username')==null){
				$('.signin-links').removeClass("hide");
				$('.logout-links').removeClass('show');
			}
		}

	}
}