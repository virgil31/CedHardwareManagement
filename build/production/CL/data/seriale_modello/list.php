<?php

header('Content-Type: application/json');

$ini_array = parse_ini_file("../config.ini");

$pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);

$sort = (isset($_GET['sort']) ? $_GET['sort'] : $_GET['sort']);
$tmp = json_decode($sort,true);
$pro = $tmp[0]['property'];
$dir = $tmp[0]['direction'];

$limit = $_GET['limit'];
$start = $_GET['start'];

$total = 0;


//LIST FULL by modello_id & SOLO DISPONIBILI
if(isset($_GET["solo_disponibili"])){
	$modello_id = $_GET["modello_id"];

	$statement = $pdo->prepare("
		SELECT A.id,A.seriale,A.modello_id, B.nome as modello_name,C.codice as fattura_name, A.fattura_id, disponibile, COUNT(*) OVER() as total
		FROM seriale_modello A
			LEFT JOIN modello_hardware B ON B.id = A.modello_id
			LEFT JOIN fattura C ON C.id = A.fattura_id
		WHERE A.modello_id = $modello_id
		AND disponibile = 't'
		ORDER BY $pro $dir
	");
}

// LIST BY nome/cognome richiedente E ufficio_id
if(isset($_GET["richiedente"]) && isset($_GET["ufficio_id"])){

	$richiedente = $_GET["richiedente"];
	$ufficio_id = $_GET["ufficio_id"];

	$statement = $pdo->prepare("
		SELECT D.id, D.seriale,C.id as tipo_id,C.nome as tipo_name,E.marca_id,F.nome as marca_name, E.id as modello_id, E.nome as modello_name, G.id as fattura_id,G.codice as fattura_name, COUNT(*) OVER() as total

		FROM richiesta A
			LEFT JOIN richiesta_tipo_hardware B ON B.richiesta_id = A.id
			LEFT JOIN tipo_hardware C ON C.id = B.tipo_hardware_id
			LEFT JOIN seriale_modello D ON D.id = B.seriale_id
			LEFT JOIN modello_hardware E ON E.id = D.modello_id
			LEFT JOIN marca_hardware F ON F.id = E.marca_id
			LEFT JOIN fattura G ON G.id = D.fattura_id

		WHERE CONCAT(A.nome,' ',A.cognome) ilike '$richiedente'
			AND A.ufficio_id = $ufficio_id
			AND D.id IS NOT NULL

		ORDER BY tipo_name ASC, marca_name ASC, modello_name ASC, seriale ASC
	");
}

// LIST PAGINATO by modello_id
else{
	$modello_id = $_GET["modello_id"];

	$statement = $pdo->prepare("
		SELECT A.id,A.seriale,A.modello_id, B.nome as modello_name,C.codice as fattura_name, A.fattura_id, disponibile,CONCAT('Assegnato a: <b>',E.nome,' ',E.cognome,'</b> - ',F.nome,' (',G.nome,')') as assegnato_a, COUNT(*) OVER() as total
		FROM seriale_modello A
			LEFT JOIN modello_hardware B ON B.id = A.modello_id
			LEFT JOIN fattura C ON C.id = A.fattura_id

			LEFT JOIN richiesta_tipo_hardware D ON D.seriale_id = A.id
			LEFT JOIN richiesta E ON E.id = D.richiesta_id

			LEFT JOIN sede F ON F.id = E.sede_id
			LEFT JOIN ufficio G ON G.id = E.ufficio_id
		WHERE A.modello_id = $modello_id
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
