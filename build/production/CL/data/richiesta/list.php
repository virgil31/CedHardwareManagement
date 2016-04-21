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



//LIST FULL
if(isset($_GET["flag_full"])){
	$statement = $pdo->prepare("
		SELECT A.id, A.nome,A.cognome,CONCAT(A.nome,' ',A.cognome) as full_nome, funzionario_id,CONCAT(B.nome,' ',B.cognome) as funzionario_name,email,A.sede_id,C.nome as sede_name,ufficio_id, D.nome as ufficio_name,servizio,motivazione,disponibile_per_usato,richiesta_il,consegnata_il, stato, COUNT(*) OVER() as total
		FROM richiesta A
			LEFT JOIN utente B on B.id = A.funzionario_id
			LEFT JOIN sede C on C.id = A.sede_id
			LEFT JOIN ufficio D on D.id = A.ufficio_id
		ORDER BY $pro $dir
	");
}
else{
	//LIST PAGINATO
	$statement = $pdo->prepare("
		SELECT A.id, A.nome,A.cognome,CONCAT(A.nome,' ',A.cognome) as full_nome, funzionario_id,CONCAT(B.nome,' ',B.cognome) as funzionario_name,email,A.sede_id,C.nome as sede_name,ufficio_id, D.nome as ufficio_name,servizio,motivazione,disponibile_per_usato,richiesta_il,consegnata_il, stato,  COUNT(*) OVER() as total
		FROM richiesta A
			LEFT JOIN utente B on B.id = A.funzionario_id
			LEFT JOIN sede C on C.id = A.sede_id
			LEFT JOIN ufficio D on D.id = A.ufficio_id
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
