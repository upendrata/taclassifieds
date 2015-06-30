var classified = classified || {};

classified.postClassifiedView = Backbone.View.extend({
	initialize:function(options){
		this.options = options || {};
		this.template = this.options.template;
		this.render();
	},
	render:function(){
		this.$el.html(_.template($(this.template).html()));
		classified.postFormModelRef = new classifieds.postInformationModel();
		sessionStorage.setItem("dataVal",1);
		this.renderCategories();
	},
	renderCategories:function(){
		var categoriesObj = new classified.categoriesView({el:"#categories-list",template:"#ta-classified-categories-list-tpl",model:this.model});
		$(".category-label").hide();
	},
	events:{
		"click .submit-classified":"postClassified",
		"change input[type=file]":"prepareUpload",
		"change input[type=text]":"eventHandler",
		"change select": "eventHandler",
		"change textarea":"eventHandler",
		"click span":"showForm",
	},
	showForm:function(e){
		$(".classified-options span").removeClass("selected");
		$(e.currentTarget).addClass("selected");
		var dataVal = $(e.currentTarget).attr('data-val');
		sessionStorage.setItem("dataVal",dataVal);
		if(dataVal==1){
			classified.postFormModelRef = new classifieds.postInformationModel();
			var infotplObj = new classified.buttonTplView({el:".change-form",template:"#ta-classified-button-tpl"});
		} else if(dataVal==2){
			classified.postFormModelRef = new classifieds.postInformationImageModel();
			var infotplObj = new classified.infoTplView({el:".change-form",template:"#ta-classified-info-tpl"});
		} else {
			classified.postFormModelRef = new classifieds.postClassifiedFormModel();
			var pricetplObj = new classified.priceTplView({el:".change-form",template:"#ta-classified-add-price-tpl"});
		}
	},
	eventHandler : function(e){
		var obj = $(e.currentTarget);
		classified.postFormModelRef.set(obj.attr('name'), $.trim(obj.val()));
	},
	validateFields : function(){
		var errorMsg = [];
		$.each(classified.postFormModelRef.toJSON(), function(key, value){
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
     		errorMsg.push("imageslimit");
     	} else {
     		this.$el.find(".error-text").empty();
     		var val = 1024000;
	     	$.each(this.files, function(index, file){
	      		if(file.size/val>2){
	      			this.$el.find(".submit-classified").attr("disabled",true);
	      			this.$el.find(".error-text").html("file size can't be more than 2MB");
	      			errorMsg.push("imagesize");
	      		} else {
	      			$(".submit-classified").attr("disabled",false);
	      			$(".error-text").empty();
	      		}
	     	});
     	} 
    },
	postClassified:function(){
		var errorsList = this.validateFields(), self = this;
		var category = $("#categories-list option:selected").text();
		var heading = $(".heading-classified").val();
		heading = heading.substr(0,1).toUpperCase()+heading.substr(1);
		var dataVal=sessionStorage.getItem("dataVal");
		var isClassified=false,isInfoImg=false,isInfo=false;
		if(dataVal==3){
			isClassified=true;
		} else if(dataVal==1){
			isInfo=true;
		} else {
			isInfoImg=true;
		}
		/*var isInfoImg = $(".info-image").is(":checked"), isClassified = $(".classified").is(":checked"),isInfo = $(".info").is(":checked");*/
		if(isInfoImg || isClassified){
			var data = new FormData();
			if(this.files==null){
				var noImage=1;
			} else {
				$.each(this.files, function(key, value){
					data.append(key, value);
				});
			}
			data.append('empemail', sessionStorage.getItem("username"));
			data.append('classifiedCategory', isClassified ? category : "Information");
			data.append('classifiedHeading', heading);
			data.append('classifiedNegotiable', isClassified ? parseInt($("#negotiable option:selected").val()) : -1);
			data.append('classifiedPrice', isClassified ? parseFloat($(".price-classified").val()) : -1);
			data.append('classifiedDesc', $(".specification").val());	
			data.append('info',0);
		}
		
		if(isInfoImg || isClassified || isInfo){
			var classifiedData = {
				empemail : sessionStorage.getItem("username"),
				classifiedHeading : heading,
				classifiedDesc : $(".specification").val(),
				classifiedCategory : isClassified ? category : "Information",
				classifiedNegotiable : isClassified ?  $("#negotiable option:selected").val() : null,
				classifiedPrice : isClassified ? $(".price-classified").val() : null,
				info : isInfo ? 1 : false
			}
		}

		
		/*if($(".heading-classified").val()=="" && $(".specification").val()==""){
			this.$el.find(".error-text").html("Please enter all fields to post information");
		} else {*/
		if(errorsList.length === 0){
			if(dataVal==1){
				$.ajax({
					type:"POST",
					url:"codebase/postAClassified.php",
					dataType:"JSON",
					data:classifiedData,
					success:function(resp){
						classifiedData.classifiedId = resp.id;
						dataStorage(classifiedData);
					},
					error:function(resp){
						$(".error-text").html(resp.responseJSON.responseText);
					}
				});
			} else {
				if(noImage==1){
					$(".error-text").append("<ul><li>Images are not uploaded</li></ul>");
				} else {
					$.ajax({
						type:"POST",
						url:"codebase/postAClassified.php",
						dataType:"JSON",
						processData: false,
		      			contentType: false,
						data:data,
						success:function(resp){
							classifiedData.classifiedId = resp.id;
							dataStorage(classifiedData);
						},
						error:function(resp){
							$(".error-text").html(resp.responseJSON.responseText);
						}
					});
				}
			}
		} else{
			utils.buildErrors(errorsList, this.$el.find(".error-text"));
			$("html, body").animate({ scrollTop: 0 }, "slow");
		}
		function dataStorage(classifiedData){
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
		}
	}
});
classified.priceTplView = Backbone.View.extend({
	initialize:function(options){
		this.options = options  || {};
		this.template = this.options.template;
		this.render();
	},
	render:function(){
		this.$el.html(_.template($(this.template).html()));
		$(".category-label").show();
	}
});
classified.infoTplView = Backbone.View.extend({
	initialize:function(options){
		this.options = options  || {};
		this.template = this.options.template;
		this.render();
	},
	render:function(){
		this.$el.html(_.template($(this.template).html()));
		$(".category-label").hide();
	}
});
classified.buttonTplView = Backbone.View.extend({
	initialize:function(options){
		this.options = options  || {};
		this.template = this.options.template;
		this.render();
	},
	render:function(){
		this.$el.html(_.template($(this.template).html()));
		$(".category-label").hide();
	}
});
