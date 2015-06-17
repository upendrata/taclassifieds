var classified = classified || {};
classified.loginPageView = Backbone.View.extend({
	initialize:function(options){
		this.options = options  || {};
		this.template = this.options.template;
		this.logFormModel = this.options.logFormModel;
		this.render();
	},
	render:function(){
		this.$el.html(_.template($(this.template).html())({data:this.model}));
		this.renderViews();
	},
	renderViews:function(){
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
		"keyup .username":"storeData",
		"change input":"eventHandler"
	},
	storeData:function(){
		sessionStorage.setItem("user",$(".username").val());
	},
	eventHandler:function(e){
		var obj = $(e.currentTarget);
		this.logFormModel.set(obj.attr('name'), $.trim(obj.val()));
	},
	validateFields : function(){
		var errorMsg = [];
		$.each(this.logFormModel.toJSON(), function(key, value){
			if(value === "" || value === null){
				errorMsg.push(key);
			}
		});
		return errorMsg;
	},
	submitForm:function(){
		var data = {
			'queryStr':'loginValidate',
			'username':$(".username").val(),
			'password':$(".password").val()
		}
		this.logFormModel.set('queryStr','loginValidate');
		var errorsList = this.validateFields(), self = this;
		if(errorsList.length === 0){
			this.logFormModel.save(null,{
				type:"POST",
				dataType:"JSON",
				beforeSend:function(){
					classifieds.Loader.show();
				},
				success:function(model,resp){
					sessionStorage.setItem("username",data.username);
					classified.modelRef.set('isLoggedIn', true);
					window.location = "#myclassifieds";
					$('.error-msg').empty();
				},
				error:function(model,resp){
					$('.error-msg').html(resp.responseJSON.responseText);
					classifieds.Loader.hide();
				}
			});
		} else {
			utils.buildErrors(errorsList, this.$el.find(".error-msg"));
			$("html, body").animate({ scrollTop: 0 }, "slow");
		}
	}
});
