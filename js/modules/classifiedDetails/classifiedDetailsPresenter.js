var classifieds = classifieds || {};
classifieds.classifiedDetailsPresenter = function(){
	function renderClassifieds(){
		classifieds.homePageObj = new classified.userHomePageView({el:"#page-container",template:"#ta-classified-user-base-tpl"});
		if(sessionStorage.getItem("username")!=null){
			classifieds.menuObj = new classified.menuView({el:"#menu",template:"#ta-classified-menu-tpl"});
		}
		if(classified.classifiedDetailsObj==null){
			var classifiedDetails = JSON.parse(sessionStorage.getItem('classifiedDetails'));
			classified.classifiedDetailsObj = new classifieds.classifiedDetailsModel(classifiedDetails);
			classified.classifiedDetailsViewObj = new classifieds.classifiedDetailsView({el:"#classifieds-container",template:"#ta-classified-details-tpl",model:classified.classifiedDetailsObj});
		} else {
			classified.classifiedDetailsViewObj = new classifieds.classifiedDetailsView({el:"#classifieds-container",template:"#ta-classified-details-tpl",model:classified.classifiedDetailsObj});
		}
	}
	return{
		showClassifiedDetails: function(){
			$.ajax({
				type:"GET",
				url:"codebase/getClassifiedDetails.php",
				dataType:"JSON",
				data:{
					classifiedId : sessionStorage.getItem("id")
				},
				success:function(resp){
					classified.classifiedDetailsObj = new classifieds.classifiedDetailsModel(resp);
					sessionStorage.setItem("classifiedDetails",JSON.stringify(classified.classifiedDetailsObj));
					renderClassifieds();
				},
				error:function(resp){
					$("#classifieds-container").prepend(resp.responseJSON.responseText);
				}
			});
		}
	}
}