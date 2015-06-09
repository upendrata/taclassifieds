var classified = classified || {};
classified.headerView = Backbone.View.extend({
	initialize:function(options){
		this.options = options || {};
		this.template = this.options.template;
		this.model.on("change", this.render, this);
		this.render();
	},
	render:function(){
		this.$el.empty().html(_.template($(this.template).html())({isLoggedIn:this.model.get('isLoggedIn')}));
		username = sessionStorage.getItem("username");
		if(username!=null){
			username = username.substring(0,1).toUpperCase()+username.substring(1,(username.indexOf('@')-1))+" "+username.substring(username.indexOf('@')-1,username.indexOf('@')).toUpperCase();
		}
		$(".user-name").html(username);
		var height = $(window).height();
		$('#pagecontainer').css({
			"min-height":"height"
		});
	},
	events:{
		"click .logo":"showHome",
		"click .home-link":"showHome",
		"click .logout-link":"showHomePage",
		"click #menu-icon":"showMenu",
		"click .signin-links a":"hideMenu",
		"click .logout-links a":"hideMenu"
	},
	hideMenu:function(){
		$('.links').removeClass("slide-menu");
		if(window.innerWidth<=767){
			$(".links").addClass("hide");
		}
	},
	showHome:function(){
		this.isLogged();
		window.location="#home";
	},
	showHomePage:function(e){
		e.preventDefault();
		sessionStorage.clear();
		classifieds.homePageObj = null;
		this.isLogged();
		$('#menu').empty();
		window.location="#home";
	},
	isLogged:function(){
		if(sessionStorage.getItem("username")!=null){
			this.model.set('isLoggedIn', true);
		} else {
			this.model.set('isLoggedIn', false);
		}
	},
	showMenu:function(){
		$('.links').removeClass("hide");
		if($(".links").hasClass("slide-menu")){
			$('.links').removeClass("slide-menu");
			$('.links').addClass("hide");
		} else {
			$('.links').addClass("slide-menu");
			$(".signin-links").show();
			$(".logout-links").show();
		}
	}
});

classified.headerModel = Backbone.Model.extend({
	initialize:function(){

	}
});