<?php


header('Content-Type: application/json');

$ini_array = parse_ini_file("../config.ini");

$pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);

$node = $_GET["node"];
$array_path = explode('/',$node);

//ROOT
if(count($array_path) == 1){

    $statement = $pdo->prepare("
        SELECT A.id, CONCAT(A.nome,' <b>(',COUNT(E.id),')</b>') as nome, FALSE as leaf, 'sede' as icon, COUNT(E.id) as numero_seriali

        FROM sede A
        	LEFT JOIN ufficio B ON B.sede_id = A.id
        	LEFT JOIN richiesta C ON C.ufficio_id = B.id
        	LEFT JOIN richiesta_tipo_hardware D ON D.richiesta_id = C.id
            LEFT JOIN seriale_modello E ON (E.id = D.seriale_id AND E.disponibile = FALSE)

        GROUP BY A.id, A.nome
        ORDER BY A.nome
    ");
}


// ROOT/sede_id
else if(count($array_path) == 2){
    $sede_id = $array_path[1];

    $statement = $pdo->prepare("
        SELECT A.id, CONCAT(A.nome,' (',COUNT(D.id),')') as nome, FALSE as leaf, 'ufficio' as icon, COUNT(D.id) as numero_seriali
        FROM ufficio A
            LEFT JOIN richiesta B ON B.ufficio_id = A.id
            LEFT JOIN richiesta_tipo_hardware C ON C.richiesta_id = B.id
            LEFT JOIN seriale_modello D ON (D.id = C.seriale_id AND D.disponibile = FALSE)

        WHERE A.sede_id = $sede_id
        GROUP BY A.id
        ORDER BY A.nome
    ");
}


// ROOT/sede_id/ufficio_id
else if(count($array_path) == 3){
    $ufficio_id = $array_path[2];

    $statement = $pdo->prepare("

        SELECT CONCAT(B.nome,' ',B.cognome,' (',COUNT(*),')') as nome, CONCAT(B.nome,' ',B.cognome) as id, TRUE as leaf, 'utente' as icon, COUNT(*) as numero_seriali

        FROM ufficio A
            RIGHT JOIN richiesta B ON B.ufficio_id = A.id
            LEFT JOIN richiesta_tipo_hardware C ON C.richiesta_id = B.id
            LEFT JOIN seriale_modello D ON D.id = C.seriale_id

        WHERE A.id = $ufficio_id
            AND D.id IS NOT NULL
            AND D.disponibile = FALSE

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
        "text" => $row->nome,
        "icon" => "resources/images/icon_".$row->icon.".png",
        "cls" => $row->numero_seriali > 0 ? "azure_node" : ""
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
