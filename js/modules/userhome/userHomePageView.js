var classified = classified || {};
var startValue=0,endValue=19;
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
		$('.options a.highlight').removeClass();
		var index = $(e.target).index();
		sessionStorage.setItem("index",index);
		$('.options a').eq(index).addClass('highlight');
	}
});
classified.menuView = Backbone.View.extend({
	initialize:function(options){
		this.options = options  || {};
		this.template = this.options.template;
		this.render();
	},
	render:function(){
		this.$el.html(_.template($(this.template).html()));
	}
});
classified.listView = Backbone.View.extend({
	initialize:function(options){
		this.options = options  || {};
		this.template = this.options.template;
		this.startValue = 0;
		this.endValue = 19;
		this.render();
	},
	render:function(){
		this.$el.html(_.template($(this.template).html()));
		this.renderAllClassifieds();
	},
	renderAllClassifieds:function(){
		var allClassifieds = new classified.allClassifiedsView({el:".all-classifieds-list",template:"#ta-classified-all-classifieds-tpl",model:this.model,startValue:this.startValue,endValue:this.endValue});
	},
	events :{
		"click .next":"showNextClassifieds",
		"click .previous":"showPreviousClassifieds"
	},
	showNextClassifieds:function(){
		if(this.endValue<=(JSON.parse(sessionStorage.getItem("allClassifieds")).allClassifieds.length)){
			this.startValue = this.startValue+20;
			this.endValue = this.endValue+20;
			$('.all-classifieds-list').empty();
			var allClassifieds = new classified.allClassifiedsView({el:".all-classifieds-list",template:"#ta-classified-all-classifieds-tpl",model:this.model,startValue:this.startValue,endValue:this.endValue});
		}
	},
	showPreviousClassifieds:function(){
		if(this.startValue-20>=0){
			this.startValue = this.startValue-20;
			this.endValue = this.endValue-20;
			$('.all-classifieds-list').empty();
			var allClassifieds = new classified.allClassifiedsView({el:".all-classifieds-list",template:"#ta-classified-all-classifieds-tpl",model:this.model,startValue:this.startValue,endValue:this.endValue});
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
		var self=this;
		$.each(this.model.get("allClassifieds").models,function(index,classifiedList){
			if((index>=self.startValue && index<=self.endValue)){
				self.$el.append(_.template($(self.template).html())({classifieds:classifiedList}));
			}
		});
	}
});
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
		this.renderAllMyClassifieds();
	},
	renderAllMyClassifieds:function(){
		var myClassifieds = new classified.myClassifiedsView({el:".all-classifieds-list",template:"#ta-classified-my-classifieds-tpl",model:this.model,startValue:this.startValue,endValue:this.endValue});
	},
	events :{
		"click .next":"showNextClassifieds",
		"click .previous":"showPreviousClassifieds"
	},
	showNextClassifieds:function(){
		if(this.endValue<=(JSON.parse(sessionStorage.getItem("allMyClassifieds")).allMyClassifieds.length)){
			this.startValue = this.startValue+20;
			this.endValue = this.endValue+20;
			$('.all-classifieds-list').empty();
			var myClassifieds = new classified.myClassifiedsView({el:".all-classifieds-list",template:"#ta-classified-my-classifieds-tpl",model:this.model,startValue:this.startValue,endValue:this.endValue});
		}
	},
	showPreviousClassifieds:function(){
		if(this.startValue-20>=0){
			this.startValue = this.startValue-20;
			this.endValue = this.endValue-20;
			$('.all-classifieds-list').empty();
			var myClassifieds = new classified.myClassifiedsView({el:".all-classifieds-list",template:"#ta-classified-my-classifieds-tpl",model:this.model,startValue:this.startValue,endValue:this.endValue});
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
		var self=this;
		$.each(this.model.get("allMyClassifieds").models,function(index,classifiedList){
			if((index>=self.startValue && index<=self.endValue)){
				self.$el.append(_.template($(self.template).html())({classifieds:classifiedList}));
			}
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
		this.$el.html(_.template($(this.template).html()));
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
		};
		$.ajax({
			type:"POST",
			url:"codebase/postAClassified.php",
			dataType:"JSON",
			data:data,
			success:function(resp){
				var dataPresent = JSON.parse(sessionStorage.getItem("allClassifieds"));
				if(dataPresent!=null){
					dataPresent.allClassifieds.push(data);
					sessionStorage.setItem("allClassifieds",JSON.stringify(dataPresent));
				}
				var myClassifieds = JSON.parse(sessionStorage.getItem("allMyClassifieds"));
				if(myclassifieds!=null){
					myClassifieds.allMyClassifieds.push(data);
					sessionStorage.setItem("allMyClassifieds",JSON.stringify(dataPresent));
				}
				window.location = "#myclassifieds";
			},
			error:function(resp){
				alert("error");
			}
		});
	}
	
});
