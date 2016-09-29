<?php

header('Content-Type: application/json');

$ini_array = parse_ini_file("../config.ini");

$pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);

// LISTA
if($_SERVER['REQUEST_METHOD'] === "GET"){
    sleep(1);
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
    		SELECT sed_cod_sede, sed_descrizione, sed_note, COUNT(*) OVER() as total
    		FROM sedi
    		ORDER BY $pro $dir
    	");
    }
    // LIST PAGINATO
    else{
        $statement = $pdo->prepare("
    		SELECT sed_cod_sede, sed_descrizione, sed_note, COUNT(*) OVER() as total
    		FROM sedi
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
    		INSERT INTO sedi(sed_cod_sede,sed_descrizione, sed_note)
    		VALUES(:sed_cod_sede,:sed_descrizione,:sed_note)
    	");

    	$success = $s->execute(array(
    		"sed_cod_sede" => $data["sed_cod_sede"],
    		"sed_descrizione" => $data["sed_descrizione"],
    		"sed_descrizione" => $data["sed_descrizione"]
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

// MODIFICA
function modifica($pdo){
    parse_str(file_get_contents("php://input"),$params);
    $data = json_decode($params['data'],true);

    try{

        $pdo->beginTransaction();

    	$s = $pdo->prepare("
    		UPDATE sedi
    		SET sed_descrizione = :sed_descrizione,
                sed_note = :sed_note
    		WHERE sed_cod_sede = :sed_cod_sede
    	");

    	$success = $s->execute(array(
    		"sed_descrizione" => $data["sed_descrizione"],
    		"sed_note" => $data["sed_note"],
    		"sed_cod_sede" => $data["sed_cod_sede"]
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
    		DELETE FROM sedi
            WHERE sed_cod_sede = :sed_cod_sede
    	");

    	$success = $s->execute(array(
    		"sed_cod_sede" => $data["sed_cod_sede"]
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
