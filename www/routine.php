<?php

require_once("config.php");
require_once($configApp->getRacineClasses() . '/famille.php');
require_once($configApp->getRacineClasses() . '/routine.php');

try {
    $idFamille = 1;

    $famille = new Famille($idFamille, $configApp->getRacineData());
    $familleStdObj = $famille->toStdClass();
} catch (Exception $ex) {
    $stdObj = new stdClass();
    $stdObj->erreur = 1;
    $stdObj->messageErreur = $ex->getMessage();

    echo json_encode($stdObj);
}
?>
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Routine<?php echo $configApp->getSuffixeCheminpParNiveau() ?></title>
        <link rel="stylesheet" href="css/general.css">
        <link rel="stylesheet" href="css/styleRoutine.css">
        <link rel="stylesheet" href="css/base/jquery.ui.all.css">
        <script src="js/lib/Chart.js"></script>
        <script src="js/lib/timerChart.js"></script>
        <script src="js/lib/jquery.min.js"></script>

        <script src="js/lib/ui/jquery.ui.core.js"></script>
        <script src="js/lib/ui/jquery.ui.widget.js"></script>
        <script src="js/lib/ui/jquery.ui.mouse.js"></script>
        <script src="js/lib/ui/jquery.ui.selectable.js"></script>
        <script src="js/lib/ui/jquery.ui.progressbar.js"></script>

        <script src="js/configApp.js"></script>
        <script src="js/config.js"></script>
        <script src="js/itemRoutine.js"></script>
        <script src="js/routine.js"></script>
        <script src="js/famille.js"></script>
        <script src="js/routinePage.js"></script>
        <script src="js/headerView.js"></script>
    </head>
    <body>
        <?php require_once($configApp->getRacineGabarits() . '/header.php'); ?>
        <?php require_once($configApp->getRacineGabarits() . '/conteneurRoutines.php'); ?>
        <?php require_once($configApp->getRacineGabarits() . '/footer.php'); ?>
    </body>
</html>
