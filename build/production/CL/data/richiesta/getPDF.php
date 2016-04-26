<?php

require_once('../../resources/lib/tcpdf/tcpdf.php');


$richiesta_id = "-";
$richiedente = "-";
$funzionario = "-";
$sede = "-";
$ufficio = "-";
$data_assegnazione = "-";



$html = '<div style="text-align: center;"><br><img src="../../resources/images/logos/logo3.png" height="48" width="48"><h1>Soprintendenza Speciale per il Colosseo, MNR e Area Archeologica di Roma</h1><i>Centro Elaborazione Dati "Piero Bertolini"</i><br><br>Modulo per la consegna di attrezzature Informatiche';

$html .=    '<br><br><table border="1">';

$html .=   '<tr><th><b>N.Registrazione</b></th><td>'.$richiesta_id.'</td></tr>
            <tr><th><b>Richiedente</b></th><td>'.$richiedente.'</td></tr>
            <tr><th><b>Funz. Responsabile</b></th><td>'.$funzionario.'</td></tr>
            <tr><th><b>Sede</b></th><td>'.$sede.'</td></tr>
            <tr><th><b>Ufficio</b></th><td>'.$ufficio.'</td></tr>
            <tr><th><b>Assegnata/e Il</b></th><td>'.$data_assegnazione.'</td></tr>';

$html .= '</table>';



$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
$pdf->AddPage();
$pdf->writeHTMLCell(0, 0, 10, 10, $html);
$pdf->Output('esempio_html.pdf', 'I');  // 'D' per forzare il download diretto
