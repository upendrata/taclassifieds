var classified = classified || {};
classified.loginPageView = Backbone.View.extend({
	initialize:function(options){
		this.options = options  || {};
		this.template = this.options.template;
		this.render();
	},
	render:function(){
		this.$el.html(_.template($(this.template).html())({data:this.model}));
		if(sessionStorage.getItem("registrationId")!=null){
			$(".signup-success-msg").show();
			sessionStorage.removeItem("registrationId");
		} else {
			$(".signup-success-msg").hide();
		}
		if(sessionStorage.getItem("changePwd")!=null){
			$(".password-change-text").show();
			sessionStorage.removeItem("changePwd");
			$(".username").html(sessionStorage.getItem("user"));
		} else {
			$(".password-change-text").hide();
		}
		$(".error-msg").html(sessionStorage.getItem("errorMsg"));
		sessionStorage.removeItem("errorMsg");
		sessionStorage.removeItem("user");
	},
	events:{
		"click .login-btn":"submitForm",
		"keyup .username":"storeData"
	},
	storeData:function(){
		sessionStorage.setItem("user",$(".username").val());
	},
	submitForm:function(){
		var data = {
			'queryStr':'loginValidate',
			'username':$(".username").val(),
			'password':$(".password").val()
		}
		if(data.username!="" && data.password!=""){
			$.ajax({
				type:"POST",
				url:"codebase/validateUser.php",
				dataType:"JSON",
				data : data,
				beforeSend:function(){
					classifieds.Loader.show();
				},
				success:function(resp){
					sessionStorage.setItem("username",data.username);
					classified.modelRef.set('isLoggedIn', true);
					window.location = "#myclassifieds";
					$('.error-msg').empty();
				},
				error:function(e){
					$('.error-msg').html(e.responseJSON.responseText);
					classifieds.Loader.hide();
				}
			});
		} else {
			if(data.username=="" && data.password==""){
				$('.error-msg').html("Username and password fields are empty");
			} else if(data.username==""){
				$('.error-msg').html("Username is empty");
			} else {
				$('.error-msg').html("Password is empty");
			}
		}
	}
});
