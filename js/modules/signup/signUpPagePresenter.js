var classifieds = classifieds || {};
classifieds.signUpPagePresenter = function(){
	return{
		showSignUpPage: function(){
			var signUpPageObj = new classified.signUpPageView({el:"#page-container",template:"#ta-classified-signup-tpl",model:signUpPageRef});
			/*$.ajax({
				type:"GET",
				url:"codebase/getSecurityQuestionsList.php",
				dataType:"JSON",
				success:function(resp){
					var securityQuestionsobj = new securityQuestionsListCollection(resp);
					var signUpPageObj = new classified.signUpPageView({el:"#page-container",template:"#ta-classified-signup-tpl",model:securityQuestionsobj});
				},
				error:function(resp){
					alert("error");
				}
			});*/
		}
	}
}