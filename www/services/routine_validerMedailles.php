<?php
require_once('../config.php');

require_once('/app/routine' . $configApp->getSuffixeCheminpParNiveau() .  '/classes/famille.php');
require_once('/app/routine' . $configApp->getSuffixeCheminpParNiveau() .  '/classes/routine.php');

try {

    $idFamille = 1;

    session_start();
    $famille = null;
    if (array_key_exists('famille', $_SESSION)) {
        $famille = $_SESSION['famille'];
    }
    else {
        $famille = new Famille($idFamille, "/app/data/routine" . $configApp->getSuffixeCheminpParNiveau() . "data");
    }

    if ($famille->isModeParent()) {
        $idEnfant = $_REQUEST['idEnfant'];
        $idRoutine = $_REQUEST['idRoutine'];

        $routine = new Routine();
        $routine->setConfigPersistence(array("/app/data/routine" . $configApp->getSuffixeCheminpParNiveau() . "data"));
        $routine->charger($idFamille, $idEnfant, $idRoutine);
        if (is_numeric($_REQUEST['nbrMedaillesAValider'])) {
            $routine->validerMedailles(intval($_REQUEST['nbrMedaillesAValider']));
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
