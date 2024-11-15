CREATE DATABASE Usuarios;
USE Usuarios;
-- SELECT * FROM agenda;
CREATE TABLE adminCred(
indice int NOT NULL,
login varchar(25),
passw varchar(25),
PRIMARY KEY (indice)
);
INSERT INTO adminCred (indice,login,passw) VALUES
(1,"admin", "admin");


CREATE TABLE agenda(
indice int NOT NULL,
DNI varchar(10),
nombre varchar(25),
apellido1 varchar(25),
apellido2 varchar(25),
direccion varchar(50),
telefono varchar(20),
foto varchar(50),
PRIMARY KEY (indice)
);
INSERT INTO agenda (indice,DNI,nombre,apellido1,apellido2,direccion,telefono,foto) VALUES
(1,"56221568Q", "Pepe1", "Seagal", "Garcia", "Via Pepe 15", "666123456",'../pics/01.png'),
(2,"46221568Q", "Pepe2", "Seagal", "Ortiz", "Calle Pepe 15", "666123457",'../pics/02.png'),
(3,"66221568Q", "Pepe3", "Seagal", "Norris", "Avenida Pepe 15", "666123458",'../pics/03.png'),
(4,"76221568Q", "Pepe4", "Seagal", "Fernandez", "Camino Pepe 15", "666123459",'../pics/04.png'),
(5,"36221568Q", "Pepe5", "Seagal", "Castro", "Ronda Pepe 15", "666123466",'../pics/05.png'),
(6,"46881568Q", "Pepe6", "Seagal", "Villa", "Travesia Pepe s/n", "666123476",'../pics/06.png'),
(7,"61234568Q", "Pepe7", "Seagal", "Velazquez", "Bulevar Pepe 15", "666123486",'../pics/07.png'),
(8,"96221568Q", "Pepe8", "Seagal", "Pereira", "Callejon Pepe 15", "666123496",'../pics/08.png'),
(9,"56226768Q", "Pepe9", "Seagal", "Lagoa", "Cañada Pepe 15", "666123556",'../pics/09.png'),
(10,"75221568Q", "Pepe10", "Seagal", "Martinez", "Plaza Pepe 15", "666123656",'../pics/10.png');