<?php 

// logs into the sql database
$user = 'root';
$pass = '';
$db = 'lanban';


// estavlishes a connection
$db = new mysqli ('localhost', $user, $pass, $db) or die("unable to connect");



$id = mysqli_real_escape_string($db,$_POST["id"]);

$query = mysqli_query($db, "DELETE FROM tbltasks WHERE taskID = $id");