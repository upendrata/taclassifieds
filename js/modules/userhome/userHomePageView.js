var classified = classified || {};

//user home page view to attach the base tpl to the pagecontainer
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
		var index = $(e.target).parent("a").index();
		sessionStorage.setItem("index",index);
		$('.options a').eq(index).addClass('highlight');
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
			$('.previous').hide();
			$('.next').hide();
		} 
		this.renderAllClassifieds();
		this.renderCategories();
	},
	renderCategories:function(){
		var categoriesObj = new classified.categoriesView({el:"#categories-filter",template:"#ta-classified-categories-list-tpl",model:categoriesRef});
	},
	renderAllClassifieds:function(){
		var allClassifieds = new classified.allClassifiedsView({el:".all-classifieds-list",template:"#ta-classified-all-classifieds-tpl",model:this.model,startValue:this.startValue,endValue:this.endValue});
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
			$('.all-classifieds-list').empty();
			var allClassifieds = new classified.allClassifiedsView({el:".all-classifieds-list",template:"#ta-classified-all-classifieds-tpl",model:this.model,startValue:this.startValue,endValue:this.endValue});
		}
		this.showButtons();
	},
	showPreviousClassifieds:function(){
		if(this.startValue-20>=0){
			this.startValue = this.startValue-20;
			this.endValue = this.endValue-20;
			$('.all-classifieds-list').empty();
			var allClassifieds = new classified.allClassifiedsView({el:".all-classifieds-list",template:"#ta-classified-all-classifieds-tpl",model:this.model,startValue:this.startValue,endValue:this.endValue});
		}
		this.showButtons();
	},
	showButtons:function(){
		if(sessionStorage.getItem("allClassifieds")!=null){
			if(this.endValue>=(JSON.parse(sessionStorage.getItem("allClassifieds")).allClassifieds.length)){
				$('.next').hide();
			} else {
				$('.next').show();
			}
			if(this.startValue==0){
				$('.previous').hide();
			} else {
				$('.previous').show();
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
		/*alert(indexValue);*/
		$.ajax({
			type:"GET",
			url:"codebase/getClassifiedDetails.php",
			dataType:"JSON",
			data:{
				classifiedId : JSON.parse(sessionStorage.getItem("allClassifieds")).allClassifieds[indexValue].classifiedId
			},
			success:function(resp){
				console.log(resp);
				classified.classifiedDetailsObj = new classifieds.classifiedDetailsModel(resp);
				classified.classifiedDetailsViewObj = new classifieds.classifiedDetailsView({el:"#classifieds-container",template:"#ta-classified-details-tpl",model:classified.classifiedDetailsObj,indexValue:index,startValue:startValue});
			},
			error:function(resp){
				console.log(resp);
			}
		});
	}
});

