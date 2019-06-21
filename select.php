<?php  
session_start();
 $connect = mysqli_connect("localhost", "root", "", "testing");  
 $output = array();  
 $query = "SELECT * FROM tbl_images ORDER BY id DESC";  
 $result = mysqli_query($connect, $query);  
 while($row = mysqli_fetch_array($result))  
 {  
      $output[] = $row;  
 }  
 echo json_encode($output);  
 ?>  