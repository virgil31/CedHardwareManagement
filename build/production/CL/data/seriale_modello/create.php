<?php


header('Content-Type: application/json');

$ini_array = parse_ini_file("../config.ini");

$pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);

$data = json_decode($_POST['data'],true);


$s = $pdo->prepare("
	INSERT INTO seriale_modello(seriale,modello_id,fattura_id)
	VALUES(:seriale,:modello_id,:fattura_id)
");

$params = array(
	'seriale' => $data['seriale'],
	'modello_id' => $data['modello_id'],
	'fattura_id' => $data['fattura_id']
);

$success = $s->execute($params);


$last_id = $pdo->lastInsertId("seriale_modello_id_seq");

//sleep(1.5);

if ($success) {
    echo json_encode(array(
        "success" => true,
        "result" => array(
            "id" => $last_id
        )
    ));
}
else{
    echo json_encode(array(
        "success" => false,
        "error_message" =>  $pdo->errorInfo()
    ));
}
