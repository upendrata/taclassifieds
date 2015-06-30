var classifieds = classifieds || {};

classifieds.classifiedDetailsModel = Backbone.Model.extend({
	initialize:function(){

	}
});

classifieds.myClassifiedDetailsModel = Backbone.Model.extend({
	initialize:function(){

	}
});

var categoriesModel = Backbone.Model.extend({
	initialize:function(){

	}
});
var categoriesRef = new categoriesModel(data.categories);


classifieds.postClassifiedFormModel = Backbone.Model.extend({
	defaults:{
		'heading':null,
		'category':null,
		'specification':null,
		'price':null,
		'negotiable':null
	},
	initialize:function(){

	},
	url:"codebase/postAClassified.php"
});


classifieds.postInformationModel = Backbone.Model.extend({
	defaults:{
		'heading':null,
		'specification':null
	},
	initialize:function(){

	},
	url:"codebase/postAClassified.php"
});

classifieds.postInformationImageModel = Backbone.Model.extend({
	defaults:{
		'heading':null,
		'specification':null
	},
	initialize:function(){

	},
	url:"codebase/postAClassified.php"
});