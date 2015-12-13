<?php
require_once('../config.php');
require_once($configApp->getRacineClasses() . '/famille.php');

try {
    session_start();
    $idFamille = $_SESSION['idFamille'];

    $famille = new Famille($idFamille, $configApp->getRacineData());

    echo $famille->toJson();
} catch (Exception $ex) {
    $stdObj = new stdClass();
    $stdObj->erreur = 1;
    $stdObj->messageErreur = $ex->getMessage();

    echo json_encode($stdObj);
}
