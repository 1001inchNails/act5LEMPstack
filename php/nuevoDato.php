<?php
$servername = "localhost";
$username = "root";
$password = ""; // admin, si la pide
$dbname = "Usuarios";
$conn = new mysqli($servername, $username, $password, $dbname);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $indice = $_POST["indice"];
    $nombre = $_POST["nombre"];
    $apellido1 = $_POST["apellido1"];
    $apellido2 = $_POST["apellido2"];
    $DNI = $_POST["DNI"];
    $direccion = $_POST["direccion"];
    $telefono = $_POST["telefono"];
    $fotoDirecc = $_POST["fotoDirecc"];
}

$sql = "INSERT INTO agenda (indice, DNI, nombre, apellido1, apellido2, direccion, telefono, foto)
VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
$peticion = $conn->prepare($sql);
$peticion->bind_param("ssssssss", $indice, $nombre, $apellido1, $apellido2, $DNI, $direccion, $telefono, $fotoDirecc); // para linkear los parametros al query
try {
  $peticion->execute();
  echo "Datos agregados correctamente";
} catch (Exception $e) {
  echo "Error al agregar datos: " . $e->getMessage();
}

$conn->close();
?>