<?php 

// logs into the sql database
$user = 'root';
$pass = '';
$db = 'lanban';


// estavlishes a connection
$db = new mysqli ('localhost', $user, $pass, $db) or die("unable to connect");



$id = mysqli_real_escape_string($db,$_POST["id"]);
$state = mysqli_real_escape_string($db,$_POST["state"]);

$query = mysqli_query($db, "UPDATE tbltasks SET state = $state WHERE taskID = $id");