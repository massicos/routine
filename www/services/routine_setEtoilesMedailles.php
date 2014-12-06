<?php
require_once('../config.php');

require_once($configApp->getRacineClasses() . '/famille.php');
require_once($configApp->getRacineClasses() . '/routine.php');

try {

    $idFamille = 1;

    session_start();
    $famille = null;
    if (array_key_exists('famille', $_SESSION)) {
        $famille = $_SESSION['famille'];
    }
    else {
        $famille = new Famille($idFamille, $configApp->getRacineData());
    }

    if ($famille->isModeParent()) {
        $idEnfant = $_REQUEST['idEnfant'];
        $idRoutine = $_REQUEST['idRoutine'];

        $routine = new Routine();
        $routine->setConfigPersistence(array($configApp->getRacineData()));
        $routine->charger($idFamille, $idEnfant, $idRoutine);
        if (is_numeric($_REQUEST['nbrEtoiles']) && is_numeric($_REQUEST['nbrMedailles'])) {
            $routine->setNbrEtoiles(intval($_REQUEST['nbrEtoiles']));
            $routine->setNbrMedailles(intval($_REQUEST['nbrMedailles']));
            $routine->sauvegarder($idFamille, $idEnfant, $idRoutine);
            echo $routine->toJson();
        }
        else {
            $stdObj = new stdClass();
            $stdObj->erreur = 1;
            $stdObj->messageErreur = "Valeur de médailles à valider invalide.";

            header('500: Error', true, 500);
            echo json_encode($stdObj);
        }
    }
    else {
        $stdObj = new stdClass();
        $stdObj->erreur = 1;
        $stdObj->messageErreur = "Mode parent nécessaire pour valider des médailles.";

        header('500: Error', true, 500);
        echo json_encode($stdObj);
    }

} catch (Exception $ex) {
    $stdObj = new stdClass();
    $stdObj->erreur = 1;
    $stdObj->messageErreur = $ex->getMessage();

    echo json_encode($stdObj);
}
