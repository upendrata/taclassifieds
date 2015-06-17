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
		/*alert(indexValue);*/
		$.ajax({
			type:"GET",
			url:"codebase/getClassifiedDetails.php",
			dataType:"JSON",
			data:{
				classifiedId : id
			},
			success:function(resp){
				console.log(resp);
				classified.classifiedDetailsObj = new classifieds.classifiedDetailsModel(resp);
				sessionStorage.setItem("classifiedDetails",JSON.stringify(classified.classifiedDetailsObj));
				window.location="#classified/:"+id;
			},
			error:function(resp){
				console.log(resp);
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
		} else if(source.is("icons span")){
			return false;
		} else {
			var index = (source.parent('.my-classified-item').index());
		}
		var indexValue = (index+this.startValue);
		var startValue = this.startValue;
		var id=JSON.parse(sessionStorage.getItem("allMyClassifieds")).allMyClassifieds[indexValue].classifiedId;
		/*alert(indexValue);*/
		$.ajax({
			type:"GET",
			url:"codebase/getClassifiedDetails.php",
			dataType:"JSON",
			data:{
				classifiedId : id
			},
			success:function(resp){
				console.log(resp);
				classified.classifiedDetailsObj = new classifieds.classifiedDetailsModel(resp);
				sessionStorage.setItem("classifiedDetails",JSON.stringify(classified.classifiedDetailsObj));
				window.location="#classified/:"+id;
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
		this.$el.find(".edit-a-classified").prepend("<img class='back-option' src='images/back.png'/>");
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
			this.$el.find(".error-text").html("Fields can't be empty");
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
		this.postFormModel = this.options.postFormModel;
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
		"change input[type=file]":"prepareUpload",
		"change input":"eventHandler",
		"change select":"eventHandler",
		"change textarea":"eventHandler"
	},
	eventHandler : function(e){
		var obj = $(e.currentTarget);
		this.postFormModel.set(obj.attr('name'), $.trim(obj.val()));
	},
	validateFields : function(){
		var errorMsg = [];
		$.each(this.postFormModel.toJSON(), function(key, value){
			if(value === "" || value === null){
				errorMsg.push(key);
			}
		});
		return errorMsg;
	},
	prepareUpload:function(event){
		this.files = null;
     	this.files = event.target.files;
     	if(this.files.length>5){
     		this.$el.find(".submit-classified").attr("disabled",true);
     		this.$el.find(".error-text").html("Can't Select more than 5 images");
     	} else {
     		var val = 1024000;
	     	$.each(this.files, function(index, file){
	      		if(file.size/val>2){
	      			this.$el.find(".submit-classified").attr("disabled",true);
	      			this.$el.find(".error-text").html("file size can't be more than 2MB");
	      		} else {
	      			this.$el.find(".submit-classified").attr("disabled",false);
	      			this.$el.find(".error-text").empty();
	      		}
	     	});
     	}
    },
	postClassified:function(){
		var category = $("#categories-list option:selected").text();
		var heading = $(".heading-classified").val();
		heading = heading.substr(0,1).toUpperCase()+heading.substr(1);
		if(this.files==null){
			this.$el.find(".error-text").html("no files uploaded");
		} else {
			$.each(this.files, function(key, value){
				this.postFormModel.set(key, value);
			});
		}
		var classifiedData = {
			empemail : sessionStorage.getItem("username"),
			classifiedCategory : category,
			classifiedHeading : heading,
			classifiedNegotiable:$("#categories-list option:selected").text(),
			classifiedPrice:$(".price-classified").val(),
			classifiedDesc : $(".specification").val()
		};

		var errorsList = this.validateFields(),self=this;
		if(errorsList.length === 0){
			this.postFormModel.save(null,{
				type:"POST",
				dataType:"JSON",
				processData: false,
      			contentType: false,
				success:function(model,resp){
					classifiedData.classifiedId = resp.id;
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
				error:function(model,resp){
					console.log(resp);
				}
			});
		} else{
			utils.buildErrors(errorsList, this.$el.find(".signup-error-msg"));
			$("html, body").animate({ scrollTop: 0 }, "slow");
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