var classifieds = classifieds || {};
classifieds.forgotPwdFormModel = Backbone.Model.extend({
	defaults:{
		'username':null,
		'queryStr':null
	},
	initialize:function(){

	},
	url:"codebase/classifiedsData.php"
});