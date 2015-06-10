<?php
	@include('dbConnect.php');
	
	$obj = new classifiedUsers();
	
	// Define HTTP responses
    $http_response_code = array(200 => 'OK', 400 => 'Bad Request', 401 => 'Unauthorized', 403 => 'Forbidden', 404 => 'Not Found', 405 => 'Error');
	header('Content-Type: application/json; charset=utf-8');
	
	return $obj->addUser($http_response_code);
	
	class classifiedUsers{
		public function addUser($http_response_code){
			$flag = false;
			$dbConnect = new taClassifiedDBConnect();
			if($dbConnect->authenticateDB()){
				if($dbConnect->connectToDB()){
					$post_data = file_get_contents("php://input");
					$post_data = json_decode($post_data, TRUE);
					
					$empid = mysql_real_escape_string($post_data['empid']); $empname = mysql_real_escape_string($post_data['empname']);
					$empemail = mysql_real_escape_string($post_data['empemail']); $emppassword = mysql_real_escape_string($post_data['emppassword']);
					$empquestion = mysql_real_escape_string($post_data['empquestion']); $empqans = mysql_real_escape_string($post_data['empqans']);
					
					$postAdQuery = "INSERT INTO taclassifiedusers(empid, empname, empemail, emppassword, empquestion, empqans) VALUES ('$empid', '$empname', '$empemail', '$emppassword', '$empquestion', '$empqans')";
					$flag = mysql_query($postAdQuery);
					
				}else{
					echo "Not able to connect to Table";
				}
			}else{
				echo "Not able to connect to DB";
			}
			if($flag){
				 // Set HTTP Response
				$response['status'] = 200;
				header('HTTP/1.1 '.$response['status'].' '.$http_response_code[ $response['status'] ]);
				$res = '{"status":true, "url":"#login", "responseText":"Successfully created your account!... Please login..."}';
			}else{
				 // Set HTTP Response
				$response['status'] = 404;
				header('HTTP/1.1 '.$response['status'].' '.$http_response_code[ $response['status'] ]);
				
				$res = '{"status":false, "responseText": "Not able to create user at this time... Please try after some time...!!"}';
			}
			echo $res;
		}
	}
?>