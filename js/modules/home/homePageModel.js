var classifieds = classifieds || {};
var classifiedModel = Backbone.Model.extend({
	initialize:function(){

	}
});
var classifiedCollection = Backbone.Collection.extend({model:classifiedModel});


classifieds.allClassifiedModel = Backbone.Model.extend({
	initialize:function(){
	}
});
classifieds.allClasifiedsCollection = Backbone.Collection.extend({model : classifieds.allClassifiedModel});
classifieds.allClassifiedsModel = Backbone.Model.extend({
	initialize:function(){
	},
	parse:function(resp){
		var allClassifieds = resp.allClassifieds;
		if(allClassifieds){
			var allClassifieds = new classifieds.allClasifiedsCollection(allClassifieds);
			resp.allClassifieds = allClassifieds;
		}
		return resp;
	}
});