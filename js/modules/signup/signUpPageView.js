var classifed = classified || {};
classified.signUpPageView = Backbone.View.extend({
	initialize:function(options){
		this.options = options ||  {};
		this.template = this.options.template;
		this.formModel = this.options.formModel;
		this.render();
	},
	render:function(){
		this.$el.html(_.template($(this.template).html())({data:this.model}));
		this.renderQuestionsList();
	},
	renderQuestionsList:function(){
		var questionsListObj = new classified.securityQuestionsListView({el:".security-questions",template:"#ta-classifieds-security-questions-tpl", model:this.model});
	},
	events:{
		"click .sign-up-btn":"addClassifiedUser",
		"change input":"eventHandler",
		"change select": "eventHandler"
	},
	eventHandler : function(e){
		var obj = $(e.currentTarget);
		this.formModel.set(obj.attr('name'), $.trim(obj.val()));
	},
	validateFields : function(){
		var errorMsg = [];
		$.each(this.formModel.toJSON(), function(key, value){
			if(value === "" || value === null){
				errorMsg.push(key);
			}
		});
		if(this.formModel.get('empconfpassword') !== this.formModel.get('emppassword')){
			errorMsg.push("passwordsnotmatch");
		}
		return errorMsg;
	},
	addClassifiedUser:function(){
		var errorsList = this.validateFields(), self = this;
		if(errorsList.length === 0){
			this.formModel.save(null, {
				type:"POST",
				dataType:"JSON",
				success:function(model, resp){
					sessionStorage.setItem("registrationId",true);
					window.location = resp.url;
				},
				error:function(model, resp){
					console.log(resp);
					self.$el.find(".signup-error-msg").html(resp.responseJSON.responseText);
				}
			});
		}else{
			utils.buildErrors(errorsList, this.$el.find(".signup-error-msg"));
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