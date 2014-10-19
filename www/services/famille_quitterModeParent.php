<?php
require_once('../config.php');
require_once('/app/routine' . $configApp->getSuffixeCheminpParNiveau() .  '/classes/famille.php');

try {
    $idFamille = 1;

    session_start();
    $famille = null;
    if (isset($_SESSION['famille'])) {
        //echo "famille session";
        $famille = $_SESSION['famille'];
    }
    else {
        //echo "Nouvelle famille";
        $famille = new Famille($idFamille, "/app/data/routine" . $configApp->getSuffixeCheminpParNiveau() . "data");
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
