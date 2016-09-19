<?php


header('Content-Type: application/json');

$ini_array = parse_ini_file("../config.ini");

$pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);

$data = json_decode($_POST['data'],true);


$s = $pdo->prepare("
	INSERT INTO richiesta(nome,cognome,sede_id,ufficio_id,disponibile_per_usato,richiesta_il,stato,motivazione)
	VALUES(:nome,:cognome,:sede_id,:ufficio_id,TRUE,now(),'Pregresso','Assegnazione del pregresso da parte del CED')
");

$utente = getUtenteById($data["richiedente_id"]);

$params = array(
	'nome' => $utente->nome,
	'cognome' => $utente->cognome,
	'sede_id' => $data['sede_id'],
	'ufficio_id' => $data['ufficio_id']
);

$success = $s->execute($params);
$eventual_error = $pdo->errorInfo();

$last_id = $pdo->lastInsertId("richiesta_id_seq");

//NaN tipi_hardware richiesti vv
$tipi_hardware = $data["tipi_hardware"];
foreach ($tipi_hardware as $tipo_hardware) {
	$s = $pdo->prepare("
		INSERT INTO richiesta_tipo_hardware(richiesta_id, tipo_hardware_id,seriale_id)
		VALUES(:richiesta_id,:tipo_hardware_id,:seriale_id)
	");

	$params = array(
		'richiesta_id' => $last_id,
		'tipo_hardware_id' => $tipo_hardware['tipo_id'],
		'seriale_id' => $tipo_hardware['seriale_id']
	);

	$success = $s->execute($params);

	// segno il seriale come NON DISPONIBILE
	$s = $pdo->prepare("
		UPDATE seriale_modello
		SET DISPONIBILE = FALSE
		WHERE id = ".$tipo_hardware['seriale_id']
	);
	$success = $s->execute();

}
// ^^

sleep(2);

if ($success) {
    echo json_encode(array(
        "success" => true,
        "result" => array(
            "id" => $last_id
        )
    ));
}
else{
    echo json_encode(array(
        "success" => false,
        "error_message" =>  $eventual_error
    ));
}

/////////////////////////////////////////

function getUtenteById($utente_id){

    header('Content-Type: application/json');
    $ini_array = parse_ini_file("../config.ini");
    $pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);

	$statement = $pdo->prepare("
		SELECT *
		FROM utente
        WHERE id = $utente_id
	");

    $statement->execute();
	$result = $statement->fetchAll(PDO::FETCH_OBJ);

    return $result[0];
}
