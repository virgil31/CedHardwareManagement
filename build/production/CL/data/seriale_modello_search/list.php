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

if(isset($_GET["query"])){
	$query = $_GET["query"];

	$statement = $pdo->prepare("
		SELECT A.id,A.seriale,A.modello_id, B.nome as modello_name,A.disponibile, B.marca_id, C.nome as marca_name,B.tipo_id, D.nome as tipo_name,A.fattura_id,
			F.nome as nome_richiedente, F.cognome as cognome_richiedente,G.nome as sede_name,H.nome as ufficio_name, COALESCE(CAST(F.assegnata_il as TEXT),'{Pregresso}') as assegnata_il,
			COUNT(*) OVER() as total

		FROM seriale_modello A
			LEFT JOIN modello_hardware B ON B.id = A.modello_id
			LEFT JOIN marca_hardware C ON C.id = B.marca_id
			LEFT JOIN tipo_hardware D ON D.id = B.tipo_id
			LEFT JOIN richiesta_tipo_hardware E ON E.seriale_id = A.id
			LEFT JOIN richiesta F ON F.id = E.richiesta_id
			LEFT JOIN sede G ON G.id = F.sede_id
			LEFT JOIN ufficio H ON H.id = F.ufficio_id

		WHERE A.seriale like '%$query%'
			OR B.nome ilike '%$query%'
		ORDER BY $pro $dir LIMIT $limit OFFSET $start
	");
}
//LIST PAGINATO
else{

	$statement = $pdo->prepare("
	SELECT A.id,A.seriale,A.modello_id, B.nome as modello_name,A.disponibile, B.marca_id, C.nome as marca_name,B.tipo_id, D.nome as tipo_name,A.fattura_id,
		F.nome as nome_richiedente, F.cognome as cognome_richiedente,G.nome as sede_name,H.nome as ufficio_name, COALESCE(CAST(F.assegnata_il as TEXT),'{Pregresso}') as assegnata_il,
		COUNT(*) OVER() as total

	FROM seriale_modello A
		LEFT JOIN modello_hardware B ON B.id = A.modello_id
		LEFT JOIN marca_hardware C ON C.id = B.marca_id
		LEFT JOIN tipo_hardware D ON D.id = B.tipo_id
		LEFT JOIN richiesta_tipo_hardware E ON E.seriale_id = A.id
		LEFT JOIN richiesta F ON F.id = E.richiesta_id
		LEFT JOIN sede G ON G.id = F.sede_id
		LEFT JOIN ufficio H ON H.id = F.ufficio_id

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
