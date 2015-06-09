var classifed = classified || {};
classified.signUpPageView = Backbone.View.extend({
	initialize:function(options){
		this.options = options ||  {};
		this.template = this.options.template;
		this.render();
	},
	render:function(){
		this.$el.html(_.template($(this.template).html())({data:this.model}));
		this.renderQuestionsList();
	},
	renderQuestionsList:function(){
		var questionsListObj = new classified.securityQuestionsListView({el:".security-questions",template:"#ta-classifieds-security-questions-tpl",model:this.model});
	},
	events:{
		"click .sign-up-btn":"addClassifiedUser"
	},
	addClassifiedUser:function(){
		var data ={
			empid:$('.empid').val(),
			empname:$('.empname').val(),
			empemail:$('.empemail').val(),
			emppassword:$('.emppassword').val(),
			empquestion:$('#selected-question').val(),
			empqans:$('.security-question-answer').val()
		}

		var email = data.empemail;
		var atpos = email.indexOf("@techaspect");
		var dotpos = email.lastIndexOf(".com");
		if(email==""){
			$(".signup-error-msg").html("enter email address");
		} else if ((atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length)) {
	    	$(".signup-error-msg").html("Not a valid e-mail address");
		} else {
			$(".signup-error-msg").html("");
		}

		if((data.empid && data.empname && data.empemail && data.emppassword && data.empqans != "") && (data.emppassword==$(".confirm-password").val())){
			$.ajax({
				type:"POST",
				url:"codebase/addUser.php",
				dataType:"JSON",
				data:data,
				success:function(resp){
					window.location = resp.url;
					sessionStorage.setItem("registrationId",true);
				},
				error:function(resp){
					console.log(resp);
					$(".signup-error-msg").html(resp.responseJSON.responseText);
				}
			});
		}
		else {
			$(".signup-error-msg").html("Fields cannot be empty..!!!! Not able to save in DB..!!!");
		}
	}
});
classified.securityQuestionsListView = Backbone.View.extend({
	initialize:function(options){
		this.options = options || {};
		this.template = this.options.template;
		this.render();
	},
	render:function(){
		var self=this;
		$.each(this.model.get("securityques"),function(index,questionsList){
			self.$el.append(_.template($(self.template).html())({listItem:questionsList}));
		});
	}
});