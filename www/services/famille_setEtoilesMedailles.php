<?php
require_once('../config.php');

require_once($configApp->getRacineClasses() . '/famille.php');
require_once($configApp->getRacineClasses() . '/routine.php');

try {

    session_start();
    $idFamille = $_SESSION['idFamille'];

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

        if (is_numeric($_REQUEST['nbrEtoiles']) && is_numeric($_REQUEST['nbrMedailles'])) {
            $routine->setNbrEtoiles(intval($_REQUEST['nbrEtoiles']));
            $routine->setNbrMedailles(intval($_REQUEST['nbrMedailles']));
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

} catch (Exception $ex) {
    $stdObj = new stdClass();
    $stdObj->erreur = 1;
    $stdObj->messageErreur = $ex->getMessage();

    echo json_encode($stdObj);
}
