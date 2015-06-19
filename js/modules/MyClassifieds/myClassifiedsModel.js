var classifieds = classifieds || {};

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