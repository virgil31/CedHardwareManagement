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

$statement = $pdo->prepare("
	SELECT id, first_name, last_name, email_address, COUNT(*) OVER() as total
	FROM sf_guard_user 
	ORDER BY $pro $dir,last_name ASC LIMIT $limit OFFSET $start
");

$statement->execute();
$result = $statement->fetchAll();



echo json_encode(array(
	"result" => $result,
	"total" => $result[0]["total"]
));
