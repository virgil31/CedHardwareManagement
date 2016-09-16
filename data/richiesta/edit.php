<?php

require_once("../util/util.php");

header('Content-Type: application/json');

$ini_array = parse_ini_file("../config.ini");

$pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);

$data = json_decode($_POST['data'],true);


try{

    $pdo->beginTransaction();

	$s = $pdo->prepare("
		UPDATE richieste
		SET ric_cod_sede = :ric_cod_sede,
			ric_destinazione = :ric_destinazione,
			ric_id_responsabile = :ric_id_responsabile,
			ric_id_richiedente = :ric_id_richiedente,
			ric_motivazione = :ric_motivazione,
			ric_oggetto = :ric_oggetto

		WHERE ric_id = :ric_id
	");

	$success = $s->execute(array(
		"ric_id" => $data["ric_id"],
		"ric_cod_sede" => $data["ric_cod_sede"],
		"ric_destinazione" => $data["ric_destinazione"],
		"ric_id_responsabile" => $data["ric_id_responsabile"],
		"ric_id_richiedente" => $data["ric_id_richiedente"],
		"ric_motivazione" => $data["ric_motivazione"],
		"ric_oggetto" => $data["ric_oggetto"]
	));

    $pdo->commit();

	echo json_encode(array(
        "success" => $success,
		"eventual_error" => $pdo->errorInfo()
    ));

}catch(PDOException $e){
    $pdo->rollBack();

	echo json_encode(array(
        "success" => false,
		"ErrorMessage" => $e->getMessage()
    ));
}
