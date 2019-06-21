<?php
	session_start();

	$conn = new mysqli("localhost", "root", "", "testing");

	$output = array();
	$sql = "SELECT * FROM members WHERE username = '".$_SESSION['user']."'";
	$query=$conn->query($sql);
	while($row=$query->fetch_array()){
		$output[] = $row;
	}

	echo json_encode($output);
?>