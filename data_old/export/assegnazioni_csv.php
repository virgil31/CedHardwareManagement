<?php

header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename=assegnazioni_hw.csv');


$ini_array = parse_ini_file("../config.ini");

$pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);


$delimiter = ";";


$statement = $pdo->prepare("
    SELECT B.id as richiesta_id, CONCAT(B.nome,' ',B.cognome) as richiedente, C.nome as sede, D.nome as ufficio, E.nome as tipo_hw, H.nome as marca, G.nome  as modello, F.seriale

    FROM richiesta_tipo_hardware A
        LEFT JOIN richiesta B ON B.id = A.richiesta_id
        LEFT JOIN sede C ON C.id = B.sede_id
        LEFT JOIN ufficio D ON D.id = B.ufficio_id
        LEFT JOIN tipo_hardware E ON E.id = A.tipo_hardware_id
        LEFT JOIN seriale_modello F ON F.id = A.seriale_id
        LEFT JOIN modello_hardware G ON G.id = F.modello_id
        LEFT JOIN marca_hardware H ON H.id = G.marca_id

    ORDER BY richiedente, sede, ufficio, tipo_hw, marca, modello, seriale
");


$statement->execute();
$result = $statement->fetchAll(PDO::FETCH_ASSOC);

$out = fopen('php://output', 'w');

fputcsv($out,array('#Richiesta','Richiedente','Sede','Ufficio','Tipo HW','Marca','Modello','SN'), $delimiter);

foreach($result as $row){
    $row["seriale"] = '="'.$row["seriale"].'"' ; //per evitare che mi cambi il formato da excel, il seriale sarà il risultato di una funzione
    fputcsv($out,$row, $delimiter);
}

fclose($out);
