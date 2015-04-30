classified.userHomePageView = Backbone.View.extend({
	initialize:function(options){
		this.options = options  || {};
		this.template = this.options.template;
		this.render();
	},
	render:function(){
		this.$el.html(_.template($(this.template).html()));
	}
});
classified.allClassifiedsView = Backbone.View.extend({
	initialize:function(options){
		this.options = options || {};
		this.template = this.options.template;
		this.render();
	},
	render:function(){
		var self=this;
		$.each(this.model.models[0].attributes,function(index,classifiedList){
			self.$el.append(_.template($(self.template).html())({classifieds:classifiedList}));
		});
	}
});
classified.postClassifiedView = Backbone.View.extend({
	initialize:function(options){
		this.options = options  || {};
		this.template = this.options.template;
		this.render();
	},
	render:function(){
		this.$el.append(_.template($(this.template).html()));
	},
	events:{
		"click .submit-classified":"postClassified"
	},
	postClassified:function(){
		var data = {
			empemail : sessionStorage.getItem("username"),
			classifiedCategory : $(".category").val(),
			classifiedHeading : $(".heading").val(),
			classifiedDesc : $(".description").val()
		}
		$.ajax({
			type:"POST",
			url:"codebase/postAClassified.php",
			dataType:"JSON",
			data:data,
			success:function(resp){
				console.log(resp);
			},
			error:function(resp){
				alert("error");
			}
		});
	}
	
});
