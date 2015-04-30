var classifieds = classifieds || {};
classifieds.signUpPagePresenter = function(){
	return{
		showSignUpPage: function(){
			var signUpPageObj = new classified.signUpPageView({el:"#page-container",template:"#ta-classified-signup-tpl"});
		}

	}
}