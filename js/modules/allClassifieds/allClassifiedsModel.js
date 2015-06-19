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
