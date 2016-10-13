<?php

require_once("../util/util.php");

header('Content-Type: application/json');

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
    require_once("../costanti.php");

    $full_stati = $GLOBALS['COSTANTI']['stati'];

    $result = array();

    foreach ($full_stati as $stato)
        array_push($result,$stato);

	echo json_encode(array(
		"result" => $result
	));
}
