<?php
$servername = "localhost";
$username = "root";
$password = ""; // admin, si la pide
$dbname = "Usuarios";
$conn = new mysqli($servername, $username, $password, $dbname);


$sql = "SELECT * FROM agenda";
$result = $conn->query(query: $sql);

$output=[];

if ($result->num_rows > 0) {    // si hay resultados
while($row = $result->fetch_assoc()) {  // mientras hay resultados
    $output[]= $row;    // agregamos al array
}


echo json_encode($output);
}

$conn->close();
?>