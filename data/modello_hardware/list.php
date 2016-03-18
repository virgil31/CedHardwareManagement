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

$statement = $pdo->prepare("
	SELECT A.id,A.nome,A.tipo_id,B.nome as tipo_name,A.marca_id,C.nome as marca_name, COUNT(*) OVER() as total
	FROM modello_hardware A
		LEFT JOIN tipo_hardware B ON B.id = A.tipo_id
		LEFT JOIN marca_hardware C ON C.id = A.marca_id
	ORDER BY A.$pro $dir LIMIT $limit OFFSET $start
");

$statement->execute();
$result = $statement->fetchAll(PDO::FETCH_OBJ);


if(count($result) != 0)
	$total = $result[0]->total;

echo json_encode(array(
	"result" => $result,
	"total" => $total
));
