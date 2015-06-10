var classifieds = classifieds || {};
classifieds.signUpModel = Backbone.Model.extend({
	initialize:function(){

	}
});
classifieds.signUpFormModel = Backbone.Model.extend({
	defaults:{
		'empname' : null,
		'empid' : null,
		'empemail' : null,
		'emppassword' : null,
		'empquestion' : null,
		'empqans' : null
	},
	initialize:function(){
	},
	url:"codebase/addUser.php"
});
