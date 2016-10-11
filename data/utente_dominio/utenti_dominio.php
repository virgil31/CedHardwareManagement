<?php

header('Content-Type: application/json');

require_once("../util/util.php");

// LISTA
if($_SERVER['REQUEST_METHOD'] === "GET"){
    lista();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// LISTA
function lista(){
    $ldap = ldap_connect("ldap://10.1.4.245");

    $username = base64_decode(base64_decode(base64_decode("V1RKV2VXRlhOWEE9")));
    $password = base64_decode(base64_decode(base64_decode("Vm0xc2VWb3liSE5PZWxreVRubEZQUT09")));

    ldap_set_option($ldap, LDAP_OPT_PROTOCOL_VERSION, 3);
    ldap_set_option($ldap, LDAP_OPT_REFERRALS, 0);

    $bind = @ldap_bind($ldap, "$username@sar.it", $password);

    if ($bind) {
        $ldap_base_dn = 'DC=SAR,DC=IT';
        $search_filter = '(&(objectCategory=person)(samaccountname=*))';

        $result = ldap_search($ldap, $ldap_base_dn, $search_filter);

        if (FALSE !== $result){
            $utenti = ldap_get_entries($ldap, $result);

            $result = array();

            foreach ($utenti as $utente) {
                if(isset($utente["givenname"]) && isset($utente["sn"]) && isset($utente["samaccountname"])) {
                    array_push($result, array(
                        "nome" => $utente["givenname"][0],
                        "cognome" => $utente["sn"][0],
                        "username" => $utente["samaccountname"][0],
                        "cognome_nome" => $utente["sn"][0]." ".$utente["givenname"][0],
                        "guid" => GUIDtoStr($utente["objectguid"][0])
                    ));
                }
            }

            echo json_encode(array(
                "result" => $result
            ));
        }
    }
    else {
        echo json_encode(
            array(
                "success" => false,
                "message" => "Invalid user / password"
            )
        );
    }
}
