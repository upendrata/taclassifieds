var classifieds = classifieds || {};
classifieds.homePagePresenter = function(){
	return{
		showHomePage: function(){
			$.ajax({
				type:"GET",
				url:"codebase/getClassifiedsForHomePage.php",
				dataType:"JSON",
				beforeSend:function(){
					classifieds.Loader.show();
				},
				success:function(resp){
					var classifiedObj = new classifiedCollection(resp);
					var homePage = new classifieds.homePageView({el:'#page-container',template:"#ta-classified-homepage-tpl",model:classifiedObj});
				},
				error:function(resp){
					classifieds.Loader.hide();
					var classifiedObj = new classifiedCollection(resp);
					var homePage = new classifieds.homeView({el:'#page-container',template:"#ta-classified-homepage-tpl"});
					$('.classifieds-list').html(resp.responseJSON.responseText);
					$(".more-classifieds").hide();
				},
				complete:function(){
					if(sessionStorage.getItem("username")!=null){
						var homeMenuObj = new classifieds.menuView({el:"#menu",template:"#ta-classified-menu-tpl"});
						classifieds.homePageObj=null;
					}
					classifieds.Loader.hide();
				}
			});
		}
	}
}