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


//LIST FULL SOLO FUNZIONARI
if(isset($_GET["flag_solo_funzionari"])){
	$statement = $pdo->prepare("
		SELECT id, nome, cognome, funzionario,CONCAT(nome,' ',cognome) as utente_name, COUNT(*) OVER() as total
		FROM utente
		WHERE funzionario = TRUE
		ORDER BY nome ASC,cognome ASC
	");
}
//LIST FULL
else if(isset($_GET["flag_full"])){
	$statement = $pdo->prepare("
		SELECT id, nome, cognome,CONCAT(nome,' ',cognome) as utente_name, funzionario, COUNT(*) OVER() as total
		FROM utente
		ORDER BY utente_name ASC
	");
}

//LIST SOLO RICHIEDENTI
else if(isset($_GET["flag_only_richiedenti"])){
	$statement = $pdo->prepare("
		SELECT DISTINCT CONCAT(nome,' ', cognome) as utente_name, COUNT(*) OVER() as total
		FROM richiesta
		ORDER BY utente_name
	");
}

else{
	//LIST PAGINATO
	$statement = $pdo->prepare("
		SELECT id, nome, cognome, funzionario,CONCAT(nome,' ',cognome) as utente_name, COUNT(*) OVER() as total
		FROM utente
		ORDER BY $pro $dir,nome LIMIT $limit OFFSET $start
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