classifieds.classifiedDetailsView = Backbone.View.extend({
	initialize:function(options){
		this.options = options || {};
		this.template = this.options.template;
		this.indexValue = this.options.indexValue;
		this.startValue = this.options.startValue;
		this.render();
	},
	render:function(){
		this.$el.html(_.template($(this.template).html())({data:this.model.attributes[0]}));
	},
	events :{
		"click .back-option":"showClassifiedsPage"
	},
	showClassifiedsPage:function(){
		var endValue = this.startValue+19;
		classifieds.listObj = new classified.listView({el:"#classifieds-container",template:"#ta-classified-list-base-tpl",model:classifieds.modelRef,startValue:this.startValue,endValue:endValue});
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
		if(this.model.attributes.allMyClassifieds.length<=20){
			$('.previous').hide();
			$('.next').hide();
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
			$('.all-classifieds-list').empty();
			var myClassifieds = new classified.myClassifiedsView({el:".all-classifieds-list",template:"#ta-classified-my-classifieds-tpl",model:this.model,startValue:this.startValue,endValue:this.endValue});
		}
		this.showButtons();
	},
	showPreviousClassifieds:function(){
		if(this.startValue-20>=0){
			this.startValue = this.startValue-20;
			this.endValue = this.endValue-20;
			$('.all-classifieds-list').empty();
			var myClassifieds = new classified.myClassifiedsView({el:".all-classifieds-list",template:"#ta-classified-my-classifieds-tpl",model:this.model,startValue:this.startValue,endValue:this.endValue});
		}
		this.showButtons();
	},
	showButtons:function(){
		if(sessionStorage.getItem("allClassifieds")!=null){
			if(this.endValue>=(JSON.parse(sessionStorage.getItem("allClassifieds")).allClassifieds.length)){
				$('.next').hide();
			} else {
				$('.next').show();
			}
			if(this.startValue==0){
				$('.previous').hide();
			} else {
				$('.previous').show();
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
		} else if(source.is("icons span")){
			/*var index = (source.parent('.my-classified-item').index())+1;*/
			return false;
		} else {
			var index = (source.parent('.my-classified-item').index());
		}
		var indexValue = (index+this.startValue);
		var startValue = this.startValue;
		/*alert(indexValue);*/
		$.ajax({
			type:"GET",
			url:"codebase/getClassifiedDetails.php",
			dataType:"JSON",
			data:{
				classifiedId : JSON.parse(sessionStorage.getItem("allMyClassifieds")).allMyClassifieds[indexValue].classifiedId
			},
			success:function(resp){
				console.log(resp);
				classified.myClassifiedDetailsObj = new classifieds.myClassifiedDetailsModel(resp);
				classified.myClassifiedDetailsViewObj = new classifieds.myClassifiedDetailsView({el:"#classifieds-container",template:"#ta-classified-details-tpl",model:classified.myClassifiedDetailsObj,indexValue:index,startValue:startValue});
			},
			error:function(resp){
				console.log(resp);
			}
		});
	},
	editClassified:function(e){
		var source=$(e.target);
		if(source.is(".icons span")){
			var index = (source.parents('.my-classified-item').index());
			var indexValue = (index+this.startValue);
		}
		$.ajax({
			type:"GET",
			url:"codebase/getClassifiedDetails.php",
			dataType:"JSON",
			data:{
				classifiedId : JSON.parse(sessionStorage.getItem("allMyClassifieds")).allMyClassifieds[indexValue].classifiedId
			},
			success:function(resp){
				console.log(resp);
				var postClassifiedObj = new classified.updateClassifiedView({el:"#classifieds-container",template:"#ta-classified-edit-classified-tpl",data:resp,index:indexValue,model:this.model});
			},
			error:function(resp){
				console.log(resp);
			}
		});
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
				var userHomePagePresenterObj = new classifieds.userHomePagePresenter();
				userHomePagePresenterObj.showMyClassifieds();
			},
			error:function(resp){
				console.log(resp);
			}
		});
	}
});
classified.updateClassifiedView = Backbone.View.extend({
	initialize:function(options){
		this.options = options || {};
		this.template = this.options.template;
		this.data = this.options.data;
		this.index = this.options.index;
		this.render();
	},
	render:function(){
		this.$el.html(_.template($(this.template).html())({data:this.data}));
		var value=$('.edit-categories-list').find('option[text="this.data[0].classifiedCategory"]').val();
		$(".edit-a-classified").prepend("<img class='back-option' src='images/back.png'/>");
		var category=$(".edit-categories-list-item").val(value);
		var description=$(".edit-heading-classified").val(this.data[0].classifiedHeading);
		var specification=$(".edit-specification").val(this.data[0].classifiedDesc);
		this.renderCategories();
	},
	renderCategories:function(){
		var categoriesObj = new classified.categoriesView({el:"#edit-categories-list",template:"#ta-classified-categories-list-tpl",model:categoriesRef});
	},
	events:{
		"click .submit-classified":"updateClassified",
		"click .back-option":"showClassifieds"
	},
	showClassifieds:function(){
		var userHomePagePresenterObj = new classifieds.userHomePagePresenter();
		userHomePagePresenterObj.showMyClassifieds();
	},
	updateClassified:function(){
		var categoryIndex = $("select option:selected").index();
		var category = $(".edit-categories-list-item option:selected").text();
		category = category.substr(0,1).toUpperCase()+category.substr(1);
		var heading = $(".edit-heading-classified").val();
		heading = heading.substr(0,1).toUpperCase()+heading.substr(1);
		var data = {
			queryStr : "updateClassified",
			classifiedId : JSON.parse(sessionStorage.getItem("allMyClassifieds")).allMyClassifieds[this.index].classifiedId,
			classifiedCategory : category,
			classifiedHeading : heading,
			classifiedDesc : $(".edit-description").val()
		};
		if($(".edit-categories-list-item").val()=="" && $(".edit-heading").val()=="" && $(".edit-description").val()==""){
			$(".error-text").html("Fields can't be empty");
		} else {
			$.ajax({
				type:"POST",
				url:"codebase/classifiedsData.php",
				dataType:"JSON",
				data:data,
				success:function(resp){
					console.log(resp);
					sessionStorage.setItem("index","1");
					sessionStorage.removeItem("allMyClassifieds");
					sessionStorage.removeItem("allClassifieds");
					var userHomePagePresenterObj = new classifieds.userHomePagePresenter();
					userHomePagePresenterObj.showMyClassifieds();
				},
				error:function(resp){
					alert("error");
				}
			});
		}
	}
});
classifieds.myClassifiedDetailsView = Backbone.View.extend({
	initialize:function(options){
		this.options = options || {};
		this.template = this.options.template;
		this.indexValue = this.options.indexValue;
		this.startValue = this.options.startValue;
		this.render();
	},
	render:function(){
		this.$el.html(_.template($(this.template).html())({data:this.model.attributes[0]}));
	},
	events :{
		"click .back-option":"showClassifiedsPage"
	},
	showClassifiedsPage:function(){
		var endValue = this.startValue+19;
		classifieds.listObj = new classified.myListView({el:"#classifieds-container",template:"#ta-classified-list-base-tpl",model:classifieds.modelRefObj,startValue:this.startValue,endValue:endValue});
	}
});
classified.postClassifiedView = Backbone.View.extend({
	initialize:function(options){
		this.options = options || {};
		this.template = this.options.template;
		this.render();
	},
	render:function(){
		this.$el.html(_.template($(this.template).html()));
		this.renderCategories();
	},
	renderCategories:function(){
		var categoriesObj = new classified.categoriesView({el:"#categories-list",template:"#ta-classified-categories-list-tpl",model:this.model});
	},
	events:{
		"click .submit-classified":"postClassified",
		"change input[type=file]":"prepareUpload"
	},
	prepareUpload:function(event){
		this.files = null;
     	this.files = event.target.files;
     	$.each(this.files, function(index, file){
      		alert(file.size);
     	});
    },
	postClassified:function(){
		var category = $("#categories-list option:selected").text();
		/*category = category.substr(0,1).toUpperCase()+category.substr(1);*/
		var heading = $(".heading-classified").val();
		heading = heading.substr(0,1).toUpperCase()+heading.substr(1);

		var data = new FormData();
		$.each(this.files, function(key, value){
			data.append(key, value);
		});
		data.append('empemail', sessionStorage.getItem("username"));
		data.append('classifiedCategory', category);
		data.append('classifiedHeading', heading);
		data.append('classifiedNegotiable', $("#negotiable option:selected").val());
		data.append('classifiedPrice', $(".price-classified").val());
		data.append('classifiedDesc', $(".specification").val());

		var classifiedData = {
			empemail : sessionStorage.getItem("username"),
			classifiedCategory : category,
			classifiedHeading : heading,
			classifiedNegotiable:$("#categories-list option:selected").text(),
			classifiedPrice:$(".price-classified").val(),
			classifiedDesc : $(".specification").val()
		};
		if($(".categories-list-item").val()=="" || $(".heading-classified").val()=="" || $(".specification").val()==""){
			$(".error-text").html("Fields can't be empty");
		} else {
			$.ajax({
				type:"POST",
				url:"codebase/postAClassified.php",
				dataType:"JSON",
				processData: false,
      			contentType: false,
				data:data,
				success:function(resp){
					var dataPresent = JSON.parse(sessionStorage.getItem("allClassifieds"));
					if(dataPresent!=null){
						dataPresent.allClassifieds.push(classifiedData);
						sessionStorage.setItem("allClassifieds",JSON.stringify(dataPresent));
					}
					var myClassifieds = JSON.parse(sessionStorage.getItem("allMyClassifieds"));
					if(myClassifieds!=null){
						myClassifieds.allMyClassifieds.push(classifiedData);
						sessionStorage.setItem("allMyClassifieds",JSON.stringify(myClassifieds));
					}
					sessionStorage.setItem("index","1");
					window.location = "#myclassifieds";
				},
				error:function(resp){
					console.log(resp);
				}
			});
		}
		if($(".category").val()!="" && $(".heading-classified").val()!="" && $(".description").val()!=""){
			
		} else {
			
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