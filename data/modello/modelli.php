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
        SELECT mod_id as id_modello, mod_id_tipo as id_tipo, T.tmt_tipo as tipo, mod_marca as marca, mod_modello as modello,
            mod_caratteristiche as caratteristiche, mod_note as note, COUNT(*) OVER() as total
        FROM modelli M
    	   LEFT JOIN tipi_materiale T  ON M.mod_id_tipo::UUID = T.tmt_id
    ";
    // WHERE
    if(isset($_GET["id_modello"])) {
        $where .= " AND mod_id = :id_modello";
        $parametri['id_modello'] = $_GET["id_modello"];
    }
    if(strlen($where) > 0) {
        $where = " WHERE " . substr($where, 5);
        $query .= $where;
    }
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
    		INSERT INTO modelli(mod_id, mod_id_tipo, mod_marca, mod_modello, mod_caratteristiche, mod_note)
    		VALUES(:id_modello, :id_tipo, :marca, :modello, :caratteristiche, :note)
    	");

        $id = getGUID();

    	$success = $s->execute(array(
    		"id_modello" => $id,
            "id_tipo" => $data["id_tipo"],
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
                "id_modello" => $id
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
    		UPDATE modelli
    		SET mod_id_tipo = :id_tipo,
                mod_marca = :marca,
                mod_modello = :modello,
                mod_caratteristiche = :caratteristiche,
                mod_note = :note
    		WHERE mod_id = :id_modello
    	");

        $success = $s->execute(array(
    		"id_modello" => $data["id_modello"],
            "id_tipo" => $data["id_tipo"],
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
    		DELETE FROM modelli
            WHERE mod_id = :id_modello
    	");

    	$success = $s->execute(array(
    		"id_modello" => $data["id_modello"]
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
