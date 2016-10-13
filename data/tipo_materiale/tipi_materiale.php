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
        SELECT tmt_id as id_tipo, tmt_tipo as tipo, tmt_subtipo as subtipo, tmt_note as note,
            COUNT(*) OVER() as total
        FROM tipi_materiale
    ";
    // WHERE
    if(isset($_GET["id_tipo"])) {
        $where .= " AND tmt_id = :id_tipo";
        $parametri['id_tipo'] = $_GET["id_tipo"];
    }
    if(strlen($where) > 0) {
        $where = " WHERE " . substr($where, 5);
        $query .= $where;
    }
    // ORDER
    $query .= " ORDER BY $property $direction ";
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
    		INSERT INTO tipi_materiale(tmt_id, tmt_tipo, tmt_subtipo, tmt_note)
    		VALUES(:id_tipo, :tipo, :subtipo, :note)
    	");

        $id = getGUID();

    	$success = $s->execute(array(
    		"id_tipo" => $id,
            "tipo" => $data["tipo"],
            "subtipo" => $data["subtipo"],
            "note" => $data["note"]
    	));

        $pdo->commit();

    	echo json_encode(array(
            "success" => $success,
    		"eventual_error" => $pdo->errorInfo(),
            "result" => array(
                "id_tipo" => $id
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
                tmt_subtipo = :subtipo,
                tmt_note = :note
    		WHERE tmt_id = :id_tipo
    	");

        $success = $s->execute(array(
    		"id_tipo" => $data["id_tipo"],
            "tipo" => $data["tipo"],
            "subtipo" => $data["subtipo"],
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
