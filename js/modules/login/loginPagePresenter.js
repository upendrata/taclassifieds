var classifieds = classifieds || {};
classifieds.loginPagePresenter = function(){
	return{
		showLoginPage: function(){
			var loginPageObj = new classified.loginPageView({el:"#page-container",template:"#ta-classified-login-tpl"});
		}
	}
}
