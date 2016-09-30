<?php

header('Content-Type: application/json');

require_once("../util/util.php");

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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// LISTA
function lista($pdo){
    $sort = (isset($_GET['sort']) ? $_GET['sort'] : $_GET['sort']);
	$tmp = json_decode($sort,true);
	$pro = $tmp[0]['property'];
	$dir = $tmp[0]['direction'];
	$limit = $_GET['limit'];
	$start = $_GET['start'];
	$total = 0;

    // LIST FULL
    if(isset($_GET["flag_full"])){
        $statement = $pdo->prepare("
            SELECT acc_id as id_accessorio,acc_tipo as tipo,acc_marca as marca,acc_modello as modello,acc_caratteristiche as caratteristiche,
                acc_note as note, acc_quantita as quantita, COUNT(*) OVER() as total
    		FROM accessori
    		ORDER BY $pro $dir
    	");
    }
    // LIST PAGINATO
    else{
        $statement = $pdo->prepare("
            SELECT acc_id as id_accessorio,acc_tipo as tipo,acc_marca as marca,acc_modello as modello,acc_caratteristiche as caratteristiche,
                acc_note as note, acc_quantita as quantita, COUNT(*) OVER() as total
            FROM accessori
            ORDER BY $pro $dir LIMIT $limit OFFSET $start
    	");
    }

	$statement->execute();
	$result = $statement->fetchAll(PDO::FETCH_OBJ);


	if(count($result) != 0)
		$total = $result[0]->total;

	echo json_encode(array(
		"result" => $result,
		"total" => $total
	));
}



// CREAZIONE
function crea($pdo){
    $data = json_decode($_POST['data'],true);

    try{
        $pdo->beginTransaction();

    	$s = $pdo->prepare("
    		INSERT INTO accessori(acc_id,acc_tipo,acc_marca,acc_modello,acc_caratteristiche,acc_quantita,acc_note)
    		VALUES(:id_accessorio,:tipo,:marca,:modello,:caratteristiche,:quantita,:note)
    	");

        $id = getGUID();

    	$success = $s->execute(array(
    		"id_accessorio" => $id,
    		"tipo" => $data["tipo"],
    		"marca" => $data["marca"],
    		"modello" => $data["modello"],
    		"caratteristiche" => $data["caratteristiche"],
    		"quantita" => $data["quantita"],
    		"note" => $data["note"]
    	));

        $pdo->commit();

    	echo json_encode(array(
            "success" => $success,
    		"eventual_error" => $pdo->errorInfo(),
            "result" => array(
                "id_accessorio" => $id
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
    		UPDATE accessori
    		SET acc_tipo = :tipo,
                acc_marca = :marca,
                acc_modello = :modello,
                acc_caratteristiche = :caratteristiche,
                acc_quantita = :quantita,
                acc_note = :note
    		WHERE acc_id = :id_accessorio
    	");

        $success = $s->execute(array(
    		"id_accessorio" => $data["id_accessorio"],
    		"tipo" => $data["tipo"],
    		"marca" => $data["marca"],
    		"modello" => $data["modello"],
    		"caratteristiche" => $data["caratteristiche"],
    		"quantita" => $data["quantita"],
    		"note" => $data["note"]
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
    parse_str(file_get_contents("php://input"),$params);
    $data = json_decode($params['data'],true);

    try{

        $pdo->beginTransaction();

    	$s = $pdo->prepare("
    		DELETE FROM accessori
            WHERE acc_id = :id_accessorio
    	");

    	$success = $s->execute(array(
    		"id_accessorio" => $data["id_accessorio"]
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
