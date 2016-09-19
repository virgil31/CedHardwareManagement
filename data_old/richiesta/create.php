<?php


header('Content-Type: application/json');

$ini_array = parse_ini_file("../config.ini");

$pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);

$data = json_decode($_POST['data'],true);


$s = $pdo->prepare("
	INSERT INTO richiesta(nome,cognome,funzionario_id,email,sede_id,ufficio_id,servizio,motivazione,disponibile_per_usato,richiesta_il,stato)
	VALUES(:nome,:cognome,:funzionario_id,:email,:sede_id,:ufficio_id,:servizio,:motivazione,:disponibile_per_usato,now(),'Da Valutare')
");

$params = array(
	'nome' => $data['nome'],
	'cognome' => $data['cognome'],
	'funzionario_id' => $data['funzionario_id'],
	'email' => $data['email'],
	'sede_id' => $data['sede_id'],
	'ufficio_id' => $data['ufficio_id'],
	'servizio' => $data['servizio'],
	'motivazione' => $data['motivazione'],
	'disponibile_per_usato' => $data['disponibile_per_usato']
);

$success = $s->execute($params);
$eventual_error = $pdo->errorInfo();

$last_id = $pdo->lastInsertId("richiesta_id_seq");

//NaN tipi_hardware richiesti vv
$tipi_hardware = $data["tipi_hardware"];
foreach ($tipi_hardware as $tipo_hardware) {
	$s = $pdo->prepare("
		INSERT INTO richiesta_tipo_hardware(richiesta_id, tipo_hardware_id, note)
		VALUES(:richiesta_id,:tipo_hardware_id,:note);
	");

	$tmp = explode("---", $tipo_hardware['id']);
	$tipo_hardware_id = $tmp[0];

	$params = array(
		'richiesta_id' => $last_id,
		'tipo_hardware_id' => $tipo_hardware_id,
		'note' => $tipo_hardware['note'],
	);

	$success = $s->execute($params);
}
// ^^

sleep(2);

if ($success) {
    echo json_encode(array(
        "success" => true,
		"mail_sent" => inviaMail("RichiestaHardware-CED@SSCOL.it", $data['email'], "Richiesta Hardware #".$last_id, "Il codice identificativo della sua richiesta è <b>".$last_id.'</b>. Può utilizzare questo codice per controllare lo stato della sua richiesta <a target="_blank" href="http://inventario.sar.it/#controlla_richiesta">QUI</a><br><br>Elenco materiale richiesto:<br>'.getRiepilogo($last_id)),
        "result" => array(
            "id" => $last_id
        )
    ));
}
else{
    echo json_encode(array(
        "success" => false,
        "error_message" =>  $eventual_error
    ));
}



/////////////////////////////////////////

function getRiepilogo($richiesta_id){
	$ini_array = parse_ini_file("../config.ini");

    $pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);


	$statement = $pdo->prepare("
		SELECT B.nome as tipo_name,COALESCE(A.note,'-') as note
		FROM richiesta_tipo_hardware A
			LEFT JOIN tipo_hardware B ON B.id = A.tipo_hardware_id
	    WHERE A.richiesta_id = $richiesta_id
	");

	$statement->execute();
	$result = $statement->fetchAll(PDO::FETCH_OBJ);


	$to_return = '<ul>';
	foreach ($result as $row)
		$to_return .= '<li><b>'.$row->tipo_name ."</b><i> (Note: ".$row->note.")</i></li>" ;

	$to_return .= "</ul>";


	return $to_return;
}

function inviaMail($from, $to, $oggetto, $testo, $allegati = null){
	require '../../resources/lib/PHPMailer/PHPMailerAutoload.php';
	$ini_array = parse_ini_file("../config.ini");

	$mail = new PHPMailer;

	//$mail->SMTPDebug = 3;

	$mail->isSMTP();
	$mail->Host = $ini_array["smtp_host"];
	$mail->SMTPAuth = false;
	$mail->Port = $ini_array["smtp_port"];

	$mail->SMTPOptions = array(
		'ssl' => array(
		    'verify_peer' => false,
		    'verify_peer_name' => false,
		    'allow_self_signed' => true
		)
	);


	$mail->setFrom($from, 'CED SSCOL');
	$mail->addAddress($to);

	$mail->CharSet = 'UTF-8';
	$mail->Subject = $oggetto;
	$mail->Body    = $testo."<br><br><b><i>La presente e-mail è stata generata automaticamente da un indirizzo di posta elettronica di solo invio; si chiede pertanto di non rispondere al messaggio.</i></b>";
	//$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

	$mail->isHTML(true);

	if(!$mail->send())
	    return 'Mailer Error: ' . $mail->ErrorInfo;
	else
	    return 'Message has been sent';

}
