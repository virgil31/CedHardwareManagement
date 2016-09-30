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
        SELECT R.ric_id AS id_richiesta, R.ric_numero AS numero, U.ute_id as id_richiedente, CONCAT(U.ute_cognome, ' ' , U.ute_nome) as richiedente,
            U1.ute_id as id_responsabile, CONCAT(U1.ute_cognome, ' ' ,U1.ute_nome) as responsabile,S.sed_cod_sede as cod_sede, S.sed_descrizione AS sede, ric_oggetto AS oggetto,
            ric_motivazione AS motivazione, ric_destinazione AS destinazione,ric_data_presentazione AS data_presentazione,
            ric_data_accettazione AS data_accettazione, ric_data_chiusura AS data_chiusura, ric_stato AS stato,
            ric_note_stato AS note_stato, ric_note AS note,COUNT(*) OVER() as total

        FROM richieste R
            LEFT JOIN utenti U ON U.ute_id = R.ric_id_richiedente
            LEFT JOIN utenti U1 ON U1.ute_id = R.ric_id_responsabile
            LEFT JOIN sedi S ON S.sed_cod_sede = R.ric_cod_sede
    ";
    // WHERE
    if(isset($_GET["id_richiedente"])) {
        $where .= " AND ric_id_richiedente = :id_richiedente";
        $parametri['id_richiedente'] = $_GET["id_richiedente"];
    }
    if(isset($_GET["numero"])) {
        $where .= " AND ric_numero = :numero";
        $parametri['numero'] = $_GET["numero"];
    }
    if(isset($_GET["stato"])) {
        $where .= " AND ric_stato = :stato";
        $parametri['stato'] = $_GET["stato"];
    }
    if(strlen($where) > 0) {
        $where = " WHERE " . substr($where, 5);
        $query .= $where;
    }
    // ORDER
    $query .= " ORDER BY $property $direction LIMIT $limit OFFSET $start";

    $statement = $pdo->prepare($query);
    $statement->execute($parametri);
    $result = $statement->fetchAll(PDO::FETCH_OBJ);

	if(count($result) != 0) {
		$total = $result[0]->total;
    }

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
    		INSERT INTO richieste(ric_id,ric_cod_sede,ric_destinazione,ric_id_responsabile,ric_id_richiedente,ric_motivazione,ric_oggetto,ric_data_presentazione,ric_stato)
    		VALUES(:id_richiesta,:cod_sede,:destinazione,:id_responsabile,:id_richiedente,:motivazione,:oggetto,NOW(),'da_valutare')
    	");

        $id = getGUID();

    	$success = $s->execute(array(
    		"id_richiesta" => $id,
    		"cod_sede" => $data["cod_sede"],
    		"destinazione" => $data["destinazione"],
    		"id_responsabile" => $data["id_responsabile"],
    		"id_richiedente" => $data["id_richiedente"],
    		"motivazione" => $data["motivazione"],
    		"oggetto" => $data["oggetto"]
    	));

        $pdo->commit();

    	echo json_encode(array(
            "success" => $success,
    		"eventual_error" => $pdo->errorInfo(),
            "result" => array(
                "id_richiesta" => $id,
                "stato" => "da_valutare"
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
    		SET ric_cod_sede = :cod_sede,
    			ric_destinazione = :destinazione,
    			ric_id_responsabile = :id_responsabile,
    			ric_id_richiedente = :id_richiedente,
    			ric_motivazione = :motivazione,
    			ric_oggetto = :oggetto

    		WHERE ric_id = :id_richiesta
    	");

    	$success = $s->execute(array(
    		"id_richiesta" => $data["id_richiesta"],
    		"cod_sede" => $data["cod_sede"],
    		"destinazione" => $data["destinazione"],
    		"id_responsabile" => $data["id_responsabile"],
    		"id_richiedente" => $data["id_richiedente"],
    		"motivazione" => $data["motivazione"],
    		"oggetto" => $data["oggetto"]
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
    		DELETE FROM richieste
            WHERE ric_id = :ric_id
    	");

    	$success = $s->execute(array(
    		"ric_id" => $data["ric_id"]
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
