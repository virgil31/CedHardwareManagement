<?php


header('Content-Type: application/json');

$ini_array = parse_ini_file("../config.ini");

$pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);

$data = json_decode($_POST['data'],true);


$s = $pdo->prepare("
	UPDATE modello_hardware
	SET nome = :nome,
		tipo_id = :tipo_id,
		marca_id = :marca_id

	WHERE id = :id
");

$params = array(
	'id' => $data["id"],
	'nome' => $data['nome'],
	'tipo_id' => $data['tipo_id'],
	'marca_id' => $data['marca_id']
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
