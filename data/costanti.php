<?php

header('Content-Type: application/json');


/*
 STATI
*/
$stati = array(
    "da_valutare" => "Da Valutare",                 // L'utente può ancora modificare ed eliminare la propria richiesta
    "in_valutazione" => "In Valutazione",           // L'utente può ancora modificare la sua richiesta ma NON eliminarla
    "in_esecuzione" => "In Esecuzione",             // L'utente NON può più modificare ed eliminare la propria richiesta
    "in_consegna" => "In Consegna",                 // L'utente NON può più modificare ed eliminare la propria richiesta
    "chiusa" => "Chiusa"                            // L'utente NON può più modificare ed eliminare la propria richiesta
);

$GLOBALS['COSTANTI'] = array(
    "stati" =>$stati
);


if(isset($_POST["flag_echo"]))
    echo json_encode($GLOBALS['COSTANTI']);
