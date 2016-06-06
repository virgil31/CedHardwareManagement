<?php

    $ldap = ldap_connect("ldap://10.1.4.245");

    $username = $_POST['username'];
    $password = base64_decode(base64_decode(base64_decode($_POST['password'])));

    ldap_set_option($ldap, LDAP_OPT_PROTOCOL_VERSION, 3);
    ldap_set_option($ldap, LDAP_OPT_REFERRALS, 0);

    $bind = @ldap_bind($ldap, "$username@sar.it", $password);

    if ($bind) {
        $filter="(sAMAccountName=$username)";
        $result = ldap_search($ldap,"dc=SAR,dc=IT",$filter);
        ldap_sort($ldap,$result,"sn");
        $info = ldap_get_entries($ldap, $result);

        if(!array_key_exists('sn', $info[0]) || !array_key_exists('givenname', $info[0])){
            echo json_encode(
                array(
                    "success" => false,
                    "message" => "Prima di procedere, contattare il CED. <b>Codice errore: 01</b>.<br>Altrimenti tentare con le credenziali del proprio funzionario responsabile."
                )
            );
        }
        else{
            @ldap_close($ldap);

            $cognome = $info[0]["sn"][0];
            $nome = $info[0]["givenname"][0];

            echo json_encode(
                array(
                    "success" => true,
                    "cognome" => $cognome,
                    "nome" => $nome
                )
            );
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
