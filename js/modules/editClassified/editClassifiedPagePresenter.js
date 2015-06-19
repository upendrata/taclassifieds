var classifieds = classifieds || {};
classifieds.editClassifiedPagePresenter = function(){
	function renderEditClassifiedForm(){
		classifieds.homePageObj = new classified.userHomePageView({el:"#page-container",template:"#ta-classified-user-base-tpl"});
		if(sessionStorage.getItem("username")!=null){
			classifieds.menuObj = new classified.menuView({el:"#menu",template:"#ta-classified-menu-tpl"});
		}
		if(classified.classifiedDetails==null){
			var classifiedDetails = JSON.parse(sessionStorage.getItem('editClassifiedDetails'));
			classified.classifiedDetails = new classifieds.editClassifiedModel(classifiedDetails);
			var postClassifiedObj = new classified.updateClassifiedView({el:"#classifieds-container",template:"#ta-classified-edit-classified-tpl",model:classified.classifiedDetails,model:this.model});
		} else {
			var postClassifiedObj = new classified.updateClassifiedView({el:"#classifieds-container",template:"#ta-classified-edit-classified-tpl",model:classified.classifiedDetails,model:this.model});
		}
	}
	return{
		updateClassified: function(){
			$.ajax({
				type:"GET",
				url:"codebase/getClassifiedDetails.php",
				dataType:"JSON",
				data:{
					classifiedId : sessionStorage.getItem("edit-classified-id")
				},
				success:function(resp){
					classified.classifiedDetails = new classifieds.editClassifiedModel(resp);
					sessionStorage.setItem("editClassifiedDetails",JSON.stringify(classified.classifiedDetails));
					renderEditClassifiedForm();
				},
				error:function(resp){
					$("#classifieds-container").prepend(resp.responseJSON.responseText);
				}
			});
		}
	}
}