var classified = classified || {};

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
		"change input[type=file]":"prepareUpload",
		"change textarea":"eventHandler"
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

		var data = new FormData();
		if(this.files==null){
			$(".error-text").html("no files uploaded");
		} else {
			$.each(this.files, function(key, value){
				data.append(key, value);
			});
		}
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
				error:function(resp){
					$(".error-text").html(resp.responseJSON.responseText);
				}
			});
		} /*else{
			utils.buildErrors(errorsList, this.$el.find(".signup-error-msg"));
			$("html, body").animate({ scrollTop: 0 }, "slow");
		}*/
	}
});
