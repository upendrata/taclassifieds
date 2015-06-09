var classifieds =classifieds  || {};
classifieds.homePageView = Backbone.View.extend({
	initialize:function(options){
		this.options = options || {};
		this.template = this.options.template;
		this.render();
	},
	render:function(){
		this.$el.html(_.template($(this.template).html()));
		this.renderClassifiedsList();
	},
	renderClassifiedsList:function(){
		var classifiedsListObj = new classifieds.classifiedsListView({el:".classifieds-list",template:"#ta-classified-list-tpl",model:this.model});
		if(sessionStorage.getItem("username")!=null){
			var homeMenuObj = new classifieds.menuView({el:"#menu",template:"#ta-classified-menu-tpl"});
			classifieds.homePageObj=null;
		} 
	},
	events:{
		"click .more-classifieds":"showAllClassifieds"
	},
	showAllClassifieds:function(){
		window.location="#classifieds";
	}
});
classifieds.homeView = Backbone.View.extend({
	initialize:function(options){
		this.options = options || {};
		this.template = this.options.template;
		this.render();
	},
	render:function(){
		this.$el.html(_.template($(this.template).html()));
	}
});
classifieds.classifiedsListView = Backbone.View.extend({
	initialize:function(options){
		this.options = options || {};
		this.template = this.options.template;
		this.render();
	},
	render:function(){
		var self=this;
		$.each(this.model.models,function(index,classifiedList){
			self.$el.append(_.template($(self.template).html())({classifieds:classifiedList}));
		});
	}
});
classifieds.menuView = Backbone.View.extend({
	initialize:function(options){
		this.options = options || {};
		this.template = this.options.template;
		this.render();
	},
	render:function(){
		this.$el.html(_.template($(this.template).html()));
		$('.options a').removeClass("highlight");
	}
});