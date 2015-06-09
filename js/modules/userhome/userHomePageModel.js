var classifieds = classifieds || {};

classifieds.classifiedModel = Backbone.Model.extend({
	initialize:function(){
	}
});
classifieds.allClassifiedsCollection = Backbone.Collection.extend({model : classifieds.classifiedModel});
classifieds.allClasifiedsPageModel = Backbone.Model.extend({
	initialize:function(){
	},
	parse:function(resp){
		var allClassifieds = resp.allClassifieds;
		if(allClassifieds){
			var allClassifiedsList = new classifieds.allClassifiedsCollection(allClassifieds);
			resp.allClassifieds = allClassifiedsList;
		}
		return resp;
	}
});

classifieds.myClassifiedModel = Backbone.Model.extend({
	initialize:function(){
	}
});
classifieds.myClassifiedsCollection = Backbone.Collection.extend({model : classifieds.myClassifiedModel});
classifieds.myClasifiedsPageModel = Backbone.Model.extend({
	initialize:function(){
	},
	parse:function(resp){
		var myClassifieds = resp.allMyClassifieds;
		if(myClassifieds){
			var myClassifiedsList = new classifieds.myClassifiedsCollection(myClassifieds);
			resp.allMyClassifieds = myClassifiedsList;
		}
		return resp;
	}
});

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
