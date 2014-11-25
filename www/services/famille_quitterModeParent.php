<?php
require_once('../config.php');
require_once($configApp->getRacineClasses() . '/famille.php');

try {
    $idFamille = 1;

    session_start();
    $famille = null;
    if (array_key_exists('famille', $_SESSION)) {
        //echo "famille session";
        $famille = $_SESSION['famille'];
    }
    else {
        //echo "Nouvelle famille";
        $famille = new Famille($idFamille, $configApp->getRacineData());
    }
    //echo $famille->toJson();
    $famille->quitterModeParent();

    $_SESSION['famille'] = $famille;

    echo $famille->toJson();
} catch (Exception $ex) {
    $stdObj = new stdClass();
    $stdObj->erreur = 1;
    $stdObj->messageErreur = $ex->getMessage();

    echo json_encode($stdObj);
}
