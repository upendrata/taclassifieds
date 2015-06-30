var classifieds=classifieds || {};
classifieds.changePasswordPageView = Backbone.View.extend({
	initialize:function(options){
		this.options = options || {};
		this.template = this.options.template;
		this.render();
	},
	render:function(){
		this.$el.html(_.template($(this.template).html()));
	},
	events:{
		"click .change-pwd-btn":"changePassword"
	},
	changePassword:function(){
		var data={
			'queryStr':'changePassword',
			empemail:sessionStorage.getItem("username"),
			empoldpassword:$(".current-password").val(),
			empnewpassword : $(".new-password").val()
		}
		var confirmPwd=$('.confirm-pwd').val();
		if(data.empnewpassword=="" || data.empoldpasswor=="" || confirmPwd==""){
			$(".error-txt").html("Please enter all the data");
		} else {
			if(data.empnewpassword==confirmPwd){
				$.ajax({
					type:"POST",
					url:"codebase/classifiedsData.php",
					dataType:"JSON",
					data:data,
					success:function(resp){
						$(".error-txt").addClass("success").html(resp.responseText);
						setTimeout( function(){ 
					    	window.location="#myclassifieds";
					  	}  , 1000 );
						
					},
					error:function(resp){
						$(".error-txt").html(resp.responseJSON.responseText);
					}
				});
			} else {
				$(".error-txt").html("Passwords are not equal");
			}
		}
	}
});