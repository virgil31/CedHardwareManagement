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
    $sort = $_GET['sort'];
	$json = json_decode($sort,true);
	$property = $json[0]['property'];
	$direction = $json[0]['direction'];
	$limit = $_GET['limit'];
	$start = $_GET['start'];
	$total = 0;

    $query = "";
    $where = "";
    $parametri = array();

    // SELECT / FROM
    $query .= "
        SELECT tmt_id as id_tipo, tmt_tipo as tipo, tmt_marca as marca, tmt_modello as modello,
            tmt_caratteristiche as caratteristiche, tmt_note as note,
            CONCAT(tmt_tipo,' ',tmt_marca,' ',tmt_modello) as testo_per_combobox, COUNT(*) OVER() as total
        FROM tipi_materiale
    ";
    /*
    // WHERE
    if(isset($_GET["num_fattura"])) {
        $where .= " AND acq_num_fattura = :num_fattura";
        $parametri['num_fattura'] = $_GET["num_fattura"];
    }
    if(isset($_GET["data_fattura"])) {
        $where .= " AND acq_data_fattura = :data_fattura";
        $parametri['data_fattura'] = $_GET["data_fattura"];
    }
    if(isset($_GET["num_ddt"])) {
        $where .= " AND acq_num_ddt = :num_ddt";
        $parametri['num_ddt'] = $_GET["num_ddt"];
    }
    if(isset($_GET["data_ddt"])) {
        $where .= " AND acq_data_ddt = :data_ddt";
        $parametri['data_ddt'] = $_GET["data_ddt"];
    }
    if(isset($_GET["fornitore"])) {
        $where .= " AND acq_fornitore = :fornitore";
        $parametri['fornitore'] = $_GET["fornitore"];
    }
    if(strlen($where) > 0) {
        $where = " WHERE " . substr($where, 5);
        $query .= $where;
    }*/
    // ORDER
    $query .= " ORDER BY $property $direction, marca, modello ";
    if(!isset($_GET["flag_full"])) {
        $query .= " LIMIT $limit OFFSET $start ";
    }

    $statement = $pdo->prepare($query);
    $statement->execute($parametri);
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

    try {
        $pdo->beginTransaction();

    	$s = $pdo->prepare("
    		INSERT INTO tipi_materiale(tmt_id, tmt_tipo, tmt_marca, tmt_modello, tmt_caratteristiche, tmt_note)
    		VALUES(:id_tipo, :tipo, :marca, :modello, :caratteristiche, :note)
    	");

        $id = getGUID();

    	$success = $s->execute(array(
    		"id_tipo" => $id,
            "tipo" => $data["tipo"],
            "marca" => $data["marca"],
            "modello" => $data["modello"],
            "caratteristiche" => $data["caratteristiche"],
            "note" => $data["note"]
    	));

        $pdo->commit();

    	echo json_encode(array(
            "success" => $success,
    		"eventual_error" => $pdo->errorInfo(),
            "result" => array(
                "id_acquisto" => $id
            )
        ));

    } catch (PDOException $e) {
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
    		UPDATE tipi_materiale
    		SET tmt_tipo = :tipo,
                tmt_marca = :marca,
                tmt_modello = :modello,
                tmt_caratteristiche = :caratteristiche,
                tmt_note = :note
    		WHERE tmt_id = :id_tipo
    	");

        $success = $s->execute(array(
    		"id_tipo" => $data["id_tipo"],
            "tipo" => $data["tipo"],
            "marca" => $data["marca"],
            "modello" => $data["modello"],
            "caratteristiche" => $data["caratteristiche"],
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
    		DELETE FROM tipi_materiale
            WHERE tmt_id = :id_tipo
    	");

    	$success = $s->execute(array(
    		"id_tipo" => $data["id_tipo"]
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
