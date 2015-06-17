var classified = classified || {};
classified.forgotPwdView = Backbone.View.extend({
	initialize:function(options){
		this.options = options  || {};
		this.template = this.options.template;
		this.render();
	},
	render:function(){
		this.$el.html(_.template($(this.template).html()));
		this.renderSecurityQues();
	},
	renderSecurityQues:function(){
		var questionsListObj = new classified.securityQuesListView({el:".security-ques",template:"#ta-classifieds-security-questions-tpl",data:data.signup});
	},
	events :{
		"keypress .security-ans":"showContinueButton",
		"click .continue":"showForm",
		"click .change-pwd":"changePassword",
		"keyup .confirm-pwd":"showChangePwdButton"
	},
	showContinueButton:function(){
		if($(".security-ques option:selected").length!=null && $(".security-ans").val().length>=2 && classified.buttonObj==null){
			classified.buttonObj = new classified.buttonView({el:".forgot-pwd-form",template:'#ta-classified-continue-button-tpl'});
		} else if($(".security-ans").val().length<=1){
			$('.continue').remove();
			classified.buttonObj=null;
		} else {}

	},
	showForm:function(){
		var data={
			queryStr:"forgotPassword",
			empemail:sessionStorage.getItem("user"),
			empquestion:$(".security-ques option:selected").val(),
			empqans:$(".security-ans").val()
		};
		$.ajax({
			type:"POST",
			url:"codebase/classifiedsData.php",
			dataType:"JSON",
			data:data,
			success:function(resp){
				$(".forgot-pwd-error-msg").empty();
				$(".forgot-pwd-form>input").attr("disabled",true);
				$(".forgot-pwd-form>select").attr("disabled",true);
				var formObj = new classified.changePasswordFormView({el:".forgot-pwd-form",template:"#ta-classified-change-password-tpl"});
			},
			error:function(resp){
				$(".forgot-pwd-error-msg").show();
				$(".forgot-pwd-error-msg").html(resp.responseJSON.responseText);
			}
		});
	},
	showChangePwdButton:function(){
		if($(".new-pwd").val()==$(".confirm-pwd").val()){
			$(".password-error-msg").empty();
			classified.changePwdObj = new classified.changePwdButtonView({el:".forgot-pwd-form",template:"#ta-classified-change-pwd-button-tpl"});
		} else {
			$(".change-pwd").remove();
			classified.changePwdObj=null;
			$(".change-pwd").fadeOut(100);
			$(".password-error-msg").show();
			$(".password-error-msg").html("Passwords are not equal");
		}
	},
	changePassword:function(){
		var data={
			queryStr:"updatePassword",
			empemail:sessionStorage.getItem("user"),
			emppassword:$(".new-pwd").val()
		};
		$.ajax({
			type:"POST",
			url:"codebase/classifiedsData.php",
			dataType:"JSON",
			data:data,
			success:function(resp){
				sessionStorage.setItem("changePwd","true");
				sessionStorage.removeItem("user");
				window.location = "#login";
			},
			error:function(resp){
				$(".forgot-pwd-error-msg").html(resp.responseJSON.responseText);
			}
		});
	}
});
classified.securityQuesListView = Backbone.View.extend({
	initialize:function(options){
		this.options = options  || {};
		this.template = this.options.template;
		this.data = this.options.data;
		this.render();
	},
	render:function(){
		var self=this;
		$.each(self.data.securityques,function(index,questionsList){
			self.$el.append(_.template($(self.template).html())({listItem:questionsList}));
		});
	}
});
classified.buttonView = Backbone.View.extend({
	initialize:function(options){
		this.options = options || {};
		this.template = this.options.template;
		this.render();
	},
	render:function(){
		this.$el.append(_.template($(this.template).html()));
	}
});
classified.changePasswordFormView = Backbone.View.extend({
	initialize:function(options){
		this.options = options || {};
		this.template = this.options.template;
		this.render();
	},
	render:function(){
		this.$el.append(_.template($(this.template).html()));
	}
});
classified.changePwdButtonView = Backbone.View.extend({
	initialize:function(options){
		this.options = options || {};
		this.template = this.options.template;
		this.render();
	},
	render:function(){
		this.$el.append(_.template($(this.template).html()));
	}
});