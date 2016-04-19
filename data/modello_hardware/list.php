<?php


header('Content-Type: application/json');

$ini_array = parse_ini_file("../config.ini");

$pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);

$sort = (isset($_GET['sort']) ? $_GET['sort'] : $_GET['sort']);
$array_sort = json_decode($sort,true);

$limit = $_GET['limit'];
$start = $_GET['start'];

$order_str = " ";
foreach ($array_sort as $sort)
	$order_str .= " ".$sort["property"]." ".$sort["direction"].",";

$order_str = rtrim($order_str,",");

$total = 0;

// LIST PAGINATO CON QUERY
if(isset($_GET["query"])){
	$query = $_GET["query"];
	$query = trim($query);

	$array_query = explode(" ",$query);
	$query_str = " 1 = 0 ";
	foreach ($array_query as $word) {
		$query_str .= " OR A.nome ilike '%$word%'  OR C.nome ilike '%$word%' ";
	}

	$statement = $pdo->prepare("
		SELECT A.id,A.nome,A.tipo_id,B.nome as tipo_name,A.marca_id,C.nome as marca_name, COUNT(*) OVER() as total
		FROM modello_hardware A
			LEFT JOIN tipo_hardware B ON B.id = A.tipo_id
			LEFT JOIN marca_hardware C ON C.id = A.marca_id
		WHERE $query_str
		ORDER BY $order_str LIMIT $limit OFFSET $start
	");
}
// LIST PAGINATO NORMALE
else{
	$statement = $pdo->prepare("
		SELECT A.id,A.nome,A.tipo_id,B.nome as tipo_name,A.marca_id,C.nome as marca_name, COUNT(*) OVER() as total
		FROM modello_hardware A
			LEFT JOIN tipo_hardware B ON B.id = A.tipo_id
			LEFT JOIN marca_hardware C ON C.id = A.marca_id
		ORDER BY $order_str LIMIT $limit OFFSET $start
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
