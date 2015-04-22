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
					
					$empid = mysql_real_escape_string($_POST['empid']); $empname = mysql_real_escape_string($_POST['empname']);
					$empemail = mysql_real_escape_string($_POST['empemail']); $emppassword = mysql_real_escape_string($_POST['emppassword']);
					$empquestion = mysql_real_escape_string($_POST['empquestion']); $empqans = mysql_real_escape_string($_POST['empqans']);
					
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
				
				$res = '{"status":false, "responseText": "Not able to Save data in DB!..."}';
			}
			echo $res;
		}
	}
?>