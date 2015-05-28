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
					$search_query = "UPDATE taclassifieds SET classifiedHeading = '$classifiedHeading', classifiedCategory = '$classifiedCategory', classifiedDesc = '$classifiedDesc'  WHERE classifiedId = '$classifiedId'";
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