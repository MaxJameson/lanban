<?php 

// logs into the sql database
$user = 'root';
$pass = '';
$db = 'lanban';


// estavlishes a connection
$db = new mysqli ('localhost', $user, $pass, $db) or die("unable to connect");


$name = mysqli_real_escape_string($db,$_POST["name"]);
$details = mysqli_real_escape_string($db,$_POST["details"]);
$state = mysqli_real_escape_string($db,$_POST["state"]);
$created = mysqli_real_escape_string($db,$_POST["created"]);

$query = mysqli_query($db, "INSERT INTO `tbltasks`(`Name`,`details`,`state`,`created`) VALUES ('$name','$details','$state','$created')");

// stores new users ID
$ID = $db->insert_id;

// returns ID to javascript
exit(json_encode($ID));


