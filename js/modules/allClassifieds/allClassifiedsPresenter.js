var classifieds = classifieds || {};
classifieds.allClassifiedsPagePresenter = function(){
	function allClassifieds(resp){
		classifieds.modelRef = new classifieds.allClasifiedsPageModel();
		classifieds.modelRef.set(classifieds.modelRef.parse(resp));
		renderViews();
		classifieds.listObj = new classified.listView({el:"#classifieds-container",template:"#ta-classified-list-base-tpl",model:classifieds.modelRef,startValue:0,endValue:19});
		sessionStorage.setItem("allClassifieds",JSON.stringify(classifieds.modelRef));
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
		showAllClassifieds: function(){
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
		}
	}
}