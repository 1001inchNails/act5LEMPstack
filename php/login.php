<?php
$servername = "localhost";
$username = "root";
$password = ""; // admin, si la pide
$dbname = "Usuarios";



function checkBBDDExists($servername, $username, $password, $dbname) {
    $mysqli = new mysqli($servername, $username, $password);
    
    if ($mysqli->connect_error) {
        die("Connection failed: " . $mysqli->connect_error);
    }

    $result = $mysqli->query("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '$dbname'");

    if ($result->num_rows > 0) {
        $mysqli->close();
        return true; // To be
    } else {
        $mysqli->close();
        return false; // Or not to be
    }    
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
if (!checkBBDDExists($servername, $username, $password, $dbname)) {

$conn = new mysqli($servername, $username, $password);  // si no, pues si



$sql = "CREATE DATABASE IF NOT EXISTS Usuarios";
if ($conn->query($sql) === TRUE) {
$conn->close(); // cerramos la de check, abrimos otra completa

$conn = new mysqli($servername, $username, $password, $dbname);


$sql = "CREATE TABLE IF NOT EXISTS adminCred (
        indice INT NOT NULL,
        login VARCHAR(25),
        passw VARCHAR(25),
        PRIMARY KEY (indice)
    )";
if ($conn->query($sql) === TRUE) {
    $adminData = array(
      array('indice' => 1, 'login' => 'admin', 'passw' => 'admin')
  );
    foreach ($adminData as $row) {
      $stmt = $conn->prepare("INSERT INTO adminCred VALUES (?, ?, ?)");
      $stmt->bind_param("iss", $row['indice'], $row['login'], $row['passw']);
      $stmt->execute();
  }
} else {
    echo "Error creating table adminCred: " . $conn->error;
}

$sql = "CREATE TABLE IF NOT EXISTS agenda (
        indice INT NOT NULL,
        DNI VARCHAR(10),
        nombre VARCHAR(25),
        apellido1 VARCHAR(25),
        apellido2 VARCHAR(25),
        direccion VARCHAR(50),
        telefono VARCHAR(20),
        foto VARCHAR(50),
        PRIMARY KEY (indice)
    )";
if ($conn->query($sql) === TRUE) {
    $agendaData = array(
      array('indice' => 1, 'DNI' => '56221568Q', 'nombre' => 'Pepe1', 'apellido1' => 'Seagal', 'apellido2' => 'Garcia',
             'direccion' => 'Via Pepe 15', 'telefono' => '666123456', 'foto' => '../pics/01.png'),
      array('indice' => 2, 'DNI' => '46221568Q', 'nombre' => 'Pepe2', 'apellido1' => 'Seagal', 'apellido2' => 'Ortiz',
             'direccion' => 'Calle Pepe 15', 'telefono' => '666123457', 'foto' => '../pics/02.png'),
      array('indice' => 3, 'DNI' => '66221568Q', 'nombre' => 'Pepe3', 'apellido1' => 'Seagal', 'apellido2' => 'Norris',
             'direccion' => 'Avenida Pepe 15', 'telefono' => '666123458', 'foto' => '../pics/03.png'),
      array('indice' => 4, 'DNI' => '76221568Q', 'nombre' => 'Pepe4', 'apellido1' => 'Seagal', 'apellido2' => 'Fernandez',
             'direccion' => 'Camino Pepe 15', 'telefono' => '666123459', 'foto' => '../pics/04.png'),
      array('indice' => 5, 'DNI' => '36221568Q', 'nombre' => 'Pepe5', 'apellido1' => 'Seagal', 'apellido2' => 'Castro',
             'direccion' => 'Ronda Pepe 15', 'telefono' => '666123466', 'foto' => '../pics/05.png'),
      array('indice' => 6, 'DNI' => '46881568Q', 'nombre' => 'Pepe6', 'apellido1' => 'Seagal', 'apellido2' => 'Villa',
             'direccion' => 'Travesia Pepe s/n', 'telefono' => '666123476', 'foto' => '../pics/06.png'),
      array('indice' => 7, 'DNI' => '61234568Q', 'nombre' => 'Pepe7', 'apellido1' => 'Seagal', 'apellido2' => 'Velazquez',
             'direccion' => 'Bulevar Pepe 15', 'telefono' => '666123486', 'foto' => '../pics/07.png'),
      array('indice' => 8, 'DNI' => '96221568Q', 'nombre' => 'Pepe8', 'apellido1' => 'Seagal', 'apellido2' => 'Pereira',
             'direccion' => 'Callejon Pepe 15', 'telefono' => '666123496', 'foto' => '../pics/08.png'),
      array('indice' => 9, 'DNI' => '56226768Q', 'nombre' => 'Pepe9', 'apellido1' => 'Seagal', 'apellido2' => 'Lagoa',
             'direccion' => 'Cañada Pepe 15', 'telefono' => '666123556', 'foto' => '../pics/09.png'),
      array('indice' => 10, 'DNI' => '75221568Q', 'nombre' => 'Pepe10', 'apellido1' => 'Seagal', 'apellido2' => 'Martinez',
             'direccion' => 'Plaza Pepe 15', 'telefono' => '666123656', 'foto' => '../pics/10.png'),
    );
    foreach ($agendaData as $row) {
      $stmt = $conn->prepare("INSERT INTO agenda VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
      $stmt->bind_param("ssssssss", $row['indice'], $row['DNI'], $row['nombre'], $row['apellido1'],
                        $row['apellido2'], $row['direccion'], $row['telefono'], $row['foto']);
      $stmt->execute();
  }

} else {
    echo "Error creating table agenda: " . $conn->error;
}

$conn->close();

}
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



$conn = new mysqli($servername, $username, $password, $dbname);


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST["nombre"];
    $passw = $_POST["passw"];
}

  $sql = "SELECT login, passw FROM adminCred WHERE indice=1";
  $result = $conn->query($sql);

  if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
      if($nombre==$row["login"] && $passw==$row["passw"]){
        echo true;
      }else{
        echo false;
      }
    }
  }

?>