var classified = classified || {};

classified.myListView = Backbone.View.extend({
	initialize:function(options){
		this.options = options || {};
		this.template = this.options.template;
		this.startValue = 0;
		this.endValue = 19;
		this.render();
	},
	render:function(){
		this.$el.html(_.template($(this.template).html()));
		if(this.model.attributes.allMyClassifieds.length<=20){
			this.$el.find('.previous').hide();
			this.$el.find('.next').hide();
		} 
		this.renderAllMyClassifieds();
		this.renderCategories();
	},
	renderCategories:function(){
		var categoriesObj = new classified.categoriesView({el:"#categories-filter",template:"#ta-classified-categories-list-tpl",model:categoriesRef});
	},
	renderAllMyClassifieds:function(){
		var myClassifieds = new classified.myClassifiedsView({el:".all-classifieds-list",template:"#ta-classified-my-classifieds-tpl",model:this.model,startValue:this.startValue,endValue:this.endValue});
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
			var myClassifieds = new classified.myClassifiedsView({el:".all-classifieds-list",template:"#ta-classified-my-classifieds-tpl",model:this.model,startValue:this.startValue,endValue:this.endValue});
		} else {
			var myClassifieds = new classified.selectedClassifiedsView({el:".all-classifieds-list",template:"#ta-classified-my-classifieds-tpl",model:this.model,startValue:this.startValue,endValue:this.endValue,category:selectedCategory});
		}
	},
	showNextClassifieds:function(){
		if(this.endValue<=(JSON.parse(sessionStorage.getItem("allMyClassifieds")).allMyClassifieds.length)){
			this.startValue = this.startValue+20;
			this.endValue = this.endValue+20;
			this.$el.find('.all-classifieds-list').empty();
			var myClassifieds = new classified.myClassifiedsView({el:".all-classifieds-list",template:"#ta-classified-my-classifieds-tpl",model:this.model,startValue:this.startValue,endValue:this.endValue});
		}
		this.showButtons();
	},
	showPreviousClassifieds:function(){
		if(this.startValue-20>=0){
			this.startValue = this.startValue-20;
			this.endValue = this.endValue-20;
			this.$el.find('.all-classifieds-list').empty();
			var myClassifieds = new classified.myClassifiedsView({el:".all-classifieds-list",template:"#ta-classified-my-classifieds-tpl",model:this.model,startValue:this.startValue,endValue:this.endValue});
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


classified.selectedClassifiedsView = Backbone.View.extend({
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
		$.each(this.model.get("allMyClassifieds").models,function(index,classifiedList){
			if((classifieds.modelRefObj.get("allMyClassifieds").models[index].get("classifiedCategory"))==category){
				self.$el.append(_.template($(self.template).html())({classifieds:classifiedList}));
			}
		});
		if($(".all-classifieds-list").is(":empty")){
			$(".all-classifieds-list").html("<div class='response'></div>");
			$('.all-classifieds-list div').html("There are no classifieds with"+category);
		}
	}
});


classified.myClassifiedsView = Backbone.View.extend({
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
		$.each(this.model.get("allMyClassifieds").models,function(index,classifiedList){
			if((index>=self.startValue && index<=self.endValue)){
				self.$el.append(_.template($(self.template).html())({classifieds:classifiedList}));
			}
		});
	},
	events:{
		"click .my-classified-item":"showClassifiedDescription",
		"click .edit":"editClassified",
		"click .delete":"deleteClassified"
	},
	showClassifiedDescription:function(e){
		var source=$(e.target);
		if(source.is("li")){
			var index = source.index();
			var indexValue = (index+this.startValue);
			var startValue = this.startValue;
			var id =JSON.parse(sessionStorage.getItem("allMyClassifieds")).allMyClassifieds[indexValue].classifiedId;
			sessionStorage.setItem("pageId","my");
			sessionStorage.setItem("id",id);
			window.location="#classified/:"+id;
		} else if(source.is(".icons>.edit")){
			var source=$(e.target);
				var index = (source.parents('.my-classified-item').index());
				var indexValue = (index+this.startValue);
			
			var id =JSON.parse(sessionStorage.getItem("allMyClassifieds")).allMyClassifieds[indexValue].classifiedId;
			sessionStorage.setItem("edit-classified-id",id);
			window.location = "#editMyClssified/:"+id;
		} else {
			var index = (source.parents('.my-classified-item').index());
			var indexValue = (index+this.startValue);
			var startValue = this.startValue;
			var id =JSON.parse(sessionStorage.getItem("allMyClassifieds")).allMyClassifieds[indexValue].classifiedId;
			sessionStorage.setItem("pageId","my");
			sessionStorage.setItem("id",id);
			window.location="#classified/:"+id;
		}
		
		/*alert(indexValue);*/
	},
	editClassified:function(e){
		
	},
	deleteClassified:function(e){
		var source=$(e.target);
		if(source.is(".icons span")){
			var index = (source.parents('.my-classified-item').index());
			var indexValue = (index+this.startValue);
		}
		var data = {
			queryStr : "delClassified",
			classifiedId : JSON.parse(sessionStorage.getItem("allMyClassifieds")).allMyClassifieds[indexValue].classifiedId,
		};
		$.ajax({
			type:"POST",
			url:"codebase/classifiedsData.php",
			dataType:"JSON",
			data:data,
			success:function(resp){
				sessionStorage.removeItem("allMyClassifieds");
				sessionStorage.removeItem("allClassifieds");
				window.location="#myclassifieds";

			},
			error:function(resp){
				/*$("#classifieds-container").prepend(resp.responseJSON.responseText);*/
			}
		});
	}
});