var classifieds = classifieds || {};
var data;
classifieds.router = Backbone.Router.extend({
	routes:{
		"":"showHomePage",
		"home":"showHomePage",
		"login":"showLoginPage",
		"signup":"showSignUpPage",
		"classifieds":"showUserHomePage",
		"myclassifieds":"showMyClassifieds",
		"forgotpwd":"showForm",
		"postClassified":"showClassifiedForm"
	},
	showHomePage:function(){
		var homePagePresenterObj = new classifieds.homePagePresenter();
		homePagePresenterObj.showHomePage();
	},
	showLoginPage:function(){
		sessionStorage.removeItem("user");
		var loginPagePresenterObj = new classifieds.loginPagePresenter();
		loginPagePresenterObj.showLoginPage();
	},
	showSignUpPage:function(){
		var signUpPagePresenterObj = new classifieds.signUpPagePresenter();
		signUpPagePresenterObj.showSignUpPage();
	},
	showUserHomePage:function(){
		var userHomePagePresenterObj = new classifieds.userHomePagePresenter();
		userHomePagePresenterObj.showUserHomePage(); 
	},
	showForm:function(){
		var forgotPwdPagePresenterObj = new classifieds.forgotPasswordPagePresenter();
		forgotPwdPagePresenterObj.showForgotPasswordPage();
	},
	showMyClassifieds:function(){
		var userHomePagePresenterObj = new classifieds.userHomePagePresenter();
		userHomePagePresenterObj.showMyClassifieds(); 
	},
	showClassifiedForm:function(){
		var userHomePagePresenterObj = new classifieds.userHomePagePresenter();
		userHomePagePresenterObj.showClassifiedForm(); 
	}
});