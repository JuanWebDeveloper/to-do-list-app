<?php

require 'connection.php';

/*===========================
<|-Variables              -|>
===========================*/
$id = $_POST['id'];
$name = trim($_POST['name']);
$name = htmlspecialchars($_POST['name']);
$name = filter_var($name, FILTER_SANITIZE_STRING);
$description = trim($_POST['description']);
$description = htmlspecialchars($_POST['description']);
$description = filter_var($description, FILTER_SANITIZE_STRING);

/*=====================================================
<|-Requesting The Change Of Data In The Database    -|>
=====================================================*/
$query = "UPDATE chores SET name = '$name', description = '$description' WHERE id = '$id'";
$result = mysqli_query($connect, $query);

if (!$result) {
    die('Query Failed' . mysqli_error($connect));
}
