var classifieds = classifieds || {};

classifieds.logInFormModel = Backbone.Model.extend({
	defaults:{
		'username':null,
		'password':null,
		'queryStr':null
	},
	initialize:function(){

	},
	url:"codebase/validateUser.php"
});


classifieds.loginModel = Backbone.Model.extend({
	initialize:function(){
		
	}
});


