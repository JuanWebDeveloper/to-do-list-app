<?php

require 'connection.php';

/*=====================================================
<|-Query To Fetch The Values ​From The Database      -|>
=====================================================*/
$query = "SELECT * FROM chores";
$result = mysqli_query($connect, $query);

if (!$result) {
    die("Query failed" . mysqli_error($connect));
}

/*=====================================================
<|-Creating An Object Foreach Data In The Database  -|>
=====================================================*/
$json = array();
while($row = mysqli_fetch_array($result)) {
    $json[] = array(
        'name' => $row['name'],
        'description' => $row['description'],
        'id' => $row['id']
    );
}

/*===========================
<|-Returning The Json Data-|>
===========================*/
$jsonString = json_encode($json);
echo $jsonString;

