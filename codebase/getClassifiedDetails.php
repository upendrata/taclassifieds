<?php
	@include('dbConnect.php');
	
	$obj = new classifiedDetails();
	// Define HTTP responses
    $http_response_code = array(200 => 'OK', 400 => 'Bad Request', 401 => 'Unauthorized', 403 => 'Forbidden', 404 => 'Not Found', 405 => 'Error');
	header('Content-Type: application/json; charset=utf-8');
	
	$classifiedId = $_GET['classifiedId'];
	return $obj->getClassifiedDetails($classifiedId,$http_response_code);
	
	class classifiedDetails{
		public function getClassifiedDetails($classifiedId, $http_response_code){
			$flag = false;
			$dbConnect = new taClassifiedDBConnect();
			if($dbConnect->authenticateDB()){
				if($dbConnect->connectToDB()){
					$search_query = "select * from taclassifieds where classifiedId = '$classifiedId'";
					$search_result = mysql_query($search_query);
					$classifiedsData = array();  $classifiedItem = array(); $count=0; $classifiedImgs = array();
					while ($search_row = mysql_fetch_array($search_result)) {
						$flag = true;
						$classifiedItem['classifiedHeading'] = $search_row['classifiedHeading'];
						$classifiedItem['classifiedCategory'] = $search_row['classifiedCategory'];
						$classifiedItem['classifiedDesc'] = $search_row['classifiedDesc'];
						$classifiedItem['classifiedNegotiable'] = $search_row['classifiedNegotiable'];
						$classifiedItem['classifiedPrice'] = $search_row['classifiedPrice'];
						array_push($classifiedImgs, $search_row['classifiedImg1']);
						array_push($classifiedImgs, $search_row['classifiedImg2']);
						array_push($classifiedImgs, $search_row['classifiedImg3']);
						array_push($classifiedImgs, $search_row['classifiedImg4']);
						array_push($classifiedImgs, $search_row['classifiedImg5']);
						$classifiedItem['classifiedImgs'] = $classifiedImgs;
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