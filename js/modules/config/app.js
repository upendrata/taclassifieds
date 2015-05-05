var classifieds = classifieds || {};
var data;
classifieds.router = Backbone.Router.extend({
	routes:{
		"":"showHomePage",
		"home":"showHomePage",
		"logout":"showHome",
		"login":"showLoginPage",
		"signup":"showSignUpPage",
		"classifieds":"showUserHomePage",
		"myclassifieds":"showMyClassifieds",
		"postClassified":"showClassifiedForm"
	},
	showHome:function(){
		sessionStorage.clear();
		classifieds.homePageObj = null;
		var homePagePresenterObj = new classifieds.homePagePresenter();
		homePagePresenterObj.showHomePage();
	},
	showHomePage:function(){
		var homePagePresenterObj = new classifieds.homePagePresenter();
		homePagePresenterObj.showHomePage();
	},
	showLoginPage:function(){
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
	showMyClassifieds:function(){
		var userHomePagePresenterObj = new classifieds.userHomePagePresenter();
		userHomePagePresenterObj.showMyClassifieds(); 
	},
	showClassifiedForm:function(){
		var userHomePagePresenterObj = new classifieds.userHomePagePresenter();
		userHomePagePresenterObj.showClassifiedForm(); 
	}
});