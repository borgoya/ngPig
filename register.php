<?php
session_start();
$conn = new mysqli("localhost", "root", "", "testing");
$form_data = json_decode(file_get_contents("php://input"));

$message = '';
$validation_error = '';
var_dump($form_data);

if(empty($form_data->firstname))
{
    $error[] = 'Name is Required';
}
else
{
    $data[':firstname'] = $form_data->firstname;
}

if(empty($form_data->username))
{
    $error[] = 'Email is Required';
}
else
{
    if(!filter_var($form_data->username, FILTER_VALIDATE_EMAIL))
    {
        $error[] = 'Invalid Email Format';
    }
    else
    {
        $data[':email'] = $form_data->username;
    }
}

if(empty($form_data->password)){
    $error[] = 'Password is Required';
}
else{
    $data[':password'] = password_hash($form_data->password, PASSWORD_DEFAULT);
}

if(empty($error)){
    
    $query = "INSERT INTO members (username, password, firstname, lastname,address) 
                VALUES 
                ('$form_data->username', '$form_data->password', 
                '$form_data->firstname','$form_data->lastname', '$form_data->address')";
    if(mysqli_query($conn, $query) === TRUE){
        $message = 'Registration Completed';
    }
}
else{
    $out['error'] = true;
	$out['message'] = 'Invalid Login';
}

echo json_encode($out);


?>
