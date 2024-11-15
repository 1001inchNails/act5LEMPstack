<?php
$servername = "localhost";
$username = "root";
$password = ""; // admin, si la pide
$dbname = "Usuarios";
$conn = new mysqli($servername, $username, $password, $dbname);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $indice = $_POST["indice"];
}


$sql = "DELETE FROM agenda WHERE indice=?";
$peticion = $conn->prepare($sql);
$peticion->bind_param("i", $indice);// para linkear los parametros al query
try {
  $peticion->execute();
  echo "Dato borrado correctamente";
} catch (Exception $e) {
  echo "Error al borrar dato: " . $e->getMessage();
}


$conn->close();
?>