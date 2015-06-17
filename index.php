<!DOCTYPE html>
<html>
	<head>
		<title>Classifieds</title>
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link href="css/global.css" rel="stylesheet" type="text/css"/>
		<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
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
				var data = {};
				data.isLoggedIn = (sessionStorage.getItem("username")!=null)?true:false;
				classified.modelRef = new classified.headerModel(data);
				var headerObj = new classified.headerView({el:".header-container",template:'#ta-classified-header-tpl', model:classified.modelRef});
				var footerObj = new classified.footerView({el:".footer-container",template:"#ta-classified-footer-tpl"});
				var routerObj = new classifieds.router();
				Backbone.history.start();
			});
		</script>
		<script type="text/javascript" src="classifiedsjson.js"></script>
		<script type="text/javascript" src="js/modules/config/headerView.js"></script>
		<script type="text/javascript" src="js/modules/config/footerView.js"></script>
		<script type="text/javascript" src="js/modules/home/homePageModel.js"></script>
		<script type="text/javascript" src="js/modules/home/homePageView.js"></script>
		<script type="text/javascript" src="js/modules/home/homePagePresenter.js"></script>
		<script type="text/javascript" src="js/modules/login/loginPageView.js"></script>
		<script type="text/javascript" src="js/modules/login/loginPageModel.js"></script>
		<script type="text/javascript" src="js/modules/login/loginPagePresenter.js"></script>
		<script type="text/javascript" src="js/modules/login/loginValidation.js"></script>
		<script type="text/javascript" src="js/modules/forgotpassword/forgotPasswordView.js"></script>
		<script type="text/javascript" src="js/modules/forgotpassword/forgotPasswordPresenter.js"></script>
		<script type="text/javascript" src="js/modules/signup/signUpPageView.js"></script>
		<script type="text/javascript" src="js/modules/signup/signUpPageModel.js"></script>
		<script type="text/javascript" src="js/modules/signup/signUpPagePresenter.js"></script>
		<script type="text/javascript" src="js/modules/signup/signUpPageValidation.js"></script>
		<script type="text/javascript" src="js/modules/userhome/userHomePageView.js"></script>
		<script type="text/javascript" src="js/modules/userhome/userHomePageModel.js"></script>
		<script type="text/javascript" src="js/modules/userhome/userHomePagePresenter.js"></script>
		<script type="text/javascript" src="js/modules/classifiedDetails/classifiedDetailsPresenter.js"></script>
		<script type="text/javascript" src="js/modules/classifiedDetails/classifiedDetailsView.js"></script>
		<script type="text/javascript" src="js/modules/config/demo.js"></script>
		<script type="text/javascript" src="js/modules/config/app.js"></script>
		<script type="text/javascript" src="js/modules/config/loader.js"></script>
		<script type="text/javascript" src="js/modules/config/utils.js"></script>

		<script type="text/template" id="ta-classified-header-tpl">
			<div class="logo-container">
				<img class="logo" src="images/logo.png" alt="logo-img">
				<img class="home-link" src="images/ta-logo.png" alt="logo-img">
				<h1 class="classifieds-heading"><a href="#home">Class<span class="heading">ifieds</span></a></h1>
				<h1 class="heading-mobile"><a href="#home">TA Classifieds</a></h1>
				<div class="user-profile">
					<% if(isLoggedIn){%>
						<div class="user-info">Welcome <span class="user-name"></span></div>
					<%}%>
					<div id="menu-icon">
						<span class="menu-img"></span>
						<span class="menu-img"></span>
						<span class="menu-img"></span>
					</div>
				</div>
			</div>
			<div class="links">
				<% if(!isLoggedIn){%>
					<a href="#login">Login <i class="fa fa-angle-right fa-lg"></i></a>
					<a href="#signup">SignUp <i class="fa fa-angle-right fa-lg"></i></a>
					
				<%}else{%>
					<a href="#profile">My Profile <i class="fa fa-angle-right fa-lg"></i></a>
					<a class="logout-link" href="#home">LogOut <i class="fa fa-angle-right fa-lg"></i></a>
				<%}%>
			</div>
		</script>

		<script type="text/template" id="ta-classified-homepage-tpl">
			<div id="menu"></div>
			<section class="home-page">
				<div class="about-us">
					<h2>About us</h2>
					<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,<span class="see-more">..more</span><span class="text">when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages</span></p>
				</div>
				<div class="latest-classifieds">
					<h3>Latest Classifieds</h3>
					<ol class="classifieds-list"></ol>
					<a href="javascript:void(0)" class="more-classifieds">View All Classifieds</a>
				</div>
			</section>
		</script>

		<script type="text/template" id="ta-classified-list-tpl">
			<li><span class="classified-category"><%=classifieds.get('classifiedCategory')%></span> - <span class="classified-heading"><%=classifieds.get('classifiedHeading')%></span><span class="emp-email"> by <%=classifieds.get('empemail')%></span></li>
		</script>

		<script type="text/template" id="ta-classified-login-tpl">
			<div class="password-change-text">Your Password updated Successfully..!!</div>
			<div class="signup-success-msg">Registration successfull.!!Please login..!!</div>
			<div class="error-msg"></div>
			<div class="login-page">
				<input class="username" name="username" type="email" placeholder="ex:abc@techaspect.com" required/>
				<i class="fa fa-user fa-lg user-icon"></i>
				<input class="password" name="password" type="password" placeholder="Password" required/>
				<i class="fa fa-lock fa-lg pwd-icon"></i>
				<button type="submit" class="login-btn"><%=data.get("logIn")%></button>
				<a class="forgot-pwd-link" href="#forgotpwd"><%=data.get("forgotpwd")%></a>
			</div>
		</script>

		<script type="text/template" id="ta-classified-forgot-password-tpl">
			<div class="forgot-pwd-form">
				<label>Select your question</label>
				<select id="selected-question" class="security-ques"></select>
				<label>Enter your answer</label>
				<input type="password" class="security-ans">
			</div>
		</script>

		<script type="text/template" id="ta-classified-user-base-tpl">
			<div id="menu"></div>
			<div id="classifieds-container"></div>
		</script>

		<script type="text/template" id="ta-classified-menu-tpl">
			<div class="options">
				<a class="all-classifieds" href="#classifieds"><span>All Classifieds</span></a>
				<a class="my-classifieds" href="#myclassifieds"><span>My Classifieds</span></a>
				<a class="post-classified" href="#postClassified"><span>Post A Classified</span></a>
			</div>
		</script>

		<script type="text/template" id="ta-classified-list-base-tpl">
			<div class="page-navigation-menu">
				<button class="previous"><</button>
				<button class="next">></button>
			</div>
			<select id="categories-filter">
				<option value="0">All Categories</option>
			</select>
			<ul class="all-classifieds-list"></ul>
			<div class="page-navigation-menu">
				<button class="previous"><</button>
				<button class="next">></button>
			</div>
		</script>

		<script type="text/template" id="ta-classified-all-classifieds-tpl">
			<li class="classified-list-item"><span class="classified-category"><%=classifieds.get('classifiedCategory')%></span><span class="classified-heading"><%=classifieds.get('classifiedHeading')%></span><span class="emp-email"> by <%=classifieds.get('empemail')%></span></li>
		</script>

		<script type="text/template" id="ta-classified-my-classifieds-tpl">
			<li class="my-classified-item"><span class="classified-category"><%=classifieds.get('classifiedCategory')%></span><span class="classified-heading"><%=classifieds.get('classifiedHeading')%></span><span class="icons"><span class="edit">EDIT</span><span class="delete">DELETE</span></span></li>
		</script>

		<script type="text/template" id="ta-classified-details-tpl">
			<div class="back-arrow">
				<img class="back-option" src="images/back.png">
			</div>
			<div class="classified-details">
				<div class="classified-data">
					<div class="selected-classified-category"><%=data.classifiedCategory%></div>
					<div class="selected-classified-heading"><%=data.classifiedHeading%></div>
					<div class="selected-classified-price">Price - <span>Rs.<%=data.classifiedPrice%></span></div>
					<div class="is-negotiable">Is Negotiable - 
						<%if(data.classifiedNegotiable==1){%>
							<span class="negotiable-option">Yes</span>
						<%} else {%>
							<span class="negotiable-option">No</span>
						<%}%>
					</div>
					<div class="selected-classified-description"><%=data.classifiedDesc%></div>
				</div>
				<div class="image-section">
			    	<div id="img-preview"><img src="images/classifieds/<%=data.classifiedFirstImg%>"/></div>
			    		<div class="thumg-images clearfix">
			    			<%_.each(data.classifiedImgs, function(item){
			    				if(item != null){%>
			        				<img class='thumb-img' src='images/classifieds/<%=item%>' alt="classified image" />
			       				<%}
			      			});%>
			     		</div>
			    	</div>
				</div>
			</div>
		</script>

		<script type="text/template" id="ta-classified-post-classified-tpl">
			<div class="error-text"></div>
			<form class="post-a-classified" enctype="multipart/form-data" method="POST">
				<div>
					<label for="heading">Heading</label>
					<input type="text" name="heading" class="heading-classified" placeholder="Heading" required>
				</div>
				<div>
					<label for="category">Category</label>
					<select name="category" id="categories-list" class="categories-list-item">
						<option>Select Category</option>
					</select>
				</div>
				<label for="specifications">Specifications/Description</label>
				<textarea name="specification" class="specification"></textarea>
				<div>
					<label for="price">Price</label>
					<input type="text" name="price" class="price-classified" placeholder="Price" required>
				</div>
				<div class="is-negotiable">
					<label>Is negotiable?</label>
					<select name="negotiable" id="negotiable" class="categories-list-item">
						<option>Select</option>
						<option value="1">Yes</option>
						<option value="0">No</option>
					</select>
				</div>
				<span>Upload an Image <span class="upload-restrict"> (Max no. of images is 5 and max filesize is 2MB)</span></span>	
				<input id="image-upload" type="file" name="pic" multiple="multiple">	
				<button class="submit-classified" type="button">Post</button>
			</form>
		</script>

		<script type="text/template" id="ta-classified-categories-list-tpl">
			<option value="<%=listItem.value%>"><%=listItem.option%></option>
		</script>

		<script type="text/template" id="ta-classified-edit-classified-tpl">
			<form class="edit-a-classified">
				<label for="category">Category</label>
				<select id="edit-categories-list" class="edit-categories-list-item">
					<option>Select Category</option>
				</select>
				<label for="heading">Heading</label>
				<input type="text" name="heading" class="edit-heading-classified" placeholder="Heading" required>
				<div>
					<label for="price">Price</label>
					<input type="text" name="price" class="edit-price-classified" placeholder="Price" required>
				</div>
				<div class="is-negotiable">
					<label>Is negotiable?</label>
					<select id="categories-list" class="edit-categories-list-item">
						<option>Select</option>
						<option value="yes">Yes</option>
						<option value="no">No</option>
					</select>
				</div>
				<label for="description">Specifications</label>
				<textarea name="specification" class="edit-specification"></textarea>
				<label>Upload an Image</label>	
				<input id="image-upload" type="file" name="pic" accept="image/*">		
				<div class="error-text"></div>
				<button class="submit-classified" type="button">Update</button>
			</form>
		</script>

		<script type="text/template" id="ta-classified-signup-tpl">
			<div class="sign-up" name="signup-form">
				<span class="signup-error-msg"></span>
				<div>
					<label><%=data.get("employeeName")%></label>
					<input type="text" name="empname" placeholder="Employee name" required>
				</div>
				<div>
					<label><%=data.get("employeeId")%></label>
					<input name="empid" type="text" placeholder="Emp ID" required>
				</div>
				<label><%=data.get("emailId")%></label>
				<input type="email" class="empemail" name="empemail" placeholder="EmailID" required>
				<div>
					<label><%=data.get("password")%></label>
					<input name="emppassword" type="password" placeholder="Password" required>
				</div>
				<div>
					<label><%=data.get("confirmPassword")%></label>
					<input name="empconfpassword" class="confirm-password" type="password" placeholder="Confirm Password" required>
				</div>
				<div>
					<label><%=data.get("securityQuestions")%></label>
					<select id="selected-question" class="security-questions" name="empquestion">
						<option>Select one</option>
					</select>
				</div>
				<div>
					<label><%=data.get("answer")%></label>
					<input type="text" class="security-question-answer" name="empqans">
				</div>
				<button type="submit" class="sign-up-btn"><%=data.get("signUp")%></button>
			</div>
		</script>

		<script type="text/template" id="ta-classified-continue-button-tpl">
			<button class="continue">Continue</button>
		</script>

		<script type="text/template" id="ta-classified-change-password-tpl">
			<div class="password-fields">
				<label>New Password</label>
				<input class="new-pwd" name="password" type="password" placeholder="New password" required/> 
				<label>Confirm Password</label>
				<input class="confirm-pwd" name="confirm password" type="password" placeholder="Confirm Password" required/>
			</div>
		</script>

		<script type="text/template" id="ta-classified-change-pwd-button-tpl">
			<button class="change-pwd">Change Password</button>
		</script>

		<script type="text/template" id="ta-classifieds-security-questions-tpl">
			<option value="<%=listItem.value%>"><%=listItem.option%></option>
		</script>

		<script type="text/template" id="ta-classified-footer-tpl">
			<span class="footer-left">&#169; 2015 TechAspect Solutions Inc.</span>
			<span class="footer-right"><a href="javascript:void(0)">Privacy Statement</a>&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)">Terms of Use</a></span>
		</script>
	</body>
</html>