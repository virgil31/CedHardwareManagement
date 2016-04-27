<?php


header('Content-Type: application/json');

$ini_array = parse_ini_file("../config.ini");

$pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);

$richiesta_id = $_POST["richiesta_id"];

$statement = $pdo->prepare("
	SELECT stato
	FROM richiesta
	WHERE id = $richiesta_id
");

$statement->execute();
$result = $statement->fetchAll(PDO::FETCH_OBJ);

$stato = (count($result) == 0) ? 'Inesistente' : $result[0]->stato;

sleep(3);

echo json_encode(array(
	"stato" => strtoupper($stato)
));
