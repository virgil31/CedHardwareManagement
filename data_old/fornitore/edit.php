<?php


header('Content-Type: application/json');

$ini_array = parse_ini_file("../config.ini");

$pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);

$data = json_decode($_POST['data'],true);


$s = $pdo->prepare("
	UPDATE fornitore
	SET nome = :nome,
		tipo_id = :tipo_id,
		indirizzo = :indirizzo,
		telefono = :telefono,
		fax = :fax,
		email = :email,
		partita_iva = :partita_iva,
		codice_fiscale = :codice_fiscale

	WHERE id = :id
");

$params = array(
	'id' => $data["id"],
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
