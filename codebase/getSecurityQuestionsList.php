<?php
	@include('dbConnect.php');
	
	$obj = new securityQuestions();
	// Define HTTP responses
    $http_response_code = array(200 => 'OK', 400 => 'Bad Request', 401 => 'Unauthorized', 403 => 'Forbidden', 404 => 'Not Found', 405 => 'Error');
	header('Content-Type: application/json; charset=utf-8');
	
	return $obj->getSecurityQuestionsList($http_response_code);
	
	class securityQuestions{
		public function getSecurityQuestionsList($http_response_code){
			$flag = false;
			$dbConnect = new taClassifiedDBConnect();
			if($dbConnect->authenticateDB()){
				if($dbConnect->connectToDB()){
					$search_query = "select * from taclassifiedquestions";
					$search_result = mysql_query($search_query);
					$classifiedsData = array();  $classifiedItem = array(); $count=0;
					while ($search_row = mysql_fetch_array($search_result)) {
						$flag = true;
						$classifiedItem['option'] = $search_row['tacquestion'];
						$classifiedItem['value'] = $search_row['tacquestionval'];
						$classifiedsData[$count++] = $classifiedItem;
					}
				}else{
					return "false";
				}
			}else{
				return false;
			}
			if($flag){
				 // Set HTTP Response
				$response['status'] = 200;
				header('HTTP/1.1 '.$response['status'].' '.$http_response_code[ $response['status'] ]);
				
				echo json_encode($classifiedsData);
			}else{
				 // Set HTTP Response
				$response['status'] = 404;
				header('HTTP/1.1 '.$response['status'].' '.$http_response_code[ $response['status'] ]);
				
				$res = '{"status": false, "responseText": "There are no Classifieds posted by you!...:) Post one by click on Post a Classified Link from the menu!..."}';
				echo $res;
			}
		}
	}
?>