<!DOCTYPE html>
<html>
	<head>
		<title>Classifieds</title>
		<link href="css/global.css" rel="stylesheet" type="text/css"/>
	</head>
	<body>
		<div class="container">
			<header class="header-container"></header>
			<main id="page-container"></main>
			<footer class="footer-container"></footer>
			<div class="loader-mask"></div>
			<div id="loader-img">
				<img src="images/loader.gif" alt="loader-image"/>
			</div>
		</div>
		<script type="text/javascript" src="js/lib/jquery-1.11.2.min.js"></script>
		<script type="text/javascript" src="js/lib/underscore-min.js"></script>
		<script type="text/javascript" src="js/lib/backbone-min.js"></script>
		
		<script type="text/javascript">
			$(function(){
				var headerObj = new classified.headerView({el:".header-container",template:'#ta-classified-header-tpl'});
				var footerObj = new classified.footerView({el:".footer-container",template:"#ta-classified-footer-tpl"});
				if(sessionStorage.getItem('username')==null){
					$('.signin-links').removeClass("hide");
					$('.logout-links').removeClass('show');
				} else {
					$('.signin-links').addClass("hide");
					$('.logout-links').addClass('show');
				}

				var routerObj = new classifieds.router();
				Backbone.history.start();
			});
		</script>
		<script type="text/javascript" src="js/modules/config/view.js"></script>
		<script type="text/javascript" src="js/modules/home/homePageView.js"></script>
		<script type="text/javascript" src="js/modules/home/homePagePresenter.js"></script>
		<script type="text/javascript" src="js/modules/login/loginPageView.js"></script>
		<script type="text/javascript" src="js/modules/login/loginPagePresenter.js"></script>
		<script type="text/javascript" src="js/modules/login/loginValidation.js"></script>
		<script type="text/javascript" src="js/modules/signup/signUpPageView.js"></script>
		<script type="text/javascript" src="js/modules/signup/signUpPagePresenter.js"></script>
		<script type="text/javascript" src="js/modules/userhome/userHomePageView.js"></script>
		<script type="text/javascript" src="js/modules/userhome/userHomePageModel.js"></script>
		<script type="text/javascript" src="js/modules/userhome/userHomePagePresenter.js"></script>
		<script type="text/javascript" src="js/modules/config/model.js"></script>
		<script type="text/javascript" src="js/modules/config/app.js"></script>
		<script type="text/javascript" src="js/modules/config/loader.js"></script>

		<script type="text/template" id="ta-classified-header-tpl">
			<img class="logo" src="images/logo.png" alt="logo-img">
			<h1>TechAspect Classifieds</h1>
			<div class="signin-links">
				<a href="#login">LOGIN</a>
				<a href="#signup">SIGNUP</a>
			</div>
			<div class="logout-links">
				<a href="#profile">My Profile</a>
				<a class="logout-link" href="#logout">LOGOUT</a>
			</div>
		</script>

		<script type="text/template" id="ta-classified-homepage-tpl">
			<section class="home-page">
				<div class="about-us">
					<h2>About us</h2>
					<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages</p>
				</div>
				<ol class="classifieds-list"></ol>
			</section>
		</script>

		<script type="text/template" id="ta-classified-list-tpl">
			<li><span class="classified-category"><%=classifieds.classifiedCategory%></span> - <span class="classified-heading"><%=classifieds.classifiedHeading%></span><span class="emp-email"> by <%=classifieds.empemail%></span></li>
		</script>

		<script type="text/template" id="ta-classified-login-tpl">
			<div class="login-page">
				<label>User Name</label>
				<input class="username" type="text" name="username" placeholder="ex:abc@techaspect.com" required>
				<label>Password</label>
				<input class="password" type="password" name="password" placeholder="Password" required>
				<button type="submit" class="login-btn">Submit</button>
			</div>
			<div class="error-msg"></div>
		</script>

		<script type="text/template" id="ta-classified-user-base-tpl">
			<div id="menu"></div>
			<div id="classifieds-container"></div>
		</script>

		<script type="text/template" id="ta-classified-menu-tpl">
			<div class="options">
				<a class="all-classifieds highlight" href="#classifieds">All Classifieds</a>
				<a class="my-classifieds" href="#myclassifieds">My Classifieds</a>
				<a class="post-classified" href="#postClassified">Post A Classified</a>
			</div>
		</script>

		<script type="text/template" id="ta-classified-list-base-tpl">
			<ul class="all-classifieds-list"></ul>
			<div class="page-navigation-menu">
				<button class="previous"><</button>
				<button class="next">></button>
			</div>
		</script>

		<script type="text/template" id="ta-classified-all-classifieds-tpl">
			<li><span class="classified-category"><%=classifieds.get('classifiedCategory')%></span> - <span class="classified-heading"><%=classifieds.get('classifiedHeading')%></span><span class="emp-email"> by <%=classifieds.get('empemail')%></span></li>
		</script>

		<script type="text/template" id="ta-classified-my-classifieds-tpl">
			<li><span class="classified-category"><%=classifieds.get('classifiedCategory')%></span> - <span class="classified-heading"><%=classifieds.get('classifiedHeading')%></span></li> 
		</script>

		<script type="text/template" id="ta-classified-post-classified-tpl">
			<form class="post-a-classified">
				<label for="category">Category</label>
				<input type="text" name="category" class="category" placeholder="Category" required>
				<label for="heading">Heading</label>
				<input type="text" name="heading" class="heading" placeholder="Heading" required>
				<label for="description">Description</label>
				<textarea name="description" class="description"></textarea>
				<button class="submit-classified" type="button">Submit</button>
			</form>
		</script>

		<script type="text/template" id="ta-classified-signup-tpl">
			<form class="sign-up">
				<label>Email ID</label>
				<input type="email" name="emailId" placeholder="EmailID" required>
				<label>Password</label>
				<input type="password" placeholder="Password" required>
				<label>Confirm Password</label>
				<input type="password" placeholder="Confirm Password" required>
				<label>Emp ID</label>
				<input type="text" placeholder="Emp ID" required>
				<select>
				<button type="submit">Sign Up</button>
			</form>
		</script>

		<script type="text/template" id="ta-classified-footer-tpl">
			<span>&#169; 2015 TechAspect Solutions Inc.</span>
		</script>
	</body>
</html>