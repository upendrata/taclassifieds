var classifieds = classifieds || {};
classifieds.userHomePagePresenter = function(){
	function allClassifieds(resp){
		var modelRef = new classifieds.allClasifiedsPageModel();
		modelRef.set(modelRef.parse(resp));
		bindViews();
		classifieds.listObj = new classified.listView({el:"#classifieds-container",template:"#ta-classified-list-base-tpl",model:modelRef});
		sessionStorage.setItem("allClassifieds",JSON.stringify(modelRef));
	}
	function myClassifieds(resp){
		var modelRefObj = new classifieds.myClasifiedsPageModel();
		modelRefObj.set(modelRefObj.parse(resp));
		bindViews();
		classifieds.listObj = new classified.myListView({el:"#classifieds-container",template:"#ta-classified-list-base-tpl",model:modelRefObj});
		sessionStorage.setItem("allMyClassifieds",JSON.stringify(modelRefObj));
	}
	function bindViews(){
		if(classifieds.homePageObj==null){
			classifieds.homePageObj = new classified.userHomePageView({el:"#page-container",template:"#ta-classified-user-base-tpl"});
			classifieds.menuObj = new classified.menuView({el:"#menu",template:"#ta-classified-menu-tpl"});
		}	
		selectedListItem();
	}
	function selectedListItem(){
		$('.options a.highlight').removeClass();
		var index = sessionStorage.getItem("index");
		if(index==null){
			$('.options a').eq(0).addClass("highlight");
		} else {
			$('.options a').eq(index).addClass("highlight");
		}
	}
	return{
		showUserHomePage: function(){
			var allClassifiedsData = sessionStorage.getItem("allClassifieds");
			if(allClassifiedsData==null){
				$.ajax({
					type:"GET",
					url:"codebase/getAllClassifieds.php",
					dataType:"JSON",
					beforeSend:function(){
						classifieds.Loader.show();
					},
					success:function(resp){
						allClassifieds(resp);
					},
					error:function(resp){
						console.log(resp);
					},
					complete:function(){
						classifieds.Loader.hide();
					}
				});
			} else {
				allClassifieds(JSON.parse(allClassifiedsData));
			}
		},
		showMyClassifieds:function(){
			var allMyClassifiedsData = sessionStorage.getItem("allMyClassifieds");
			var data ={
				empemail:sessionStorage.getItem("username")
			}
			if(allMyClassifiedsData==null){
				$.ajax({
					type:"POST",
					url:"codebase/getAllMyClassifieds.php",
					dataType:"JSON",
					data :{
						empemail:sessionStorage.getItem("username")
					},
					beforeSend:function(){
						classifieds.Loader.show();
					},
					success:function(resp){
						myClassifieds(resp);
					},
					error:function(resp){
						alert("error");
					},
					complete:function(){
						classifieds.Loader.hide();
					}
				});
			} else {
				myClassifieds(JSON.parse(allMyClassifiedsData));
			}
		},
		showClassifiedForm:function(){
			bindViews();
			var postClassifiedObj = new classified.postClassifiedView({el:"#classifieds-container",template:"#ta-classified-post-classified-tpl"});		
		}
	}
}
