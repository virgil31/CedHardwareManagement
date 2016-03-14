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
	SELECT A.id, A.nome, A.sede_id, B.nome as sede_nome, COUNT(*) OVER() as total
	FROM ufficio A
		LEFT JOIN sede B ON B.id = A.sede_id
	ORDER BY A.$pro $dir LIMIT $limit OFFSET $start
");

$statement->execute();
$result = $statement->fetchAll();


if(count($result) != 0)
	$total = $result[0]["total"];

echo json_encode(array(
	"result" => $result,
	"total" => $total
));