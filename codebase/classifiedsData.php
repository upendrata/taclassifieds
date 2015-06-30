<?php
	@include('dbConnect.php');
	
	$obj = new classifieds();
	// Define HTTP responses
    $http_response_code = array(200 => 'OK', 400 => 'Bad Request', 401 => 'Unauthorized', 403 => 'Forbidden', 404 => 'Not Found', 405 => 'Error');
	header('Content-Type: application/json; charset=utf-8');
	
	$type = $_POST['queryStr'];
	if($type === "forgotPassword"){
		$uname = $_POST['empemail'];
		$sque = $_POST['empquestion'];
		$squeans = $_POST['empqans'];
		return $obj->forgotPassword($http_response_code, $uname, $sque, $squeans);
	}else if($type === "validateUsername"){
		$uname = $_POST['empemail'];
		return $obj->validateUsername($http_response_code, $uname);
	}else if($type === "updatePassword"){
		$uname = $_POST['empemail'];
		$newpass = $_POST['emppassword'];
		return $obj->updatePassword($http_response_code, $uname, $newpass);
	}else if($type === "delClassified"){
		$classifiedId= $_POST['classifiedId'];
		return $obj->deleteClassified($http_response_code, $classifiedId);
	}else if($type === "updateClassified"){
		$classifiedId= $_POST['classifiedId'];
		return $obj->updateClassified($http_response_code, $classifiedId);
	}else if($type === "changePassword"){
		$uname = $_POST['empemail'];
		$oldpass = $_POST['empoldpassword'];
		$newpass = $_POST['empnewpassword'];
		return $obj->changePassword($http_response_code, $uname, $newpass, $oldpass);
	}else{
		 // Set HTTP Response
		$response['status'] = 405;
		header('HTTP/1.1 '.$response['status'].' '.$http_response_code[ $response['status'] ]);
		
		$res = '{"status": false, "responseText": "Wrong Query String... Please pass valid Query parameter..."}';
		echo $res;
		//return "Wrong query string";
	}
	
	class classifieds{
		public function forgotPassword($http_response_code, $uname, $sque, $squeans){
			$flag = false;
			$dbConnect = new taClassifiedDBConnect();
			if($dbConnect->authenticateDB()){
				if($dbConnect->connectToDB()){
					$search_query = "select * from taclassifiedusers where empemail = '$uname'";
					$search_result = mysql_query($search_query);
					$search_row = mysql_fetch_array($search_result);
					if($sque === $search_row['empquestion'] && $search_row['empqans'] === $squeans){
						$flag = true;
					}
				}
			}
			if($flag){
				 // Set HTTP Response
				$response['status'] = 200;
				header('HTTP/1.1 '.$response['status'].' '.$http_response_code[ $response['status'] ]);
				$res = '{"status": "Success", "showUpdatePassword": true}';
				echo $res;
			}else{
				 // Set HTTP Response
				$response['status'] = 404;
				header('HTTP/1.1 '.$response['status'].' '.$http_response_code[ $response['status'] ]);
				
				$res = '{"status": false, "responseText": "Security Question and Answer are wrong!..."}';
				echo $res;
			}
		}
		
		public function validateUsername($http_response_code, $uname){
			$flag = false;
			$dbConnect = new taClassifiedDBConnect();
			if($dbConnect->authenticateDB()){
				if($dbConnect->connectToDB()){
					$search_query = "select * from taclassifiedusers where empemail = '$uname'";
					$search_result = mysql_query($search_query);
					$search_row = mysql_fetch_array($search_result);
					if($search_row){
						$flag = true;
					}
				}
			}
			if($flag){
				 // Set HTTP Response
				$response['status'] = 200;
				header('HTTP/1.1 '.$response['status'].' '.$http_response_code[ $response['status'] ]);
				$res = '{"status": "Success", "showSecurityQuestions": true}';
				echo $res;
			}else{
				 // Set HTTP Response
				$response['status'] = 404;
				header('HTTP/1.1 '.$response['status'].' '.$http_response_code[ $response['status'] ]);
				
				$res = '{"status": false, "responseText": "The given user name is not available with us please re-check it once!..."}';
				echo $res;
			}
		}
		//update password function
		public function updatePassword($http_response_code, $uname, $newpass){
			$flag = false;
			$dbConnect = new taClassifiedDBConnect();
			if($dbConnect->authenticateDB()){
				if($dbConnect->connectToDB()){
					$search_query = "UPDATE taclassifiedusers SET emppassword = '$newpass' WHERE empemail = '$uname'";
					if(mysql_query($search_query)){
						$flag = true;
					}
				}
			}
			if($flag){
				 // Set HTTP Response
				$response['status'] = 200;
				header('HTTP/1.1 '.$response['status'].' '.$http_response_code[ $response['status'] ]);
				$res = '{"status": "Success", "responseText": "Your Password updated Successfully...."}';
				echo $res;
			}else{
				 // Set HTTP Response
				$response['status'] = 404;
				header('HTTP/1.1 '.$response['status'].' '.$http_response_code[ $response['status'] ]);
				
				$res = '{"status": false, "responseText": "Something went wrong not able to update your password now please try after some time!..."}';
				echo $res;
			}
		}
		//change password
		public function changePassword($http_response_code, $uname, $newpass, $oldpass){
			$flag = false;
			$dbConnect = new taClassifiedDBConnect();
			if($dbConnect->authenticateDB()){
				if($dbConnect->connectToDB()){
					$search_query = "select emppassword from taclassifiedusers WHERE empemail = '$uname'";
					$oldPassData = mysql_query($search_query);
					$search_row = mysql_fetch_array($oldPassData);
					if($search_row['emppassword'] === $oldpass){
						$query = "UPDATE taclassifiedusers SET emppassword = '$newpass' WHERE empemail = '$uname'";
						if(mysql_query($query)){
							$flag = true;
						}
					}else{
						$flag = false;
					}
				}
			}
			if($flag){
				 // Set HTTP Response
				$response['status'] = 200;
				header('HTTP/1.1 '.$response['status'].' '.$http_response_code[ $response['status'] ]);
				$res = '{"status": "Success", "responseText": "Your Password changed Successfully...."}';
				echo $res;
			}else{
				 // Set HTTP Response
				$response['status'] = 404;
				header('HTTP/1.1 '.$response['status'].' '.$http_response_code[ $response['status'] ]);
				
				$res = '{"status": false, "responseText": "Old password is not correct!..."}';
				echo $res;
			}
		}
		//Delete Classified
		public function deleteClassified($http_response_code, $classifiedId){
			$flag = false;
			$dbConnect = new taClassifiedDBConnect();
			if($dbConnect->authenticateDB()){
				if($dbConnect->connectToDB()){
					$search_query = "DELETE FROM taclassifieds WHERE classifiedId = '$classifiedId'";
					if(mysql_query($search_query)){
						$flag = true;
					}
				}
			}
			if($flag){
				// Set HTTP Response
				$response['status'] = 200;
				header('HTTP/1.1 '.$response['status'].' '.$http_response_code[ $response['status'] ]);
				$res = '{"status": "Success", "responseText": "Successfully deleted the Classified"}';
				echo $res;
			}else{
				// Set HTTP Response
				$response['status'] = 404;
				header('HTTP/1.1 '.$response['status'].' '.$http_response_code[ $response['status'] ]);
				
				$res = '{"status": false, "responseText": "Something went wrong not able to delete classified now please try after some time!..."}';
				echo $res;
			}
		}
		
		//Update Classified
		public function updateClassified($http_response_code, $classifiedId){
			$flag = false;
			$dbConnect = new taClassifiedDBConnect();
			if($dbConnect->authenticateDB()){
				if($dbConnect->connectToDB()){
					$classifiedCategory = mysql_real_escape_string($_POST['classifiedCategory']); 
					$classifiedHeading = mysql_real_escape_string($_POST['classifiedHeading']);
					$classifiedDesc = mysql_real_escape_string($_POST['classifiedDesc']); 
					$classifiedNegotiable = mysql_real_escape_string($_POST['classifiedNegotiable']); 
					$classifiedPrice = mysql_real_escape_string($_POST['classifiedPrice']); 
					
					$files = array();
					if(!mysql_real_escape_string($_POST['info'])){
						$uploaddir = './../images/classifieds/';
						$count = 1;
						foreach($_FILES as $file){
							$fileData = pathinfo(basename($file["name"]));
							$fileName = $classifiedId . '-' . $count . '.' .$fileData['extension'];
							$count++;
							if(move_uploaded_file($file['tmp_name'], $uploaddir.$fileName)){
								$files[] = $fileName;
							}else{
								$flag = false;
							}
						}
					}
					//echo count($files).'-'.$classifiedId;
					if(count($files)==1){
						$search_query = "UPDATE taclassifieds SET classifiedHeading = '$classifiedHeading', classifiedCategory = '$classifiedCategory', classifiedDesc = '$classifiedDesc', classifiedNegotiable = '$classifiedNegotiable', classifiedPrice = '$classifiedPrice', classifiedImg1 ='$files[0]', classifiedImg2 = null, classifiedImg3 = null, classifiedImg4 = null, classifiedImg5 = null WHERE classifiedId = '$classifiedId'";
					}else if(count($files)==2){
						$search_query = "UPDATE taclassifieds SET classifiedHeading = '$classifiedHeading', classifiedCategory = '$classifiedCategory', classifiedDesc = '$classifiedDesc', classifiedNegotiable = '$classifiedNegotiable', classifiedPrice = '$classifiedPrice', classifiedImg1 ='$files[0]', classifiedImg2 = '$files[1]', classifiedImg3 = null, classifiedImg4 = null, classifiedImg5 = null WHERE classifiedId = '$classifiedId'";
					}else if(count($files)==3){
						$search_query = "UPDATE taclassifieds SET classifiedHeading = '$classifiedHeading', classifiedCategory = '$classifiedCategory', classifiedDesc = '$classifiedDesc', classifiedNegotiable = '$classifiedNegotiable', classifiedPrice = '$classifiedPrice', classifiedImg1 ='$files[0]', classifiedImg2 = '$files[1]', classifiedImg3 = '$files[2]', classifiedImg4 = null, classifiedImg5 = null WHERE classifiedId = '$classifiedId'";
					}else if(count($files)==4){
						$search_query = "UPDATE taclassifieds SET classifiedHeading = '$classifiedHeading', classifiedCategory = '$classifiedCategory', classifiedDesc = '$classifiedDesc', classifiedNegotiable = '$classifiedNegotiable', classifiedPrice = '$classifiedPrice', classifiedImg1 ='$files[0]', classifiedImg2 = '$files[1]', classifiedImg3 = '$files[2]', classifiedImg4 = '$files[3]', classifiedImg5 = null WHERE classifiedId = '$classifiedId'";
					}else if(count($files)==5){
						$search_query = "UPDATE taclassifieds SET classifiedHeading = '$classifiedHeading', classifiedCategory = '$classifiedCategory', classifiedDesc = '$classifiedDesc', classifiedNegotiable = '$classifiedNegotiable', classifiedPrice = '$classifiedPrice', classifiedImg1 ='$files[0]', classifiedImg2 = '$files[1]', classifiedImg3 = '$files[2]', classifiedImg4 = '$files[3]', classifiedImg5 = '$files[4]' WHERE classifiedId = '$classifiedId'";
					} else {
						$search_query = "UPDATE taclassifieds SET classifiedHeading = '$classifiedHeading', classifiedCategory = '$classifiedCategory', classifiedDesc = '$classifiedDesc', classifiedNegotiable = null, classifiedPrice = null, classifiedImg1 =null, classifiedImg2 = null, classifiedImg3 = null, classifiedImg4 = null, classifiedImg5 = null WHERE classifiedId = '$classifiedId'";
					}
					//echo $search_query;
					if(mysql_query($search_query)){
						$flag = true;
					}
				}
			}
			if($flag){
				// Set HTTP Response
				$response['status'] = 200;
				header('HTTP/1.1 '.$response['status'].' '.$http_response_code[ $response['status'] ]);
				$res = '{"status": "Success", "responseText": "Successfully updated the Classified"}';
				echo $res;
			}else{
				// Set HTTP Response
				$response['status'] = 404;
				header('HTTP/1.1 '.$response['status'].' '.$http_response_code[ $response['status'] ]);
				
				$res = '{"status": false, "responseText": "Something went wrong not able to update your classified now please try after some time!..."}';
				echo $res;
			}
		}
	}
?>