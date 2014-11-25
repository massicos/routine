<?php
require_once('../config.php');
require_once($configApp->getRacineClasses() . '/famille.php');

try {
    $idFamille = 1;
    $mdp = $_REQUEST['mdp'];

    session_start();
    $famille = null;
    if (array_key_exists('famille', $_SESSION)) {
        $famille = $_SESSION['famille'];
    }
    else {
        $famille = new Famille($idFamille, $configApp->getRacineData());
    }
    $famille->validerMdp($mdp);

    $_SESSION['famille'] = $famille;

    echo $famille->toJson();
} catch (Exception $ex) {
    $stdObj = new stdClass();
    $stdObj->erreur = 1;
    $stdObj->messageErreur = $ex->getMessage();

    echo json_encode($stdObj);
}
