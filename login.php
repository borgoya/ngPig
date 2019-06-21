<?php

session_start();
	
$conn = new mysqli("localhost", "root", "", "testing");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$out = array('error' => false);

$user = json_decode(file_get_contents('php://input'));

$username = $user->username;
$password = $user->password;

$sql = "SELECT * FROM members WHERE username='$username' AND password='$password'";
$query = $conn->query($sql);

if($query->num_rows>0){
	$row = $query->fetch_array();
	$out['message'] = 'Login Successful';
	$out['user'] = uniqid('ang_');
	$_SESSION['user'] = $row['username'];
}
else{
	$out['error'] = true;
	$out['message'] = 'Invalid Login';
}

echo json_encode($out);

?>