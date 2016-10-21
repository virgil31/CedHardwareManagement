<?php

header('Content-Type: application/json');

require_once("../util/util.php");

$ini_array = parse_ini_file("../config.ini");

$pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);

// LISTA
if($_SERVER['REQUEST_METHOD'] === "GET"){
    lista($pdo);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// LISTA
function lista($pdo){
    $sort = $_GET['sort'];
	$json = json_decode($sort,true);
	$property = $json[0]['property'];
	$direction = $json[0]['direction'];
	$limit = $_GET['limit'];
	$start = $_GET['start'];
	$total = 0;

    $query = "";
    $where = "";
    $parametri = array();

    // SELECT / FROM
    $query .= "
        SELECT mrc_id as id_materiale_richiesto, mrc_id_richiesta as id_richiesta, mrc_id_tipo as id_tipo, TM.tmt_tipo as tipo,
                mrc_quantita as quantita, mrc_dettagli as dettagli, mrc_disponibilita as disponibilita, mrc_note as note,
                COUNT(*) OVER() as total

        FROM materiali_richiesti M
            LEFT JOIN tipi_materiale TM ON TM.tmt_id = M.mrc_id_tipo
    ";
    // WHERE
    if(isset($_GET["id_richiesta"])) {
        $where .= " AND mrc_id_richiesta = :id_richiesta";
        $parametri['id_richiesta'] = $_GET["id_richiesta"];
    }
    if(strlen($where) > 0) {
        $where = " WHERE " . substr($where, 5);
        $query .= $where;
    }
    // ORDER
    $query .= " ORDER BY $property $direction ";
    if(!isset($_GET["flag_full"])) {
        $query .= " LIMIT $limit OFFSET $start ";
    }

    $statement = $pdo->prepare($query);
    $statement->execute($parametri);
    $result = $statement->fetchAll(PDO::FETCH_OBJ);

	if(count($result) != 0)
		$total = $result[0]->total;

	echo json_encode(array(
		"result" => $result,
		"total" => $total
	));
}
