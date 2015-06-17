<?php
	class taClassifiedDBConnect{
		public function authenticateDB(){
			return mysql_connect("localhost", "root", "root");
		}
		public function connectToDB(){
			return mysql_select_db("taclassifieds"); 
		}
	}
?>