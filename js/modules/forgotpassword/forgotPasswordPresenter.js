var classifieds = classifieds || {};
classifieds.forgotPasswordPagePresenter = function(){
	return{
		showForgotPasswordPage:function(){
			if(sessionStorage.getItem("user")!=null){
				var data={
					queryStr:"validateUsername",
					empemail:sessionStorage.getItem("user")
				}
				$.ajax({
					type:"POST",
					url:"codebase/classifiedsData.php",
					dataType:"JSON",
					data:data,
					success:function(resp){
						classifieds.signUpPageRef = new classifieds.signUpModel(data.signup);
						classifieds.forgotpwdObj = new classified.forgotPwdView({el:"#page-container",template:"#ta-classified-forgot-password-tpl"});
					},
					error:function(resp){
						$(".error-msg").html(resp.responseJSON.responseText);
					}
				});
			} else {
				sessionStorage.setItem("errorMsg","Username is empty");
				window.location="#login";
			}
		}
	}
}