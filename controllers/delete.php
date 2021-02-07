<?php

require 'connection.php';

if (isset($_POST['id'])) {
    $id = $_POST['id'];
    /*=====================================================
    <|-Query To Ask The Server To Delete The Homework   -|>
    =====================================================*/
    $query = "DELETE FROM chores WHERE id = $id";
    $result = mysqli_query($connect, $query);

    if (!$result) {
        die('Query Failed' . mysqli_error($connect));
    }
}
