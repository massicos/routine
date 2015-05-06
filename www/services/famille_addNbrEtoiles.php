<?php
require_once('../config.php');

require_once($configApp->getRacineClasses() . '/famille.php');
require_once($configApp->getRacineClasses() . '/routine.php');

try {
    $idFamille = 1;
    $famille = new Famille($idFamille, $configApp->getRacineData());

    $routine = $famille->getRoutineParNomRoutinePrenom($_REQUEST['nomRoutine'], $_REQUEST['prenom']);
    if ($routine != false) {
        $routine->addNbrEtoiles($_REQUEST['nbrEtoiles']);
        $famille->sauvegarder($idFamille);
    }
    else {
        echo "ERREUR !!";
    }
    /*
    $idFamille = $_REQUEST['idFamille'];
    $idEnfant = $_REQUEST['idEnfant'];
    $idRoutine = $_REQUEST['idRoutine'];

    $routine = new Routine();
    $routine->setConfigPersistence(array($configApp->getRacineData()));
    $routine->charger($idFamille, $idEnfant, $idRoutine);
    echo $routine->getPrenom() . "<br>\n";
    echo $routine->getNbrEtoiles() . "<br>\n";
    $routine->addNbrEtoiles($_REQUEST['nbrEtoiles']);
    $routine->sauvegarder($idFamille, $idEnfant, $idRoutine);
    echo $routine->getNbrEtoiles() . "<br>\n";
    */
} catch (Exception $ex) {
    $stdObj = new stdClass();
    $stdObj->erreur = 1;
    $stdObj->messageErreur = $ex->getMessage();

    echo json_encode($stdObj);
}
