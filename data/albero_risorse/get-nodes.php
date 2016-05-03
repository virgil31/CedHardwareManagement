<?php


header('Content-Type: application/json');

$ini_array = parse_ini_file("../config.ini");

$pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);

$node = $_GET["node"];
$array_path = explode('/',$node);

//ROOT
if(count($array_path) == 1){

    $statement = $pdo->prepare("
        SELECT A.id, CONCAT(A.nome,' (',COUNT(E.id),')') as nome, FALSE as leaf, 'sede' as icon

        FROM sede A
        	LEFT JOIN ufficio B ON B.sede_id = A.id
        	LEFT JOIN richiesta C ON C.ufficio_id = B.id
        	LEFT JOIN richiesta_tipo_hardware D ON D.richiesta_id = C.id
            LEFT JOIN seriale_modello E ON E.id = D.seriale_id

        GROUP BY A.id, A.nome
        ORDER BY A.nome
    ");
}


// ROOT/sede_id
else if(count($array_path) == 2){
    $sede_id = $array_path[1];

    $statement = $pdo->prepare("
        SELECT A.id, CONCAT(A.nome,' (',COUNT(D.id),')') as nome, FALSE as leaf, 'ufficio' as icon
        FROM ufficio A
            LEFT JOIN richiesta B ON B.ufficio_id = A.id
            LEFT JOIN richiesta_tipo_hardware C ON C.richiesta_id = B.id
            LEFT JOIN seriale_modello D ON D.id = C.seriale_id

        WHERE A.sede_id = $sede_id
        GROUP BY A.id
        ORDER BY A.nome

    ");
}


// ROOT/sede_id/ufficio_id
else if(count($array_path) == 3){
    $ufficio_id = $array_path[2];

    $statement = $pdo->prepare("

        SELECT CONCAT(B.nome,' ',B.cognome,' (',COUNT(*),')') as nome, CONCAT(B.nome,' ',B.cognome) as id, TRUE as leaf, 'utente' as icon

        FROM ufficio A
            RIGHT JOIN richiesta B ON B.ufficio_id = A.id
            LEFT JOIN richiesta_tipo_hardware C ON C.richiesta_id = B.id
            LEFT JOIN seriale_modello D ON D.id = C.seriale_id

        WHERE A.id = $ufficio_id
            AND D.id IS NOT NULL

        GROUP BY B.nome, B.cognome

    ");
}
/*
// ROOT/sede_id/ufficio_id/nome cognome
else if(count($array_path) == 4){
    $nome_e_cognome = $array_path[3];
    $nome_e_cognome = explode(" ",$nome_e_cognome);
    $nome = $nome_e_cognome[0];
    $cognome = $nome_e_cognome[1];

    $statement = $pdo->prepare("

        SELECT CONCAT(B.nome,' ',B.cognome,' (',COUNT(*),')') as nome, CONCAT(B.nome,' ',B.cognome) as id, FALSE as leaf, 'utente' as icon

        FROM ufficio A
        	RIGHT JOIN richiesta B ON B.ufficio_id = A.id
        	LEFT JOIN richiesta_tipo_hardware C ON C.richiesta_id = B.id

        WHERE A.id = $ufficio_id
        GROUP BY B.nome, B.cognome

    ");
}*/

$statement->execute();
$result = $statement->fetchAll(PDO::FETCH_OBJ);

$arrayResult = array();
foreach ($result as $row) {
    array_push($arrayResult,array(
        "id" => $node.'/'.$row->id,
        "leaf" => $row->leaf,
        "text" => $row->nome,
        "icon" => "resources/images/icon_".$row->icon.".png"
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
