<?php
	@include('dbConnect.php');
	
	$obj = new taClassifieds();
	
	// Define HTTP responses
    $http_response_code = array(200 => 'OK', 400 => 'Bad Request', 401 => 'Unauthorized', 403 => 'Forbidden', 404 => 'Not Found', 405 => 'Error');
	header('Content-Type: application/json; charset=utf-8');
	
	return $obj->postAClassified($http_response_code);
	
	class taClassifieds{
		public function postAClassified($http_response_code){
			$flag = false;
			$dbConnect = new taClassifiedDBConnect();
			if($dbConnect->authenticateDB()){
				if($dbConnect->connectToDB()){
					$empemail = mysql_real_escape_string($_POST['empemail']); $classifiedCategory = mysql_real_escape_string($_POST['classifiedCategory']);
					$classifiedHeading = mysql_real_escape_string($_POST['classifiedHeading']); $classifiedDesc = mysql_real_escape_string($_POST['classifiedDesc']); 
					
					$noOfClassifieds = "select * from taclassifieds";
					$data = mysql_query($noOfClassifieds);
					$classifiedId = 1;
					while($row = mysql_fetch_array($data)){
						$classifiedId++;
					}
					
					$postAdQuery = "INSERT INTO taclassifieds(empemail, classifiedId, classifiedCategory, classifiedHeading, classifiedDesc, classifiedDisplay) VALUES ('$empemail', '$classifiedId', '$classifiedCategory', '$classifiedHeading', '$classifiedDesc', 1)";
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
				$res = '{"status":true, "url":"#myclassifieds", "responseText":"Successfully Posted your Classified!..."}';
			}else{
				 // Set HTTP Response
				$response['status'] = 404;
				header('HTTP/1.1 '.$response['status'].' '.$http_response_code[ $response['status'] ]);
				
				$res = '{"status":false, "responseText": "Something went wrong not able to post your classified at the moment please try after some time!..."}';
			}
			echo $res;
		}
	}
?>