<?php
require_once('../config.php');

require_once('/app/routine' . $configApp->getSuffixeCheminpParNiveau() .  '/classes/routine.php');


try {
    $idFamille = $_REQUEST['idFamille'];
    $idEnfant = $_REQUEST['idEnfant'];
    $idRoutine = $_REQUEST['idRoutine'];
    
    $routine = new Routine();
    $routine->setConfigPersistence(array("/app/data/routine" . $configApp->getSuffixeCheminpParNiveau() . "data"));
    $routine->charger($idFamille, $idEnfant, $idRoutine);
    echo $routine->getNbrMedailles() . "<br>\n";
    //echo $routine->getNbrEtoilesRecompenseTotal() . "<br>\n";
    
    echo $routine->toJson();
} catch (Exception $ex) {
    $stdObj = new stdClass();
    $stdObj->erreur = 1;
    $stdObj->messageErreur = $ex->getMessage();
    
    echo json_encode($stdObj);
    //echo "Exception !!<br>\n";
}