var classifieds = classifieds || {};
classifieds.router = Backbone.Router.extend({
	routes:{
		"":"showHomePage",
		"home":"showHomePage",
		"login":"showLoginPage",
		"signup":"showSignUpPage",
		"classifieds":"showUserHomePage",
		"myclassifieds":"showMyClassifieds",
		"forgotpwd":"showForm",
		"postClassified":"showClassifiedForm",
		"classified/:mailIndex":"showClassifiedDetails",
		"editMyClssified/:Index":"showEditClassifiedForm"
	},
	showEditClassifiedForm:function(){
		var editClassifiedPagePresenterObj = new classifieds.editClassifiedPagePresenter();
		editClassifiedPagePresenterObj.updateClassified();
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
		var userHomePagePresenterObj = new classifieds.allClassifiedsPagePresenter();
		userHomePagePresenterObj.showAllClassifieds(); 
	},
	showForm:function(){
		var forgotPwdPagePresenterObj = new classifieds.forgotPasswordPagePresenter();
		forgotPwdPagePresenterObj.showForgotPasswordPage();
	},
	showMyClassifieds:function(){
		var userHomePagePresenterObj = new classifieds.myClassifiedsPagePresenter();
		userHomePagePresenterObj.showMyClassifieds(); 
	},
	showClassifiedForm:function(){
		var userHomePagePresenterObj = new classifieds.userHomePagePresenter();
		userHomePagePresenterObj.showClassifiedForm(); 
	},
	showClassifiedDetails:function(){
		var classifiedDetailsObj = new classifieds.classifiedDetailsPresenter();
		classifiedDetailsObj.showClassifiedDetails();
	}
});