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
        SELECT mat_id as id_materiale, mat_id_modello as id_modello, M2.mod_id_tipo as id_tipo, T.tmt_tipo as tipo,
            M2.mod_marca as marca, M2.mod_modello as modello, mat_id_acquisto as id_acquisto, mat_seriale as seriale,
            mat_caratteristiche as caratteristiche, mat_collocazione as collocazione, mat_non_funzionante as non_funzionante,
            mat_dismesso as dismesso, mat_smaltito as smaltito, mat_smarrito_rubato as smarrito_rubato,
            mat_non_trovato as non_trovato, mat_stato as stato, mat_note as note, COUNT(*) OVER() as total

        FROM materiali M
            LEFT JOIN modelli M2 ON M2.mod_id = M.mat_id_modello
            LEFT JOIN tipi_materiale T ON T.tmt_id = M2.mod_id_tipo
    ";
    // WHERE
    if(isset($_GET["id_materiale"])) {
        $where .= " AND mat_id = :id_materiale";
        $parametri['id_materiale'] = $_GET["id_materiale"];
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
    		INSERT INTO materiali(mat_id, mat_id_modello, mat_seriale, mat_id_acquisto, mat_caratteristiche, mat_collocazione, mat_stato, mat_note,
                mat_non_funzionante, mat_dismesso, mat_smaltito, mat_non_trovato, mat_smarrito_rubato)
    		VALUES(:id_materiale, :id_modello, :seriale, :id_acquisto, :caratteristiche, :collocazione, :stato, :note,
                :non_funzionante, :dismesso, :smaltito, :non_trovato, :smarrito_rubato)
    	");

        $id = getGUID();

    	$success = $s->execute(array(
    		"id_materiale" => $id,
            "id_modello" => $data["id_modello"],
            "seriale" => $data["seriale"],
            "id_acquisto" => $data["id_acquisto"],
            "caratteristiche" => $data["caratteristiche"],
            "collocazione" => $data["collocazione"],
            "stato" => $data["stato"],
            "note" => $data["note"],
            "non_funzionante" => (int)$data["non_funzionante"],
            "dismesso" => (int)$data["dismesso"],
            "smaltito" => (int)$data["smaltito"],
            "non_trovato" => (int)$data["non_trovato"],
            "smarrito_rubato" => (int)$data["smarrito_rubato"]
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
    		UPDATE materiali
    		SET mat_id_modello = :id_modello,
                mat_seriale = :seriale,
                mat_id_acquisto = :id_acquisto,
                mat_caratteristiche = :caratteristiche,
                mat_collocazione = :collocazione,
                mat_stato = :stato,
                mat_non_funzionante = :non_funzionante,
                mat_dismesso = :dismesso,
                mat_smaltito = :smaltito,
                mat_non_trovato = :non_trovato,
                mat_smarrito_rubato = :smarrito_rubato,
                mat_note = :note
    		WHERE mat_id = :id_materiale
    	");

        $success = $s->execute(array(
    		"id_materiale" => $data["id_materiale"],
            "id_modello" => $data["id_modello"],
            "seriale" => $data["seriale"],
            "id_acquisto" => $data["id_acquisto"],
            "caratteristiche" => $data["caratteristiche"],
            "collocazione" => $data["collocazione"],
            "stato" => $data["stato"],
            "note" => $data["note"],
            "non_funzionante" => (int)$data["non_funzionante"],
            "dismesso" => (int)$data["dismesso"],
            "smaltito" => (int)$data["smaltito"],
            "non_trovato" => (int)$data["non_trovato"],
            "smarrito_rubato" => (int)$data["smarrito_rubato"]
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
    		DELETE FROM materiali
            WHERE mat_id = :id_materiale
    	");

    	$success = $s->execute(array(
    		"id_materiale" => $data["id_materiale"]
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
