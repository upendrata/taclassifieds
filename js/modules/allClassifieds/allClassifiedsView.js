var classified = classified || {};
//to attach the list container and the buttons to the classifieds container
classified.listView = Backbone.View.extend({
	initialize:function(options){
		this.options = options || {};
		this.template = this.options.template;
		this.startValue = this.options.startValue;
		this.endValue = this.options.endValue;
		this.render();
	},
	render:function(){
		this.$el.html(_.template($(this.template).html()));
		if(this.model.attributes.allClassifieds.length<=20){
			this.$el.find('.previous').hide();
			this.$el.find('.next').hide();
		} 
		this.renderAllClassifieds();
		this.renderCategories();
	},
	renderCategories:function(){
		var categoriesObj = new classified.categoriesView({el:"#categories-filter",template:"#ta-classified-categories-list-tpl",model:categoriesRef});
	},
	renderAllClassifieds:function(){
		var url=window.location;
		var hash = window.location.hash.substring(1);
		if(hash=="classified/:mailIndex"){
			var classifiedDetailsObj = new classifieds.classifiedDetailsPresenter();
			classifiedDetailsObj.showClassifiedDetails();
		} else {
			var allClassifieds = new classified.allClassifiedsView({el:".all-classifieds-list",template:"#ta-classified-all-classifieds-tpl",model:this.model,startValue:this.startValue,endValue:this.endValue});
		}
	},
	events :{
		"click .next":"showNextClassifieds",
		"click .previous":"showPreviousClassifieds",
		"change #categories-filter":"showSelectedClassifieds"
	},
	showSelectedClassifieds:function(){
		var selectedCategory = $("#categories-filter option:selected").text();
		var index = $("#categories-filter option:selected").val();
		if(selectedCategory=="All Categories"){
			var allClassifieds = new classified.allClassifiedsView({el:".all-classifieds-list",template:"#ta-classified-all-classifieds-tpl",model:this.model,startValue:this.startValue,endValue:this.endValue});
		} else {
			var allClassifieds = new classified.selectedAllClassifiedsView({el:".all-classifieds-list",template:"#ta-classified-all-classifieds-tpl",model:this.model,startValue:this.startValue,endValue:this.endValue,category:selectedCategory});
		}
	},
	showNextClassifieds:function(){
		if(this.endValue<=(JSON.parse(sessionStorage.getItem("allClassifieds")).allClassifieds.length)){
			this.startValue = this.startValue+20;
			this.endValue = this.endValue+20;
			this.$el.find('.all-classifieds-list').empty();
			var allClassifieds = new classified.allClassifiedsView({el:".all-classifieds-list",template:"#ta-classified-all-classifieds-tpl",model:this.model,startValue:this.startValue,endValue:this.endValue});
		}
		this.showButtons();
	},
	showPreviousClassifieds:function(){
		if(this.startValue-20>=0){
			this.startValue = this.startValue-20;
			this.endValue = this.endValue-20;
			this.$el.find('.all-classifieds-list').empty();
			var allClassifieds = new classified.allClassifiedsView({el:".all-classifieds-list",template:"#ta-classified-all-classifieds-tpl",model:this.model,startValue:this.startValue,endValue:this.endValue});
		}
		this.showButtons();
	},
	showButtons:function(){
		if(sessionStorage.getItem("allClassifieds")!=null){
			if(this.endValue>=(JSON.parse(sessionStorage.getItem("allClassifieds")).allClassifieds.length)){
				this.$el.find('.next').hide();
			} else {
				this.$el.find('.next').show();
			}
			if(this.startValue==0){
				this.$el.find('.previous').hide();
			} else {
				this.$el.find('.previous').show();
			}
		}
	}
});
classified.selectedAllClassifiedsView = Backbone.View.extend({
	initialize:function(options){
		this.options = options || {};
		this.template = this.options.template;
		this.startValue=this.options.startValue;
		this.endValue = this.options.endValue;
		this.category = this.options.category;
		this.render();
	},
	render:function(){
		$(".all-classifieds-list").empty();
		var category=this.category;
		var self=this;
		$.each(this.model.get("allClassifieds").models,function(index,classifiedList){
			if((classifieds.modelRef.get("allClassifieds").models[index].get("classifiedCategory"))==category){
				self.$el.append(_.template($(self.template).html())({classifieds:classifiedList}));
			}
		});
		if($(".all-classifieds-list").is(":empty")){
			$(".all-classifieds-list").html("<div class='response'></div>");
			$('.all-classifieds-list div').html("There are no classifieds with"+category);
		}
	}
});
classified.allClassifiedsView = Backbone.View.extend({
	initialize:function(options){
		this.options = options || {};
		this.template = this.options.template;
		this.startValue=this.options.startValue;
		this.endValue = this.options.endValue;
		this.render();
	},
	render:function(){
		$(".all-classifieds-list").empty();
		var self=this;
		$.each(this.model.get("allClassifieds").models,function(index,classifiedList){
			if((index>=self.startValue && index<=self.endValue)){
				self.$el.append(_.template($(self.template).html())({classifieds:classifiedList}));
			}
		});
	},
	events:{
		"click .classified-list-item":"showClassifiedDescription"
	},
	showClassifiedDescription:function(e){
		var source=$(e.target);
		if(source.is("li")){
			var index = source.index()+1;
		} else {
			var index = (source.parent('.classified-list-item').index())+1;
		}
		var indexValue = (index+this.startValue)-1;
		var startValue = this.startValue;
		var id=JSON.parse(sessionStorage.getItem("allClassifieds")).allClassifieds[indexValue].classifiedId;
		sessionStorage.setItem("id",id);
		sessionStorage.setItem("pageId","all");
		window.location="#classified/:"+id;
		/*alert(indexValue);*/
	}
});