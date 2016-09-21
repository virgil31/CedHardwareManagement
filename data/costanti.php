<?php

header('Content-Type: application/json');


/*
 STATI
*/
$stati = array(
    "da_valutare" => array(                         // L'utente può ancora modificare ed eliminare la propria richiesta
        "key" => "da_valutare",
        "value" => "Da Valutare",
        "puo_modificare" => true,
        "puo_eliminare" => true
    ),
    "in_valutazione" => array(                      // L'utente può ancora modificare la sua richiesta ma NON eliminarla
        "key" => "in_valutazione",
        "value" => "In Valutazione",
        "puo_modificare" => true,
        "puo_eliminare" => false
    ),
    "in_esecuzione" => array(                       // L'utente NON può più modificare ed eliminare la propria richiesta
        "key" => "in_esecuzione",
        "value" => "In Esecuzione",
        "puo_modificare" => false,
        "puo_eliminare" => false
    ),
    "in_consegna" => array(                         // L'utente NON può più modificare ed eliminare la propria richiesta
        "key" => "in_consegna",
        "value" => "In Consegna",
        "puo_modificare" => false,
        "puo_eliminare" => false
    ),
    "chiusa" => array(                              // L'utente NON può più modificare ed eliminare la propria richiesta
        "key" => "chiusa",
        "value" => "Chiusa",
        "puo_modificare" => false,
        "puo_eliminare" => false
    )
);

$GLOBALS['COSTANTI'] = array(
    "stati" =>$stati
);


if(isset($_POST["flag_echo"]))
    echo json_encode($GLOBALS['COSTANTI']);
