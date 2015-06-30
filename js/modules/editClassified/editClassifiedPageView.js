var classified=classified || {};
classified.updateClassifiedView = Backbone.View.extend({
	initialize:function(options){
		this.options = options || {};
		this.template = this.options.template;
		this.index = this.options.index;
		this.render();
	},
	render:function(){
		this.$el.html(_.template($(this.template).html())({model:this.model}));
		if(classified.classifiedDetails.attributes[0].classifiedImgs.length!=0 && classified.classifiedDetails.attributes[0].classifiedCategory=="Information"){
			var infotplObj = new classified.imageView({el:".change-edit-form",template:"#ta-classified-image-upload-tpl"});
			sessionStorage.setItem("edit","infoImage");
		} else if(classified.classifiedDetails.attributes[0].classifiedCategory!="Information"){
			var pricetplObj = new classified.priceView({el:".change-edit-form",template:"#ta-classified-edit-price-tpl"});
			sessionStorage.setItem("edit","classified");
		} else {
			$(".edit-category").hide();
			sessionStorage.setItem("edit","info");
		}
		this.$el.find(".edit-a-classified").prepend("");
		var description=$(".edit-heading-classified").val(classified.classifiedDetails.attributes[0].classifiedHeading);
		var price = $(".edit-price-classified").val(classified.classifiedDetails.attributes[0].classifiedPrice);
		var specification=$(".edit-specification").val(classified.classifiedDetails.attributes[0].classifiedDesc);
		var negotaible = $("#edit-negotiable").val(classified.classifiedDetails.attributes[0].classifiedNegotiable);
		var negotaible=$("#edit-negotiable").attr('selectedIndex', classified.classifiedDetails.attributes[0].classifiedNegotiable);
		this.renderCategories();
	},
	renderCategories:function(){
		var categoriesObj = new classified.categoriesView({el:"#edit-categories-list",template:"#ta-classified-categories-list-tpl",model:categoriesRef});
		var theText = classified.classifiedDetails.attributes[0].classifiedCategory;
		$("#edit-categories-list option:contains(" + theText + ")").prop('selected', 'selected');
	},
	events:{
		"click .submit-classified":"updateClassified",
		"click .back-option":"showClassifieds",
		"change input[type=file]":"prepareUpload",
		"change input":"eventHandler",
		"change select": "eventHandler",
		"change textarea":"eventHandler",
	},
	prepareUpload:function(event){
		this.files = null;
     	this.files = event.target.files;
     	if(this.files.length>5){
     		$(".submit-classified").attr("disabled",true);
     		$(".error-text").html("Can't Select more than 5 images");
     	} else {
     		var val = 1024000;
	     	$.each(this.files, function(index, file){
	      		if(file.size/val>2){
	      			$(".submit-classified").attr("disabled",true);
	      			$(".error-text").html("file size can't be more than 2MB");
	      		} else {
	      			$(".submit-classified").attr("disabled",false);
	      			$(".error-text").empty();
	      		}
	     	});
     	}
	},
	showClassifieds:function(){
		window.location = "#myclassifieds";
	},
	updateClassified:function(){
		var categoryIndex = $(".edit-categories-list option:selected").index();
		var category = $("#edit-categories-list option:selected").text();
		var heading = $(".edit-heading-classified").val();
		heading = heading.substr(0,1).toUpperCase()+heading.substr(1);
		var negotiable = $("#edit-negotiable option:selected").val();
		var type = sessionStorage.getItem("edit");
		var isClassified;
		if(type=="infoImage"){
			isClassified=false;
		} else if(type=="classified"){
			isClassified=true;
		}
		var data = new FormData(),postData;
		if(type=="infoImage" || type=="classified"){
			if(this.files==null){
				var images=0;
				postData=false;
			} else {
				$.each(this.files, function(key, value){
					data.append(key, value);
				});
			}
			data.append('queryStr',"updateClassified");
			data.append('classifiedId',sessionStorage.getItem("edit-classified-id"));
			data.append('classifiedCategory', isClassified ? category : "Information");
			data.append('classifiedHeading', heading);
			data.append('classifiedNegotiable',  isClassified ? $("#edit-negotiable option:selected").val() : -1);
			data.append('classifiedPrice', isClassified? $(".edit-price-classified").val(): -1);
			data.append('classifiedDesc', $(".edit-specification").val());
			data.append('info', 0);
		} else {
			data.append('queryStr',"updateClassified");
			data.append('classifiedId',sessionStorage.getItem("edit-classified-id"));
			data.append('classifiedCategory', "Information");
			data.append('classifiedHeading', heading);
			data.append('classifiedNegotiable', null);
			data.append('classifiedPrice',null);
			data.append('classifiedDesc', $(".edit-specification").val());
			data.append('info', 1);
		}
		if(type=="infoImage" || type=="classified"){
			if($(".edit-heading-classified").val()=="" || $(".edit-specification").val()==""){
				$(".error-text").html("<ul><li>Please enter all the data</li></ul>");
			}else if(images==0){
				$(".error-text").append("<ul><li>Select Images</li></ul>");
			} else {
				$.ajax({
					type:"POST",
					url:"codebase/classifiedsData.php",
					dataType:"JSON",
					processData: false,
	      			contentType: false,
					data:data,
					success:function(resp){
						console.log(resp);
						sessionStorage.setItem("index","1");
						sessionStorage.removeItem("allMyClassifieds");
						sessionStorage.removeItem("allClassifieds");
						window.location = "#myclassifieds";
					},
					error:function(resp){
						$(".error-text").html(resp.responseJSON.responseText);
					}
				});
			}
		} else {
			if($(".edit-heading-classified").val()=="" || $(".edit-specification").val()==""){
				$(".error-text").html("<ul><li>Please enter the proper data</li></ul>");
			} else {
				$.ajax({
					type:"POST",
					url:"codebase/classifiedsData.php",
					dataType:"JSON",
					processData: false,
	      			contentType: false,
					data:data,
					success:function(resp){
						console.log(resp);
						sessionStorage.setItem("index","1");
						sessionStorage.removeItem("allMyClassifieds");
						sessionStorage.removeItem("allClassifieds");
						window.location = "#myclassifieds";
					},
					error:function(resp){
						$(".error-text").html(resp.responseJSON.responseText);
					}
				});
			}
		}
	}
});
classified.priceView = Backbone.View.extend({
	initialize:function(options){
		this.options = options  || {};
		this.template = this.options.template;
		this.render();
	},
	render:function(){
		this.$el.html(_.template($(this.template).html()));
	}
});
classified.imageView = Backbone.View.extend({
	initialize:function(options){
		this.options = options  || {};
		this.template = this.options.template;
		this.render();
	},
	render:function(){
		this.$el.html(_.template($(this.template).html()));
		$(".edit-category").hide();
	}
});
