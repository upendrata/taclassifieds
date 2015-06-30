var classifieds = classifieds || {};
classifieds.changePasswordPagePresenter = function(){
	function renderViews(){
		classifieds.homePageObj = new classified.userHomePageView({el:"#page-container",template:"#ta-classified-user-base-tpl"});
		if(sessionStorage.getItem("username")!=null){
			classifieds.menuObj = new classified.menuView({el:"#menu",template:"#ta-classified-menu-tpl"});
		}
	}
	return{
		changePassword: function(){
			renderViews();
			var changePasswordPageObj = new classifieds.changePasswordPageView({el:"#classifieds-container",template:"#ta-classified-change-password-tpl"});
		}
	}
}