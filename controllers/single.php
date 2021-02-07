<?php 

require 'connection.php';

if (isset($_POST['id'])) {
    $id = $_POST['id'];

    $query = "SELECT * FROM chores WHERE id = $id";
    $result = mysqli_query($connect, $query);

    if (!$result) {
        die('Query Failed' . mysqli_error($connect));
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
    $jsonString = json_encode($json[0]);
    echo $jsonString;
}