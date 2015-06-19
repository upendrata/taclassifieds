classifieds.classifiedDetailsView = Backbone.View.extend({
	initialize:function(options){
		this.options = options || {};
		this.template = this.options.template;
		this.render();
	},
	render:function(){
		this.$el.html(_.template($(this.template).html())({data:this.model.attributes[0]}));
	},
	events :{
		"click .back-option":"showClassifiedsPage",
		"click .thumb-img": "showImage"
	},
	showImage : function(e){
  		$("#img-preview img").attr('src', $(e.currentTarget).attr('src'));
 	},
	showClassifiedsPage:function(){
		if(sessionStorage.getItem("pageId")=="all"){
			window.location="#classifieds";
		} else {
			window.location="#myclassifieds";
		}
	}
});
