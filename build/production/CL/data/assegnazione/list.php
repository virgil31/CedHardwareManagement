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




// LIST FULL BY richiesta_id
if(isset($_GET["richiesta_id"])){
	$richiesta_id = $_GET["richiesta_id"];

	$statement = $pdo->prepare("
		SELECT *
		FROM (
			SELECT A.id,richiesta_id, tipo_hardware_id,B.nome as tipo_hardware_name, note, seriale_id, CONCAT(E.nome,' - ',D.nome,' - (SN: <b>',C.seriale,'</b>)') as seriale_name,C.modello_id, COUNT(*) OVER() as total
				FROM richiesta_tipo_hardware A
				LEFT JOIN tipo_hardware B ON B.id = A.tipo_hardware_id
				LEFT JOIN seriale_modello C ON C.id = A.seriale_id
				LEFT JOIN modello_hardware D ON D.id = C.modello_id
				LEFT JOIN marca_hardware E ON E.id = D.marca_id
		) tmp
		WHERE richiesta_id = $richiesta_id
		ORDER BY $pro $dir
	");
}

//LIST FULL
else if(isset($_GET["flag_full"])){
	$statement = $pdo->prepare("
		SELECT *
		FROM (
			SELECT A.id,richiesta_id, tipo_hardware_id,B.nome as tipo_hardware_name, note, seriale_id, CONCAT(E.nome,' - ',D.nome,' - (SN: <b>',C.seriale,'</b>)') as seriale_name,C.modello_id, COUNT(*) OVER() as total
				FROM richiesta_tipo_hardware A
				LEFT JOIN tipo_hardware B ON B.id = A.tipo_hardware_id
				LEFT JOIN seriale_modello C ON C.id = A.seriale_id
				LEFT JOIN modello_hardware D ON D.id = C.modello_id
				LEFT JOIN marca_hardware E ON E.id = D.marca_id
		) tmp
		ORDER BY $pro $dir
	");
}
else{
	//LIST PAGINATO
	$statement = $pdo->prepare("
		SELECT *
		FROM (
			SELECT A.id,richiesta_id, tipo_hardware_id,B.nome as tipo_hardware_name, note, seriale_id, CONCAT(E.nome,' - ',D.nome,' - (SN: <b>',C.seriale,'</b>)') as seriale_name,C.modello_id, COUNT(*) OVER() as total
				FROM richiesta_tipo_hardware A
				LEFT JOIN tipo_hardware B ON B.id = A.tipo_hardware_id
				LEFT JOIN seriale_modello C ON C.id = A.seriale_id
				LEFT JOIN modello_hardware D ON D.id = C.modello_id
				LEFT JOIN marca_hardware E ON E.id = D.marca_id
		) tmp
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
