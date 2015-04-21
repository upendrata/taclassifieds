<!DOCTYPE html>
<html>
	<head>
		<title>Classifieds</title>
		<link href="css/global.css" rel="stylesheet" type="text/css"/>
	</head>
	<body>
		<div class="container">
			<div class="headerContainer"></div>
			<div id="pageContainer">Body of the page goes over here...</div>
			<div class="footerContainer">Copy rights info goes over here...</div>
		</div>
		<script type="text/javascript" src="js/lib/jquery-1.11.2.min.js"></script>
		<script type="text/javascript" src="js/lib/underscore-min.js"></script>
		<script type="text/javascript" src="js/lib/backbone-min.js"></script>
		<script type="text/javascript" src="js/modules/config/view.js"></script>
		<script type="text/javascript" src="js/modules/home/homePageView.js"></script>
		<script type="text/javascript" src="js/modules/login/loginPageView.js"></script>
		<script type="text/javascript" src="js/modules/signup/signUpPageView.js"></script>
		<script type="text/javascript" src="js/modules/config/app.js"></script>


		<script type="text/javascript">
			$(function(){
				var routerObj = new classifieds.router();
				Backbone.history.start();
			});
		</script>

		<script type="text/template" id="ta-classified-header-tpl">
			<a id="home" href="#home"><img src="images/logo.png" alt="logo-img"></a>
			<h1>TechAspect Classifieds</h1>
			<a href="#login">LOGIN</a>
			<a href="#signup">SIGNUP</a>
		</script>

		<script type="text/template" id="ta-classified-homepage-tpl">
			<div class="home-page">
				<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,</p>
				<ol>
					<li>Lorem Ipsum</li>
					<li>Lorem Ipsum</li>
					<li>Lorem Ipsum</li>
					<li>Lorem Ipsum</li>
					<li>Lorem Ipsum</li>
				</ol>
			</div>
		</script>
		<script type="text/template" id="ta-classified-login-tpl">
			<form class="login-page">
				<label>User Name</label>
				<input type="text" name="username" placeholder="ex:abc@techaspect.com" required>
				<label>Password</label>
				<input type="password" name="password" placeholder="Password" required>
				<button type="submit">Submit</button>
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
				<span>What is your first nickname?</span>
				<input class="security-question" type="text">
				<span>What is your favourite food?</span>
				<input class="security-question" type="text">
				<button type="submit">Sign Up</button>
			</form>
		</script>
		<script type="text/template" id="ta-classified-footer-tpl">
			<span>&#169; 2015 TechAspect Solutions Inc.</span>
		</script>
	</body>
</html>