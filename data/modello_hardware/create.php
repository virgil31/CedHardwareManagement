<?php


header('Content-Type: application/json');

$ini_array = parse_ini_file("../config.ini");

$pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);

$data = json_decode($_POST['data'],true);


$s = $pdo->prepare("
	INSERT INTO fornitore(nome,tipo_id,indirizzo,telefono,fax,email,partita_iva,codice_fiscale)
	VALUES(:nome,:tipo_id,:indirizzo,:telefono,:fax,:email,:partita_iva,:codice_fiscale)
");

$params = array(
	'nome' => $data['nome'],
	'tipo_id' => $data['tipo_id'],
	'indirizzo' => $data['indirizzo'],
	'telefono' => $data['telefono'],
	'fax' => $data['fax'],
	'email' => $data['email'],
	'partita_iva' => $data['partita_iva'],
	'codice_fiscale' => $data['codice_fiscale']
);

$success = $s->execute($params);


$last_id = $pdo->lastInsertId("fornitore_id_seq");

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
