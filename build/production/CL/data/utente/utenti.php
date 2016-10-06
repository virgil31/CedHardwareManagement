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
        SELECT ute_id as id_utente, ute_nome as nome, ute_cognome as cognome,CONCAT(ute_cognome,' ',ute_nome) as utente_name,
            ute_funzionario as funzionario, ute_esterno as esterno, ute_inattivo as inattivo, ute_email as email, ute_amministrazione as amministrazione,
            ute_note as note, COUNT(*) OVER() as total
        FROM utenti
    ";
    // WHERE
    if(isset($_GET["nome"])) {
        $where .= " AND ute_nome = :nome";
        $parametri['nome'] = $_GET["nome"];
    }
    if(isset($_GET["cognome"])) {
        $where .= " AND ute_cognome = :cognome";
        $parametri['cognome'] = $_GET["cognome"];
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

    try{

        $pdo->beginTransaction();

    	$s = $pdo->prepare("
    		INSERT INTO utenti(ute_id, ute_nome, ute_cognome, ute_funzionario, ute_esterno, ute_inattivo, ute_email, ute_amministrazione, ute_note)
    		VALUES(:id_utente, :nome, :cognome, :funzionario, :esterno, :inattivo, :email, :amministrazione, :note)
    	");

        $id = getGUID();



    	$success = $s->execute(array(
    		"id_utente" => $id,
            "nome" => $data["nome"],
    		"cognome" => $data["cognome"],
    		"funzionario" => (int)$data["funzionario"],
    		"esterno" => (int)$data["esterno"],
    		"inattivo" => (int)$data["inattivo"],
    		"email" => $data["email"],
    		"amministrazione" => $data["amministrazione"],
    		"note" => $data["note"]
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
    		UPDATE utenti
    		SET ute_nome = :nome,
    			ute_cognome = :cognome,
    			ute_funzionario = :funzionario,
                ute_esterno = :esterno,
                ute_inattivo = :inattivo,
                ute_email = :email,
                ute_amministrazione = :amministrazione,
                ute_note = :note

    		WHERE ute_id = :id_utente
    	");

    	$success = $s->execute(array(
    		"id_utente" => $data["id_utente"],
            "nome" => $data["nome"],
    		"cognome" => $data["cognome"],
    		"funzionario" => (int)$data["funzionario"],
    		"esterno" => (int)$data["esterno"],
    		"inattivo" => (int)$data["inattivo"],
    		"email" => $data["email"],
    		"amministrazione" => $data["amministrazione"],
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
    		DELETE FROM utenti
            WHERE ute_id = :id_utente
    	");

    	$success = $s->execute(array(
    		"id_utente" => $data["id_utente"]
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
