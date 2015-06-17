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
		this.$el.find(".user-name").html(username);
	},
	events:{
		"click .logo":"showHome",
		"click .home-link":"showHome",
		"click .logout-link":"showHomePage",
		"click #menu-icon":"showMenu",
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
		this.$el.find(".links").slideToggle('slow');
	}
});

classified.headerModel = Backbone.Model.extend({
	initialize:function(){

	}
});