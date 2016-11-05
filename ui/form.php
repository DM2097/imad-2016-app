<?php
$name=$_POST['name'];
$email=$_POST['email'];
$message=$_POST['message'];
$to='dhanesh2013.500@gmail.com';
$subject='Website Contact Form';
$msg= $name . " " .$email . " " . $message;
/*$headers = "From:" . $email . "\r\n";*/
mail($to,$subject,$msg);

?>
