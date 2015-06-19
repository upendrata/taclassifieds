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
		"change input[type=file]":"prepareUpload"
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

		var data = new FormData();
		if(this.files==null){
			$(".error-text").html("no files uploaded");
		} else {
			$.each(this.files, function(key, value){
				data.append(key, value);
			});
		}
		data.append('queryStr',"updateClassified");
		data.append('classifiedId',sessionStorage.getItem("edit-classified-id"));
		data.append('classifiedCategory', category);
		data.append('classifiedHeading', heading);
		data.append('classifiedNegotiable', negotiable);
		data.append('classifiedPrice', $(".edit-price-classified").val());
		data.append('classifiedDesc', $(".edit-specification").val());

		if($(".edit-categories-list-item").val()=="" && $(".edit-heading").val()=="" && $(".edit-description").val()==""){
			this.$el.find(".error-text").html("Fields can't be empty");
		} else {
			$.ajax({
				type:"POST",
				url:"codebase/classifiedsData.php",
				dataType:"JSON",
				processData: false,
      			contentType: false,
				data:data,
				success:function(resp){
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
});
