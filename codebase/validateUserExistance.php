<?php
	@include('dbConnect.php');
	
	$obj = new userExistance();
	$username = $_POST['username'];

	// Define HTTP responses
    $http_response_code = array(200 => 'OK', 400 => 'Bad Request', 401 => 'Unauthorized', 403 => 'Forbidden', 404 => 'Not Found', 405 => 'Error');
	header('Content-Type: application/json; charset=utf-8');
	
	return $obj->isUserExists($username, $http_response_code);
	
	class userExistance{
		public function isUserExists($uname, $http_response_code){
			$flag = false;
			$dbConnect = new taClassifiedDBConnect();
			if($dbConnect->authenticateDB()){
				if($dbConnect->connectToDB()){
					$search_query = "select * from taclassifiedusers";
					$search_result = mysql_query($search_query);
					while ($search_row = mysql_fetch_array($search_result)) {
						if($uname == $search_row['empemail']){
							$flag = true;
							break;
						}
					}
				}else{
					return "false";
				}
			}else{
				return false;
			}
			if($flag){
				 // Set HTTP Response
				$response['status'] = 404;
				header('HTTP/1.1 '.$response['status'].' '.$http_response_code[ $response['status'] ]);
				
				$res = '{"responseText":"User is already Exists!..."}';
			}else{
				 // Set HTTP Response
				$response['status'] = 200;
				header('HTTP/1.1 '.$response['status'].' '.$http_response_code[ $response['status'] ]);
				
				$res = '{"responseText": "OK"}';
			}
			echo $res;
		}
	}
?>