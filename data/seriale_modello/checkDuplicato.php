<?php

header('Content-Type: application/json');

$ini_array = parse_ini_file("../config.ini");

$pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);

$seriale = $_POST["seriale"];

$statement = $pdo->prepare("
	SELECT *
	FROM seriale_modello
	WHERE seriale like :seriale
");

$params = array(
	"seriale" => $seriale
);


$statement->execute($params);
$result = $statement->fetchAll(PDO::FETCH_OBJ);


echo json_encode(array(
	"result" => count($result) > 0	//torna TRUE se è un duplicato, altrimenti FALSE
));
