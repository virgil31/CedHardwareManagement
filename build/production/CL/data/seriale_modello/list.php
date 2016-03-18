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

$modello_id = $_GET["modello_id"];

$statement = $pdo->prepare("
	SELECT A.id,A.seriale,A.modello_id, B.nome as modello_name,C.codice as fattura_name, A.fattura_id, COUNT(*) OVER() as total
	FROM seriale_modello A
		LEFT JOIN modello_hardware B ON B.id = A.modello_id
		LEFT JOIN fattura C ON C.id = A.fattura_id
	WHERE A.modello_id = $modello_id
	ORDER BY $pro $dir LIMIT $limit OFFSET $start
");

$statement->execute();
$result = $statement->fetchAll(PDO::FETCH_OBJ);


if(count($result) != 0)
	$total = $result[0]->total;

echo json_encode(array(
	"result" => $result,
	"total" => $total
));
