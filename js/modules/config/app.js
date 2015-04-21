var classifieds = classifieds || {};
classifieds.router = Backbone.Router.extend({
	routes:{
		"":"showHomePage",
		"home":"showHomePage",
		"login":"showLoginPage",
		"signup":"showSignUpPage"
	},
	showHomePage:function(){
		var headerObj = new classified.headerView({el:".headerContainer",template:'#ta-classified-header-tpl'});
		var footerObj = new classified.footerView({el:".footerContainer",template:"#ta-classified-footer-tpl"});
		var homePageObj = new classified.homePageView({el:'#pageContainer',template:"#ta-classified-homepage-tpl"});
	},
	showLoginPage:function(){
		var loginPageObj = new classified.loginPageView({el:"#pageContainer",template:"#ta-classified-login-tpl"});
	},
	showSignUpPage:function(){
		var signUpPageObj = new classified.signUpPageView({el:"#pageContainer",template:"#ta-classified-signup-tpl"});
	}
});