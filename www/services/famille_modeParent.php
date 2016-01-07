<?php
require_once('../config.php');
require_once($configApp->getRacineClasses() . '/famille.php');

try {
    session_start();
    $idFamille = $_SESSION['idFamille'];
    $mdp = $_REQUEST['mdp'];

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
