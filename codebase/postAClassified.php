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
			$mydate=getdate(date("U"));
			$classifiedId = $mydate['mday'].$mydate['mon'].$mydate['year'].$mydate['hours'].$mydate['minutes'].$mydate['seconds'];
			$dbConnect = new taClassifiedDBConnect();
			if($dbConnect->authenticateDB()){
				if($dbConnect->connectToDB()){
				
					$empemail = mysql_real_escape_string($_POST['empemail']); $classifiedCategory = mysql_real_escape_string($_POST['classifiedCategory']);
					$classifiedHeading = mysql_real_escape_string($_POST['classifiedHeading']); $classifiedDesc = mysql_real_escape_string($_POST['classifiedDesc']); 
					$classifiedNegotiable = mysql_real_escape_string($_POST['classifiedNegotiable']); $classifiedPrice = mysql_real_escape_string($_POST['classifiedPrice']); 

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
					if(count($files)==1){
						$postAdQuery = "INSERT INTO taclassifieds(empemail, classifiedId, classifiedCategory, classifiedHeading, classifiedDesc, classifiedDisplay, classifiedNegotiable, classifiedPrice, classifiedImg1, classifiedImg2, classifiedImg3, classifiedImg4, classifiedImg5) VALUES ('$empemail', '$classifiedId', '$classifiedCategory', '$classifiedHeading', '$classifiedDesc', 1, '$classifiedNegotiable', '$classifiedPrice', '$files[0]', null, null, null, null)";
					}else if(count($files)==2){
						$postAdQuery = "INSERT INTO taclassifieds(empemail, classifiedId, classifiedCategory, classifiedHeading, classifiedDesc, classifiedDisplay, classifiedNegotiable, classifiedPrice, classifiedImg1, classifiedImg2) VALUES ('$empemail', '$classifiedId', '$classifiedCategory', '$classifiedHeading', '$classifiedDesc', 1, '$classifiedNegotiable', '$classifiedPrice', '$files[0]', '$files[1]')";
					}else if(count($files)==3){
						$postAdQuery = "INSERT INTO taclassifieds(empemail, classifiedId, classifiedCategory, classifiedHeading, classifiedDesc, classifiedDisplay, classifiedNegotiable, classifiedPrice, classifiedImg1, classifiedImg2, classifiedImg3) VALUES ('$empemail', '$classifiedId', '$classifiedCategory', '$classifiedHeading', '$classifiedDesc', 1, '$classifiedNegotiable', '$classifiedPrice', '$files[0]', '$files[1]', '$files[2]')";
					}else if(count($files)==4){
						$postAdQuery = "INSERT INTO taclassifieds(empemail, classifiedId, classifiedCategory, classifiedHeading, classifiedDesc, classifiedDisplay, classifiedNegotiable, classifiedPrice, classifiedImg1, classifiedImg2, classifiedImg3, classifiedImg4) VALUES ('$empemail', '$classifiedId', '$classifiedCategory', '$classifiedHeading', '$classifiedDesc', 1, '$classifiedNegotiable', '$classifiedPrice', '$files[0]', '$files[1]', '$files[2]', '$files[3]')";
					}else if(count($files)==5){
						$postAdQuery = "INSERT INTO taclassifieds(empemail, classifiedId, classifiedCategory, classifiedHeading, classifiedDesc, classifiedDisplay, classifiedNegotiable, classifiedPrice, classifiedImg1, classifiedImg2, classifiedImg3, classifiedImg4, classifiedImg5) VALUES ('$empemail', '$classifiedId', '$classifiedCategory', '$classifiedHeading', '$classifiedDesc', 1, '$classifiedNegotiable', '$classifiedPrice', '$files[0]', '$files[1]', '$files[2]', '$files[3]', '$files[4]')";
					}else{
						$postAdQuery = "INSERT INTO taclassifieds(empemail, classifiedId, classifiedCategory, classifiedHeading, classifiedDesc, classifiedDisplay, classifiedNegotiable, classifiedPrice, classifiedImg1, classifiedImg2, classifiedImg3, classifiedImg4, classifiedImg5) VALUES ('$empemail', '$classifiedId', '$classifiedCategory', '$classifiedHeading', '$classifiedDesc', 1, null, null, null, null, null, null, null)";
					}

					if(mysql_query($postAdQuery)){	
						$flag = true;
					}
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
				$res = '{"status":true, "url":"#myclassifieds", "id":"'.$classifiedId.'", "responseText":"Successfully Posted your Classified!..."}';
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