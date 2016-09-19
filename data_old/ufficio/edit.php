<?php


header('Content-Type: application/json');

$ini_array = parse_ini_file("../config.ini");

$pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);

$data = json_decode($_POST['data'],true);


$s = $pdo->prepare("
	UPDATE ufficio
	SET nome = :nome,
		sede_id = :sede_id

	WHERE id = :id
");

$params = array(
	'id' => $data["id"],
	'nome' => $data['nome'],
	'sede_id' => $data['sede_id']
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
