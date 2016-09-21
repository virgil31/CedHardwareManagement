<?php

require_once("../util/util.php");

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

	//LIST FULL BY query_id
	if(isset($_GET["query_id"])){
		$query_id = $_GET["query_id"];
		$statement = $pdo->prepare("
			SELECT A.id, A.nome,A.cognome,CONCAT(A.nome,' ',A.cognome) as full_nome, funzionario_id,CONCAT(B.nome,' ',B.cognome) as funzionario_name,email,A.sede_id,C.nome as sede_name,ufficio_id, D.nome as ufficio_name,servizio,motivazione,disponibile_per_usato,richiesta_il,assegnata_il, stato,  COUNT(*) OVER() as total
			FROM richiesta A
				LEFT JOIN utente B on B.id = A.funzionario_id
				LEFT JOIN sede C on C.id = A.sede_id
				LEFT JOIN ufficio D on D.id = A.ufficio_id
			WHERE CAST(A.id as TEXT) ilike '$query_id%'
			ORDER BY $pro $dir
		");
	}
	// LIST PAGINATO FILTRATO PER stato
	else if(isset($_GET["stato"])){
		$stato = $_GET["stato"];
		if($stato == "Tutte") $stato = "%";
		$statement = $pdo->prepare("
			SELECT A.id, A.nome,A.cognome,CONCAT(A.nome,' ',A.cognome) as full_nome, funzionario_id,CONCAT(B.nome,' ',B.cognome) as funzionario_name,email,A.sede_id,C.nome as sede_name,ufficio_id, D.nome as ufficio_name,servizio,motivazione,disponibile_per_usato,richiesta_il,assegnata_il, stato,  COUNT(*) OVER() as total
			FROM richiesta A
				LEFT JOIN utente B on B.id = A.funzionario_id
				LEFT JOIN sede C on C.id = A.sede_id
				LEFT JOIN ufficio D on D.id = A.ufficio_id
			WHERE stato ilike '$stato'
			ORDER BY $pro $dir LIMIT $limit OFFSET $start
		");
	}
	//LIST FULL
	else if(isset($_GET["flag_full"])){
		$statement = $pdo->prepare("
			SELECT A.id, A.nome,A.cognome,CONCAT(A.nome,' ',A.cognome) as full_nome, funzionario_id,CONCAT(B.nome,' ',B.cognome) as funzionario_name,email,A.sede_id,C.nome as sede_name,ufficio_id, D.nome as ufficio_name,servizio,motivazione,disponibile_per_usato,richiesta_il,assegnata_il, stato, COUNT(*) OVER() as total
			FROM richiesta A
				LEFT JOIN utente B on B.id = A.funzionario_id
				LEFT JOIN sede C on C.id = A.sede_id
				LEFT JOIN ufficio D on D.id = A.ufficio_id
			ORDER BY $pro $dir
		");
	}

    //LIST BY RICHIEDENTE
    else if(isset($_GET["ric_id_richiedente"])){
        $ric_id_richiedente = $_GET["ric_id_richiedente"];
        $statement = $pdo->prepare("
    		SELECT A.ric_id, A.ric_numero, A.ric_id_richiedente, CONCAT(B.ute_cognome,' ',B.ute_nome) as cognome_nome_richiedente, A.ric_id_responsabile, CONCAT(C.ute_cognome,' ',C.ute_nome) as ric_richiedente_name,
    			ric_cod_sede, D.sed_descrizione as ric_sede_name,ric_oggetto,ric_motivazione,ric_destinazione,ric_data_presentazione,ric_data_accettazione,ric_data_chiusura,
    			ric_stato,ric_note_stato,ric_note, COUNT(*) OVER() as total

    		FROM richieste A
    			LEFT JOIN utenti B ON B.ute_id = A.ric_id_richiedente
    			LEFT JOIN utenti C ON C.ute_id = A.ric_id_responsabile
    			LEFT JOIN sedi D ON D.sed_cod_sede = A.ric_cod_sede

            WHERE ric_id_richiedente = '$ric_id_richiedente'

    		ORDER BY $pro $dir LIMIT $limit OFFSET $start
    	");
    }

	else{
		//LIST PAGINATO
        $statement = $pdo->prepare("
    		SELECT A.ric_id, A.ric_numero, A.ric_id_richiedente, CONCAT(B.ute_cognome,' ',B.ute_nome) as cognome_nome_richiedente, A.ric_id_responsabile, CONCAT(C.ute_cognome,' ',C.ute_nome) as ric_richiedente_name,
    			ric_cod_sede, D.sed_descrizione as ric_sede_name,ric_oggetto,ric_motivazione,ric_destinazione,ric_data_presentazione,ric_data_accettazione,ric_data_chiusura,
    			ric_stato,ric_note_stato,ric_note, COUNT(*) OVER() as total

    		FROM richieste A
    			LEFT JOIN utenti B ON B.ute_id = A.ric_id_richiedente
    			LEFT JOIN utenti C ON C.ute_id = A.ric_id_responsabile
    			LEFT JOIN sedi D ON D.sed_cod_sede = A.ric_cod_sede

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
    		INSERT INTO richieste(ric_id,ric_cod_sede,ric_destinazione,ric_id_responsabile,ric_id_richiedente,ric_motivazione,ric_oggetto,ric_data_presentazione,ric_stato)
    		VALUES(:ric_id,:ric_cod_sede,:ric_destinazione,:ric_id_responsabile,:ric_id_richiedente,:ric_motivazione,:ric_oggetto,NOW(),'da_valutare')
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
                "ric_id" => $id,
                "ric_stato" => "da_valutare"
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
