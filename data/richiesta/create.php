<?php

require_once("../util/util.php");

header('Content-Type: application/json');

$ini_array = parse_ini_file("../config.ini");

$pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);

$data = json_decode($_POST['data'],true);


try{

    $pdo->beginTransaction();

	$s = $pdo->prepare("
		INSERT INTO richieste(ric_id,ric_cod_sede,ric_destinazione,ric_id_responsabile,ric_id_richiedente,ric_motivazione,ric_oggetto,ric_data_presentazione,ric_stato)
		VALUES(:ric_id,:ric_cod_sede,:ric_destinazione,:ric_id_responsabile,:ric_id_richiedente,:ric_motivazione,:ric_oggetto,NOW(),'Da Valutare')
	");

    $id = getGUID();

	$success = $s->execute(array(
		"ric_id" => $id,
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
		"eventual_error" => $pdo->errorInfo(),
        "result" => array(
            "ric_id" => $id
        )
    ));

}catch(PDOException $e){
    $pdo->rollBack();

	echo json_encode(array(
        "success" => false,
		"ErrorMessage" => $e->getMessage()
    ));
}
