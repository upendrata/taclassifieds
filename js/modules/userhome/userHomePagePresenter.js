var classifieds = classifieds || {};
classifieds.userHomePagePresenter = function(){
	return{
		showUserHomePage: function(){
			if(sessionStorage.getItem("allClassifieds")==null){
				var homePageModelObj = new classifiedModel();
				homePageModelObj.fetch({
					type:"GET",
					url:"codebase/getAllClassifieds.php",
					dataType:"JSON",
					success:function(resp){
						console.log(resp);
						sessionStorage.setItem("allClassifieds",JSON.stringify(resp));
						var allClassifiedsObj = new allClassifiedCollection(JSON.parse(sessionStorage.getItem("allClassifieds")));
						var userHomePageObj = new classified.userHomePageView({el:"#page-container",template:"#ta-classified-user-home-tpl",model:allClassifiedsObj});
						var allClassifieds = new classified.allClassifiedsView({el:".all-classifieds-list",template:"#ta-classified-all-classifieds-tpl",model:allClassifiedsObj});
					},
					error:function(resp){
						alert("error");
					}
				});
			} else {
				var allClassifiedsObj = new allClassifiedCollection(JSON.parse(sessionStorage.getItem("allClassifieds")));
				var userHomePageObj = new classified.userHomePageView({el:"#page-container",template:"#ta-classified-user-home-tpl",model:allClassifiedsObj});
				var allClassifieds = new classified.allClassifiedsView({el:".all-classifieds-list",template:"#ta-classified-all-classifieds-tpl",model:allClassifiedsObj});
			}
		},
		showMyClassifieds:function(){
			if(sessionStorage.getItem("myClassifieds")==null){
				var myClassifiedObj = new myClassifiedsModel();
				myClassifiedObj.fetch({
					type:"POST",
					url:"codebase/getAllMyClassifieds.php",
					dataType:"JSON",
					data :{
							empemail:sessionStorage.getItem("username")
						},
					success:function(resp){
						console.log(resp);
						sessionStorage.setItem("myClassifieds",JSON.stringify(resp));
						var myClassifiedsObj = new myClassifiedCollection(JSON.parse(sessionStorage.getItem("myClassifieds")));
						var userHomePageObj = new classified.userHomePageView({el:"#page-container",template:"#ta-classified-user-home-tpl",model:myClassifiedsObj});
						var allClassifieds = new classified.allClassifiedsView({el:".all-classifieds-list",template:"#ta-classified-my-classifieds-tpl",model:myClassifiedsObj});
					},
					error:function(resp){
						alert("error");
					}
				});
			} else {
				var myClassifiedsObj = new myClassifiedCollection(JSON.parse(sessionStorage.getItem("myClassifieds")));
				var userHomePageObj = new classified.userHomePageView({el:"#page-container",template:"#ta-classified-user-home-tpl",model:myClassifiedsObj});
				var allClassifieds = new classified.allClassifiedsView({el:".all-classifieds-list",template:"#ta-classified-my-classifieds-tpl",model:myClassifiedsObj});
			}
		},
		showClassifiedForm:function(){
			var userHomePageObj = new classified.userHomePageView({el:"#page-container",template:"#ta-classified-user-home-tpl"});
			var postClassifiedObj = new classified.postClassifiedView({el:".user-home-page",template:"#ta-classified-post-classified-tpl"});		
		}
	}
}