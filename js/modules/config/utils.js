var utils = (function(){
	var errorMsgs = {
		"empname" : "Please Enter Employee Name",
		"empid" : "Please Enter Employee Id",
		"empemail" : "Please Enter Employee Email",
		"emppassword" : "Please Enter Password",
		"empconfpassword" : "Please Enter Conformation Password",
		"empquestion" : "Please Select Security Question",
		"empqans" : "Please Enter Answer for Security Question",
		"passwordsnotmatch" : "Password and Confirmation password are not same",
		"username":"Please Enter Username",
		"password":"Please Enter Password"
	}
	return {
		buildErrors : function(errorsList, target){
			var errorsHtml = "<ul>"
			$.each(errorsList, function(index){
				errorsHtml += "<li>"+errorMsgs[errorsList[index]]+"</li>";
			});
			errorsHtml += "</ul>";
			$(target).empty().html(errorsHtml);
		}
	}
})();