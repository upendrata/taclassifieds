classified.loginPageView = Backbone.View.extend({
	initialize:function(options){
		this.options = options  || {};
		this.template = this.options.template;
		this.render();
	},
	render:function(){
		this.$el.html(_.template($(this.template).html()));
	},
	events:{
		"click .login-btn":"validateForm"
	},
	validateForm:function(){
		var data = {
			'username':$(".username").val(),
			'password':$(".password").val()
		}
		$.ajax({
			type:"POST",
			url:"codebase/validateUser.php",
			dataType:"JSON",
			data : data,
			/*beforeSend:function(){
				classifieds.Loader.show();
			},*/
			success:function(resp){
				sessionStorage.setItem("username", $(".username").val());
				$('.signin-links').addClass("hide");
				$('.logout-links').addClass('show');
				window.location = "#"+resp.url;
				$('.error-msg').empty();
			},
			error:function(e){
				$('.error-msg').html(e.responseJSON.responseText);
			}/*,
			complete:function(){
				classifieds.Loader.hide();
			}*/
		});
	}
});
