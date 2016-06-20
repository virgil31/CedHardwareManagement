<?php


header('Content-Type: application/json');

$ini_array = parse_ini_file("../config.ini");

$pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);

$utente = $_GET["utente"];

$statement = $pdo->prepare("
	SELECT B.nome as sede_name, C.nome as ufficio_name,D.seriale_id,E.seriale, CONCAT('<b>',H.nome,'</b> ',G.nome,' ',F.nome ) as hardware_name
	FROM richiesta A
		LEFT JOIN sede B ON B.id = A.sede_id
		LEFT JOIN ufficio C ON C.id = A.ufficio_id
		LEFT JOIN richiesta_tipo_hardware D ON D.richiesta_id = A.id
		LEFT JOIN seriale_modello E ON E.id= D.seriale_id
		LEFT JOIN modello_hardware F ON E.modello_id = F.id
		LEFT JOIN marca_hardware G ON G.id = F.marca_id
		LEFT JOIN tipo_hardware H ON H.id = F.tipo_id

	WHERE CONCAT(A.nome,' ',A.cognome) ilike '$utente'
	ORDER BY sede_name, ufficio_name, hardware_name
");


$statement->execute();
$result = $statement->fetchAll(PDO::FETCH_OBJ);

$arrayResult = array();
foreach ($result as $row) {
	if(serialeAncoraAssegnato($pdo,$row->seriale_id,$utente))
		array_push($arrayResult,$row);
}


echo json_encode(array(
	"result" => $arrayResult
));


////////////////////////////////////////////////////////////


function serialeAncoraAssegnato($pdo,$seriale_id,$richiedente){
	$statement = $pdo->prepare("
		SELECT *
		FROM (
			SELECT *
			FROM richiesta_tipo_hardware A
				LEFT JOIN richiesta B ON B.id = A.richiesta_id
				LEFT JOIN seriale_modello C ON C.id = A.seriale_id
			WHERE A.seriale_id = $seriale_id
				AND C.disponibile = FALSE
			ORDER BY B.id DESC
			LIMIT 1
		) tmp
		WHERE CONCAT(tmp.nome,' ',tmp.cognome) ilike '$richiedente'
	");
	$statement->execute();
	$result = $statement->fetchAll(PDO::FETCH_OBJ);

	return (count($result) != 0);
}
