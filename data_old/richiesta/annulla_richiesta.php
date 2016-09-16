<?php

header('Content-Type: application/json');

$ini_array = parse_ini_file("../config.ini");

$pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);

$richiesta_id = $_POST["richiesta_id"];


//in primis rendo disponibili i seriali associati a questa richiesta
$query = $pdo->prepare("
    UPDATE seriale_modello A
    SET disponibile = TRUE
    FROM richiesta_tipo_hardware B
    WHERE B.seriale_id = A.id
    AND B.richiesta_id = :richiesta_id
");

$success = $query->execute( array(
	'richiesta_id' => $richiesta_id
));

//infine elimino la richiesta
$query = $pdo->prepare("
    DELETE FROM richiesta
    WHERE id = :richiesta_id
");

$success = $query->execute( array(
	'richiesta_id' => $richiesta_id
));

$eventual_error = $pdo->errorInfo();


if ($success) {
    echo json_encode(array(
        "success" => true
    ));
}
else{
    echo json_encode(array(
        "success" => false,
        "error_message" =>  $eventual_error
    ));
}
