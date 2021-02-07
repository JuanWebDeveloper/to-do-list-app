<?php

require 'connection.php';

/*=====================================================
<|-We Send The Data To The Database                 -|>
=====================================================*/
if (isset($_POST['name']) && isset($_POST['description'])) {
    /*===========================
    <|-Variables              -|>
    ===========================*/
    $name = trim($_POST['name']);
    $name = htmlspecialchars($_POST['name']);
    $name = filter_var($name, FILTER_SANITIZE_STRING);
    $description = trim($_POST['description']);
    $description = htmlspecialchars($_POST['description']);
    $description = filter_var($description, FILTER_SANITIZE_STRING);

    /*===========================
    <|-Sending The Data       -|>
    ===========================*/
    $query = "INSERT INTO chores(name, description) VALUES ('$name', '$description')";
    $result = mysqli_query($connect, $query);

    if (!$result) {
        die('Query Failed' . mysqli_error($connect));
    }
}