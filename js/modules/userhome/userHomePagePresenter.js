var classifieds = classifieds || {};
classifieds.userHomePagePresenter = function(){
	function allClassifieds(resp){
		classifieds.modelRef = new classifieds.allClasifiedsPageModel();
		classifieds.modelRef.set(classifieds.modelRef.parse(resp));
		renderViews();
		classifieds.listObj = new classified.listView({el:"#classifieds-container",template:"#ta-classified-list-base-tpl",model:classifieds.modelRef,startValue:0,endValue:19});
		sessionStorage.setItem("allClassifieds",JSON.stringify(classifieds.modelRef));
	}
	function myClassifieds(resp){
		classifieds.modelRefObj = new classifieds.myClasifiedsPageModel();
		classifieds.modelRefObj.set(classifieds.modelRefObj.parse(resp));
		renderViews();
		classifieds.mylistObj = new classified.myListView({el:"#classifieds-container",template:"#ta-classified-list-base-tpl",model:classifieds.modelRefObj,startValue:0,endValue:19});
		sessionStorage.setItem("allMyClassifieds",JSON.stringify(classifieds.modelRefObj));
	}
	function renderViews(){
		classifieds.homePageObj = new classified.userHomePageView({el:"#page-container",template:"#ta-classified-user-base-tpl"});
		if(sessionStorage.getItem("username")!=null){
			classifieds.menuObj = new classified.menuView({el:"#menu",template:"#ta-classified-menu-tpl"});
		}
		selectedListItem();
	}
	function selectedListItem(){
		$('.options a.highlight').removeClass();
		var index = sessionStorage.getItem("index");
		if(index==null){
			$('.options a').eq(1).addClass("highlight");
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
						console.log(resp);
						allClassifieds(resp);
					},
					error:function(resp){
						renderViews();
						$('#classifieds-container').html("<div class='response'></div>");
						$('#classifieds-container div').html(resp.responseJSON.responseText);
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
					data :data,
					beforeSend:function(){
						classifieds.Loader.show();
					},
					success:function(resp){
						myClassifieds(resp);
					},
					error:function(resp){
						classifieds.Loader.hide();
						renderViews();
						$('#classifieds-container').html("<div class='response'></div>");
						$('#classifieds-container div').html(resp.responseJSON.responseText);
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
			renderViews();
			var postClassifiedObj = new classified.postClassifiedView({el:"#classifieds-container",template:"#ta-classified-post-classified-tpl",model:categoriesRef});		
		}
	}
}