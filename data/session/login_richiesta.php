<?php

    require_once("../util/util.php");

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
                    //"cognome" => $cognome,
                    //"nome" => $nome,
                    "utente" => getIdMailFromNomeCognome($nome,$cognome)
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




    ////////////////////////////////////////////////////////////////////////////////////////////////




    /*
    funzione che ritorna:
    -id
    -email
    dell'utente con quel nome e cognome.

    Nel caso non esista, tale utente dovrò essere creato.
    */
    function getIdMailFromNomeCognome($nome,$cognome){

        header('Content-Type: application/json');
        $ini_array = parse_ini_file("../config.ini");
        $pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);

        //controllo se c'è un utente con quel nome e cognome nella tabella utenti
        $statement = $pdo->prepare("
    		SELECT *
    		FROM utenti
    		WHERE ute_nome like :nome
            AND ute_cognome like :cognome
    	");

        $statement->execute(array(
            "nome" => $nome,
            "cognome" => $cognome
        ));

        $result = $statement->fetchAll(PDO::FETCH_OBJ);

        // se mi è uscito un record allora ritorno i suoi dati
        if(count($result) != 0){
            $utente = array(
                "id" => $result[0]->ute_id,
                "nome" => $nome,
                "cognome" => $cognome
            );
        }
        //altrimenti lo devo creare per poi ritornare i suoi dati
        else{
            $statement = $pdo->prepare("
        		INSERT INTO utenti(ute_id,ute_nome,ute_cognome)
                VALUES(:id,:nome,:cognome);
        	");

            $guid = getGUID();

            $statement->execute(array(
                "id" => $guid,
                "nome" => $nome,
                "cognome" => $cognome
            ));

            $utente = array(
                "id" => $guid,
                "nome" => $nome,
                "cognome" => $cognome
            );
        }

        return $utente;

    }
