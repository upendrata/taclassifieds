<?php
	@include('dbConnect.php');
	
	$obj = new classifieds();
	// Define HTTP responses
    $http_response_code = array(200 => 'OK', 400 => 'Bad Request', 401 => 'Unauthorized', 403 => 'Forbidden', 404 => 'Not Found', 405 => 'Error');
	header('Content-Type: application/json; charset=utf-8');
	
	return $obj->getClassifieds($http_response_code);
	
	class classifieds{
		public function getClassifieds($http_response_code){
			$flag = false;
			$dbConnect = new taClassifiedDBConnect();
			if($dbConnect->authenticateDB()){
				if($dbConnect->connectToDB()){
					$search_query = "select * from taclassifieds where classifiedDisplay = 1 order by classifiedId DESC";
					$search_result = mysql_query($search_query);
					$classifiedsData = array();  $classifiedItem = array(); $count=0;
					while ($search_row = mysql_fetch_array($search_result)) {
						$flag = true;
						$classifiedItem['classifiedId'] = $search_row['classifiedId'];
						$classifiedItem['empemail'] = $search_row['empemail'];
						$classifiedItem['classifiedHeading'] = $search_row['classifiedHeading'];
						$classifiedItem['classifiedCategory'] = $search_row['classifiedCategory'];
						$classifiedItem['classifiedNegotiable'] = $search_row['classifiedNegotiable'];
						$classifiedItem['classifiedPrice'] = $search_row['classifiedPrice'];
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
				$obj = (object)[
					"allClassifieds"=>$classifiedsData
				];
				
				echo json_encode($obj);
			}else{
				 // Set HTTP Response
				$response['status'] = 404;
				header('HTTP/1.1 '.$response['status'].' '.$http_response_code[ $response['status'] ]);
				
				$res = '{"status": false, "responseText": "No Classifieds posted...:) Post one by click on Post a Classified Link from the menu!"}';
				echo $res;
			}
		}
	}
?>