<?php

header('Content-Type: application/json');

$ini_array = parse_ini_file("../config.ini");

$pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);

$seriale = $_POST["seriale"];
$modello_id = $_POST["modello_id"];


//il controllo cambia quando sto editando:
// NON CONTO il seriale stesso che sto modificando
if(isset($_POST["seriale_id"])){
    $seriale_id = $_POST["seriale_id"];

    $statement = $pdo->prepare("
    	SELECT *
    	FROM seriale_modello
    	WHERE seriale like :seriale
            AND modello_id = :modello_id
            AND id != :seriale_id
    ");

    $params = array(
    	"seriale" => $seriale,
        "modello_id" => $modello_id,
        "seriale_id" => $seriale_id
    );
}
//altrimenti il controllo è "banale"
else{
    $statement = $pdo->prepare("
    	SELECT *
    	FROM seriale_modello
    	WHERE seriale like :seriale
            AND modello_id = :modello_id
    ");

    $params = array(
    	"seriale" => $seriale,
        "modello_id" => $modello_id
    );
}




$statement->execute($params);
$result = $statement->fetchAll(PDO::FETCH_OBJ);


echo json_encode(array(
	"result" => count($result) > 0	//torna TRUE se è un duplicato, altrimenti FALSE
));
