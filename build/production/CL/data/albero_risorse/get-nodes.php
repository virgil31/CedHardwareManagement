<?php


header('Content-Type: application/json');

$ini_array = parse_ini_file("../config.ini");

$pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);

$node = $_GET["node"];
$array_path = explode('/',$node);

//ROOT
if(count($array_path) == 1){
    $statement = $pdo->prepare("
        SELECT *, FALSE as leaf
        FROM sede
        ORDER BY nome
    ");
}


// ROOT/sede_id
else if(count($array_path) == 2){
    $sede_id = $array_path[1];

    /*$statement = $pdo->prepare("
        SELECT *
        FROM ufficio
        WHERE sede_id = $sede_id
        ORDER BY nome
    ");*/
    $statement = $pdo->prepare("
        SELECT A.id, CONCAT(A.nome,' (',COUNT(C.richiesta_id),')') as nome, FALSE as leaf
        FROM ufficio A
            LEFT JOIN richiesta B ON B.ufficio_id = A.id
            LEFT JOIN richiesta_tipo_hardware C ON C.richiesta_id = B.id

        WHERE A.sede_id = $sede_id

        GROUP BY A.id
        ORDER BY A.nome

    ");
}


// ROOT/sede_id/ufficio_id
else if(count($array_path) == 3){
    $ufficio_id = $array_path[2];

    $statement = $pdo->prepare("

        SELECT CONCAT(B.nome,' ',B.cognome,' (',COUNT(*),')') as nome, CONCAT(B.nome,' ',B.cognome) as id, FALSE as leaf

        FROM ufficio A
        	RIGHT JOIN richiesta B ON B.ufficio_id = A.id
        	LEFT JOIN richiesta_tipo_hardware C ON C.richiesta_id = B.id

        WHERE A.id = $ufficio_id
        GROUP BY B.nome, B.cognome

    ");
}

$statement->execute();
$result = $statement->fetchAll(PDO::FETCH_OBJ);

$arrayResult = array();
foreach ($result as $row) {
    array_push($arrayResult,array(
        "id" => $node.'/'.$row->id,
        "leaf" => $row->leaf,
        "text" => $row->nome
        //"src" => "root/".$row->id,
        //"qtip" => "qtip here",
    ));
}

echo json_encode($arrayResult);


/*
cls:"folder"
id:"src/app/domain"
qtip:"Type: Folder<br />Last Modified: Jul 29, 2015, 8:46 pm"
text:"domain"
*/
