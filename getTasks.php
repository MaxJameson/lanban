<?php 

// logs into the sql database
$user = 'root';
$pass = '';
$db = 'lanban';


// estavlishes a connection
$db = new mysqli ('localhost', $user, $pass, $db) or die("unable to connect");



$query = mysqli_query($db, "SELECT tbltasks.taskID, tbltasks.Name, tbltasks.details, tbltasks.state, tbltasks.created FROM tbltasks");


// stores the query result
$result = mysqli_fetch_all($query, MYSQLI_ASSOC);


// returns the result
exit(json_encode($result));
