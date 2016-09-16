<?php

require_once("../util/util.php");

header('Content-Type: application/json');

$ini_array = parse_ini_file("../config.ini");

$pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);

// LISTA
if($_SERVER['REQUEST_METHOD'] === "GET"){
    lista($pdo);
}

// CREAZIONE
else if($_SERVER['REQUEST_METHOD'] === "POST"){
    crea($pdo);
}

// MODIFICA
else if($_SERVER['REQUEST_METHOD'] === "PUT"){
    modifica($pdo);
}

// ELIMINAZIONE
else if($_SERVER['REQUEST_METHOD'] === "DELETE"){
    elimina($pdo);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// LISTA
function lista($pdo){
}



// CREAZIONE
function crea($pdo){
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

}

// MODIFICA
function modifica($pdo){
    parse_str(file_get_contents("php://input"),$params);
    $data = json_decode($params['data'],true);

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
}

// ELIMINA
function elimina($pdo){
}
