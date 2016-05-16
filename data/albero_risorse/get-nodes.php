<?php


header('Content-Type: application/json');

$ini_array = parse_ini_file("../config.ini");

$pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);

$node = $_GET["node"];
$array_path = explode('/',$node);

//ROOT
if(count($array_path) == 1){

    $statement = $pdo->prepare("
        SELECT A.id, CONCAT(A.nome,' <b>(',COUNT(E.id),')</b>') as nome, FALSE as leaf, 'sede' as icon, COUNT(E.id) as numero_seriali

        FROM sede A
        	LEFT JOIN ufficio B ON B.sede_id = A.id
        	LEFT JOIN richiesta C ON C.ufficio_id = B.id
        	LEFT JOIN richiesta_tipo_hardware D ON D.richiesta_id = C.id
            LEFT JOIN seriale_modello E ON (E.id = D.seriale_id AND E.disponibile = FALSE)

        GROUP BY A.id, A.nome
        ORDER BY A.nome
    ");

    $statement->execute();
    $result = $statement->fetchAll(PDO::FETCH_OBJ);

    $arrayResult = array();
    foreach ($result as $row) {
        array_push($arrayResult,array(
            "id" => $node.'/'.$row->id,
            "leaf" => $row->leaf,
            "text" => $row->nome,
            "icon" => "resources/images/icon_".$row->icon.".png",
            "cls" => $row->numero_seriali > 0 ? "azure_node" : ""
        ));
    }

    echo json_encode($arrayResult);
    exit();
}


// ROOT/sede_id
else if(count($array_path) == 2){
    $sede_id = $array_path[1];

    $statement = $pdo->prepare("
        SELECT A.id, CONCAT(A.nome) as nome, FALSE as leaf, 'ufficio' as icon
        FROM ufficio A
            LEFT JOIN richiesta B ON B.ufficio_id = A.id
            LEFT JOIN richiesta_tipo_hardware C ON C.richiesta_id = B.id
            LEFT JOIN seriale_modello D ON (D.id = C.seriale_id AND D.disponibile = FALSE)

        WHERE A.sede_id = $sede_id
        GROUP BY A.id
        ORDER BY A.nome
    ");

    $statement->execute();
    $result = $statement->fetchAll(PDO::FETCH_OBJ);

    $arrayResult = array();
    foreach ($result as $row) {
        $numero_seriali_ufficio = getNumeroSerialiDiUfficio($pdo,$row->id);

        array_push($arrayResult,array(
            "id" => $node.'/'.$row->id,
            "leaf" => $row->leaf,
            "text" => $row->nome." (".$numero_seriali_ufficio.")",
            "icon" => "resources/images/icon_".$row->icon.".png",
            "cls" => $numero_seriali_ufficio > 0 ? "azure_node" : ""
        ));
    }

    echo json_encode($arrayResult);
    exit();
}


// ROOT/sede_id/ufficio_id
else if(count($array_path) == 3){
    $ufficio_id = $array_path[2];

    $statement = $pdo->prepare("

        SELECT CONCAT(B.nome,' ',B.cognome) as nome, CONCAT(B.nome,' ',B.cognome) as id, TRUE as leaf, 'utente' as icon

        FROM ufficio A
            RIGHT JOIN richiesta B ON B.ufficio_id = A.id
            LEFT JOIN richiesta_tipo_hardware C ON C.richiesta_id = B.id
            LEFT JOIN seriale_modello D ON D.id = C.seriale_id

        WHERE A.id = $ufficio_id
            AND D.id IS NOT NULL
            AND D.disponibile = FALSE

        GROUP BY B.nome, B.cognome

    ");

    $statement->execute();
    $result = $statement->fetchAll(PDO::FETCH_OBJ);

    $arrayResult = array();
    foreach ($result as $row) {
        $numero_seriali_utente = getNumeroSerialiDiUtenteUfficio($pdo, $ufficio_id, $row->nome);

        array_push($arrayResult,array(
            "id" => $node.'/'.$row->id,
            "leaf" => $row->leaf,
            "text" => $row->nome." (".$numero_seriali_utente.")",
            "icon" => "resources/images/icon_".$row->icon.".png",
            "cls" => $numero_seriali_utente > 0 ? "azure_node" : ""
        ));
    }

    echo json_encode($arrayResult);
    exit();

}




/*
cls:"folder"
id:"src/app/domain"
qtip:"Type: Folder<br />Last Modified: Jul 29, 2015, 8:46 pm"
text:"domain"
*/

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function getUtentiFromUfficio($pdo, $ufficio_id){

    $statement = $pdo->prepare("
        SELECT DISTINCT CONCAT(A.nome,' ',A.cognome) as utente
        FROM richiesta A
        WHERE A.ufficio_id = $ufficio_id
        ORDER BY utente
    ");

    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_OBJ);

}


function getNumeroSerialiDiUtenteUfficio($pdo, $ufficio_id, $utente){
    $statement = $pdo->prepare("
        SELECT B.seriale_id

        FROM richiesta A
            LEFT JOIN richiesta_tipo_hardware B ON B.richiesta_id = A.id

        WHERE A.ufficio_id = $ufficio_id
            AND CONCAT(A.nome,' ',A.cognome) ilike '$utente'
    ");

    $statement->execute();
    $result = $statement->fetchAll(PDO::FETCH_OBJ);

    $count = 0;

    foreach ($result as $row) {
        if(serialeAncoraAssegnato($pdo,$row->seriale_id,$utente))
            $count++;
    }

    return $count;
}

function serialeAncoraAssegnato($pdo,$seriale_id,$richiedente){
	$statement = $pdo->prepare("
		SELECT *
		FROM (
			SELECT *
			FROM richiesta_tipo_hardware A
				LEFT JOIN richiesta B ON B.id = A.richiesta_id
			WHERE A.seriale_id = $seriale_id
			ORDER BY B.id DESC
			LIMIT 1
		) tmp
		WHERE CONCAT(tmp.nome,' ',tmp.cognome) ilike '$richiedente'
	");
	$statement->execute();
	$result = $statement->fetchAll(PDO::FETCH_OBJ);

	return (count($result) != 0);
}

function getNumeroSerialiDiUfficio($pdo,$ufficio_id){

    $utenti = getUtentiFromUfficio($pdo,$ufficio_id);

    $count = 0;
    foreach ($utenti as $utente) {
        $count += getNumeroSerialiDiUtenteUfficio($pdo,$ufficio_id,$utente->utente);
    }

    return $count;
}

function getNumeroSerialiDiSede($pdo,$sede_id){

    $uffici = getUfficiFromSede($pdo,$sede_id);

    $count = 0;
    foreach ($uffici as $ufficio) {
        $count += getNumeroSerialiDiUtenteUfficio($pdo,$ufficio->id);
    }

    return $count;
}

function getUfficiFromSede($pdo, $sede_id){

    $statement = $pdo->prepare("
        SELECT id
        FROM ufficio A
        WHERE A.sede_id = $sede_id
    ");

    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_OBJ);

}
