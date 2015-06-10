var classifieds = classifieds || {};
classifieds.signUpPagePresenter = function(){
	return{
		showSignUpPage: function(){
			var signUpPageRef = new classifieds.signUpModel(data.signup);
			var formModelRef = new classifieds.signUpFormModel();
			var signUpPageObj = new classified.signUpPageView({el:"#page-container", template:"#ta-classified-signup-tpl", model:signUpPageRef, formModel : formModelRef});
		}
	}
}