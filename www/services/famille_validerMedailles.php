<?php
require_once('../config.php');

require_once($configApp->getRacineClasses() . '/famille.php');
require_once($configApp->getRacineClasses() . '/routine.php');

try {

    $idFamille = 1;


    session_start();
    $famille = null;
    if (array_key_exists('famille', $_SESSION)) {
        //echo "dans la session\n";
        $famille = $_SESSION['famille'];
    }
    else {
        $stdObj = new stdClass();
        $stdObj->erreur = 1;
        $stdObj->messageErreur = "On ne peut vérifier si l'usager a passé par l'authentification.";

        header('500: Error', true, 500);
        echo json_encode($stdObj);
    }

    if ($famille->isModeParent()) {
        $famille = new Famille($idFamille, $configApp->getRacineData());
        $routine = $famille->getRoutineParNomRoutinePrenom($_REQUEST['nomRoutine'], $_REQUEST['prenom']);
        if ($routine == false) {
            $stdObj = new stdClass();
            $stdObj->erreur = 1;
            $stdObj->messageErreur = "Routine vide";

            header('500: Error', true, 500);
            echo json_encode($stdObj);
        }

        //echo $_REQUEST['nbrMedaillesAValider'] . "\n";
        //echo is_numeric($_REQUEST['nbrMedaillesAValider']) . "\n";
        if (is_numeric($_REQUEST['nbrMedaillesAValider'])) {
            //echo $_REQUEST['nbrMedaillesAValider'] . "\n";
            $routine->validerMedailles(intval($_REQUEST['nbrMedaillesAValider']));
            $famille->sauvegarder($idFamille);
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

/*
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
*/
} catch (Exception $ex) {
    $stdObj = new stdClass();
    $stdObj->erreur = 1;
    $stdObj->messageErreur = $ex->getMessage();

    echo json_encode($stdObj);
}
