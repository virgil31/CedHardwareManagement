<?php


header('Content-Type: application/json');

$ini_array = parse_ini_file("../config.ini");

$pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);

$data = json_decode($_POST['data'],true);


$s = $pdo->prepare("
	UPDATE seriale_modello
	SET seriale = :seriale,
		modello_id = :modello_id,
		fattura_id = :fattura_id

	WHERE id = :id
");

$params = array(
	'id' => $data["id"],
	'seriale' => $data['seriale'],
	'modello_id' => $data['modello_id'],
	'fattura_id' => $data['fattura_id']
);

$success = $s->execute($params);


if ($success) {
    echo json_encode(array(
        "success" => true
    ));
}
else{
    echo json_encode(array(
        "success" => false,
        "error_message" =>  $pdo->errorInfo()
    ));
}
