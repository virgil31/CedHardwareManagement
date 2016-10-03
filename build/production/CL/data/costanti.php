<?php

header('Content-Type: application/json');

require_once("util/util.php");

/*
 STATI
*/
$stati = array(
    // La richiesta non è ancora stata presa in esame;
    // L'utente può ancora modificare ed eliminare la propria richiesta
    "da_valutare" => array(
        "key" => "da_valutare",
        "value" => "Da valutare",
        "puo_modificare" => true,
        "puo_eliminare" => true
    ),

    // La richiesta è in corso di esame;
    // L'utente può ancora modificare la sua richiesta ma NON eliminarla
    "in_valutazione" => array(
        "key" => "in_valutazione",
        "value" => "In valutazione",
        "puo_modificare" => true,
        "puo_eliminare" => false
    ),

    // la richiesta è in corso di esecuzione (materiale ordinato, ecc.);
    // L'utente NON può più modificare ed eliminare la propria richiesta
    "in_esecuzione" => array(
        "key" => "in_esecuzione",
        "value" => "In esecuzione",
        "puo_modificare" => false,
        "puo_eliminare" => false
    ),

    // l'oggetto della richiesta è in corso di consegna, non più quindi di competenza del CED;
    // L'utente NON può più modificare ed eliminare la propria richiesta
    "in_consegna" => array(
        "key" => "in_consegna",
        "value" => "In consegna",
        "puo_modificare" => false,
        "puo_eliminare" => false
    ),

    // la richiesta (accettata o no) è chiusa e non richiede trattazione;
    // L'utente NON può più modificare ed eliminare la propria richiesta
    "chiusa" => array(
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
    echo json_encode(array(
        "COSTANTI" => $GLOBALS['COSTANTI'],
        "connessione_db" => verificaConnessioneDB()
    ));
