classifieds.classifiedDetailsView = Backbone.View.extend({
	initialize:function(options){
		this.options = options || {};
		this.template = this.options.template;
		this.render();
	},
	render:function(){
		this.$el.html(_.template($(this.template).html())({data:this.model.attributes[0]}));
		this.renderDetails();
	},
	renderDetails:function(){
		var images = this.model.attributes[0].classifiedImgs;
		if(images.length==0){
			$(".classified-data").addClass("information");
			$(".image-section").remove();
		} else {
			$(".classified-data").removeClass("information");
		}
		var price = this.model.attributes[0].classifiedPrice;
		if(price==null || price<0) {
			$(".selected-classified-price").remove();
			$(".is-negotiable").remove();
		}
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
