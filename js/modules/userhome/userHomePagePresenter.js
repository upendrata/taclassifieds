var classifieds = classifieds || {};
classifieds.userHomePagePresenter = function(){
	function renderViews(){
		classifieds.homePageObj = new classified.userHomePageView({el:"#page-container",template:"#ta-classified-user-base-tpl"});
		if(sessionStorage.getItem("username")!=null){
			classifieds.menuObj = new classified.menuView({el:"#menu",template:"#ta-classified-menu-tpl"});
		}
		selectedListItem();
	}
	function selectedListItem(){
		$('.options a.highlight').removeClass();
		var index = sessionStorage.getItem("index");
		if(index==null){
			$('.options a').eq(1).addClass("highlight");
		} else {
			$('.options a').eq(index).addClass("highlight");
		}
	}
	return{
		showClassifiedForm:function(){
			renderViews();
			
			var postClassifiedObj = new classified.postClassifiedView({el:"#classifieds-container",template:"#ta-classified-post-classified-tpl",model:categoriesRef});		
		}
	}
}