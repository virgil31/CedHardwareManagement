<?php

function verificaConnessioneDB(){
    $ini_array = parse_ini_file("config.ini");

    $success = true;

    try {
        $pdo=new PDO("pgsql:host=".$ini_array['pdo_host'].";port=".$ini_array['pdo_port']."; dbname=".$ini_array['pdo_db'].";",$ini_array['pdo_user'],$ini_array['pdo_psw']);
    } catch (PDOException $e) {
        $success = false;
    }

    return $success;
}

function getGUID(){
    if (function_exists('com_create_guid')){
        return com_create_guid();
    }else{
        mt_srand((double)microtime()*10000);//optional for php 4.2.0 and up.
        $charid = strtolower(md5(uniqid(rand(), true)));
        $hyphen = chr(45);// "-"
        $uuid = substr($charid, 0, 8).$hyphen
            .substr($charid, 8, 4).$hyphen
            .substr($charid,12, 4).$hyphen
            .substr($charid,16, 4).$hyphen
            .substr($charid,20,12);
        return $uuid;
    }
}


function GUIDtoStr($binary_guid) {
  $unpacked = unpack('Va/v2b/n2c/Nd', $binary_guid);
  return sprintf('%08x-%04x-%04x-%04x-%04x%08x', $unpacked['a'], $unpacked['b1'], $unpacked['b2'], $unpacked['c1'], $unpacked['c2'], $unpacked['d']);
}
