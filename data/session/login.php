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

        if (array_key_exists('memberof', $info[0])) {

            $groups = $info[0]["memberof"];
            $groups = array_slice($groups, 1);

            @ldap_close($ldap);

            $is_in_group = false;
            foreach ($groups as $group) {
                if(stripos($group, "administrator") !== false || stripos($group, "ced") !== false  || stripos($group, "eis") !== false)
                    $is_in_group = true;
            }

            if($is_in_group){
                //$cognome = $info[0]["sn"][0];
                //$nome = $info[0]["givenname"][0];
                echo json_encode(
                    array(
                        "success" => true//,
                        //"cognome" => $cognome,
                        //"nome" => $nome
                    )
                );
            }
            else{
                echo json_encode(
                    array(
                        "success" => false,
                        "message" => "Non è nel gruppo abilitato"
                    )
                );
            }
        }
        else{
            echo json_encode(
                array(
                    "success" => false,
                    "message" => "Non è nel gruppo abilitato"
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

?>
