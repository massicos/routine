<?php
require_once('../config.php');

require_once($configApp->getRacineClasses() . '/famille.php');
require_once($configApp->getRacineClasses() . '/routine.php');

try {

    session_start();
    $stdObj = new stdClass();
    if (array_key_exists('idFamille', $_SESSION)) {
        $stdObj->isLogin = true;        
    }
    else {
        echo $_REQUEST['login'] . "<br>\n";
        echo $_REQUEST['password'] . "<br>\n";
        
        $stdObj = new stdClass();
        $stdObj->isLogin = true;
        $_SESSION['idFamille'] = 1;
    }
    echo json_encode($stdObj);
} catch (Exception $ex) {
    $stdObj = new stdClass();
    $stdObj->erreur = 1;
    $stdObj->messageErreur = $ex->getMessage();
    
    header('500: Error', true, 500);
    echo json_encode($stdObj);
}
