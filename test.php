<?php
$response = array('success' => true);



/*$response = array(
     'firstName' => array('Password is bad'),
     'lastName' => array('Password is bad'),
      'userName' => array('Password is bad'),
      'email'    => array('Email already exists'),
      'password' => array('Password is bad'),
      'phone' => array('Password is bad')
  );*/

echo   json_encode($response);
?>