var classifieds = classifieds || {};
classifieds.loginPagePresenter = function(){
	return{
		showLoginPage: function(){
			if(sessionStorage.getItem("username")==null){
				var loginModelRef = new classifieds.loginModel(data.login);
				var loginFormModelRef = new classifieds.logInFormModel();
				var loginPageObj = new classified.loginPageView({el:"#page-container",template:"#ta-classified-login-tpl",model:loginModelRef,logFormModel:loginFormModelRef});
			} else {
				window.location = "#home";
			}
		}
	}
}
