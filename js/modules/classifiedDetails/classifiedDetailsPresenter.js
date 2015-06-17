var classifieds = classifieds || {};
classifieds.classifiedDetailsPresenter = function(){
	return{
		showClassifiedDetails: function(){
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
	}
}