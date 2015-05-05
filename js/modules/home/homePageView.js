var classified =classified  || {};
classified.homePageView = Backbone.View.extend({
	initialize:function(options){
		this.options = options || {};
		this.template = this.options.template;
		this.render();
	},
	render:function(){
		if(sessionStorage.getItem("username")!=null){
			this.$el.append(_.template($(this.template).html()));
		} else {
			this.$el.html(_.template($(this.template).html()));
		}
		this.renderClassifiedsList();
	},
	renderClassifiedsList:function(){
		var classifiedsListObj = new classified.classifiedsListView({el:".classifieds-list",template:"#ta-classified-list-tpl",model:this.model});
	}
});
classified.classifiedsListView = Backbone.View.extend({
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