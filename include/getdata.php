<?php

  $conn = mysqli_connect('localhost','root','','medify');

  if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers:{$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }
$data = array();

$sql = mysqli_query($conn, "SELECT * FROM medicine_list  ORDER BY medicine_list_ID desc");
while($row = mysqli_fetch_assoc($sql)){
//  echo $row['medicine_name'];
//  echo $row['medicine_quantity'];
  array_push($data, $row);
}

echo json_encode($data);
?>
