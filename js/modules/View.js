classified.userHomePageView = Backbone.View.extend({
	initialize:function(options){
		this.options = options  || {};
		this.template = this.options.template;
		this.render();
	},
	render:function(){
		this.$el.html(_.template($(this.template).html()));
	},
	events:{
		"click .options a":"highlightLink"
	},
	highlightLink:function(e){
		this.$el.find('.options a.highlight').removeClass();
		var index = $(e.target).parent("a").index();
		sessionStorage.setItem("index",index);
		this.$el.find('.options a').eq(index).addClass('highlight');
	}
});

//to attach the menu to the container
classified.menuView = Backbone.View.extend({
	initialize:function(options){
		this.options = options  || {};
		this.template = this.options.template;
		this.render();
	},
	render:function(){
		this.$el.html(_.template($(this.template).html()));
		if(sessionStorage.getItem("username")==null){
			$(".post-classified").hide();
			$(".my-classifieds").hide();
			$('.options a').eq(0).removeClass();
		}
	}
});

classified.categoriesView = Backbone.View.extend({
	initialize:function(options){
		this.options = options || {};
		this.template = this.options.template;
		this.render();
	},
	render:function(){
		var self=this;
		$.each(this.model.attributes,function(index,category){
			self.$el.append(_.template($(self.template).html())({listItem:category}));
		});
	}
});