<?php

require_once('../../resources/lib/tcpdf/tcpdf.php');


$ini_array = parse_ini_file("../config.ini");

$pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);

$richiesta_id = $_GET["richiesta_id"];

$statement = $pdo->prepare("
    SELECT A.id, A.nome,A.cognome, CONCAT(B.nome,' ',B.cognome) as funzionario_name,C.nome as sede_name,D.nome as ufficio_name, email, assegnata_il
    FROM richiesta A
        LEFT JOIN utente B ON B.id = A.funzionario_id
        LEFT JOIN sede C ON C.id = A.sede_id
        LEFT JOIN ufficio D ON D.id = A.ufficio_id
    WHERE A.id = $richiesta_id
");

$statement->execute();
$result = $statement->fetchAll(PDO::FETCH_OBJ);


$richiedente = $result[0]->nome." ".$result[0]->cognome;
$funzionario = $result[0]->funzionario_name;
$sede = $result[0]->sede_name;
$ufficio = $result[0]->ufficio_name;
$data_assegnazione = $result[0]->assegnata_il;


$html = '<div style="text-align: center;"><br><img alt=" " src="../../resources/images/logos/logo2.png" height="48" width="48"><h1>Soprintendenza Speciale per il Colosseo, MNR e Area Archeologica di Roma</h1><i>Centro Elaborazione Dati "Piero Bertolini"</i><br><br>Modulo per la consegna di attrezzature Informatiche';

$html .=    '<br><br><table border="1">';

$html .=   '<tr><th><b>N.Registrazione</b></th><td>'.$richiesta_id.'</td></tr>
            <tr><th><b>Richiedente</b></th><td>'.$richiedente.'</td></tr>
            <tr><th><b>Funz. Responsabile</b></th><td>'.$funzionario.'</td></tr>
            <tr><th><b>Sede</b></th><td>'.$sede.'</td></tr>
            <tr><th><b>Ufficio</b></th><td>'.$ufficio.'</td></tr>
            <tr><th><b>Assegnata Il</b></th><td>'.$data_assegnazione.'</td></tr>';

$html .= '</table>';


$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
$pdf->AddPage("PORTRAIT","A4");
$pdf->writeHTMLCell(0, 0, 10, 10, $html);
$pdf->Output('Foglio Consegna.pdf', 'I');  // 'D' per forzare il download diretto
