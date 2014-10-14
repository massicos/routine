<?php

require_once("config.php");

?>
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Tableau de bord - Routine<?php echo $configApp->getSuffixeCheminpParNiveau() ?></title>
        <link rel="stylesheet" href="css/general.css">
        <link rel="stylesheet" href="css/tableauBord.css">
        <link rel="stylesheet" href="css/base/jquery.ui.all.css">
        <script src="js/lib/jquery.min.js"></script>
        <script src="js/lib/jquery-ui.custom.min.js"></script>
<!--
        <script src="js/lib/ui/jquery.ui.core.js"></script>
        <script src="js/lib/ui/jquery.ui.widget.js"></script>
        <script src="js/lib/ui/jquery.ui.mouse.js"></script>
        <script src="js/lib/ui/jquery.ui.selectable.js"></script>
        <script src="js/lib/ui/jquery.ui.progressbar.js"></script>
-->
        <script src="js/configApp.js"></script>
        <script src="js/config.js"></script>
        <script src="js/itemRoutine.js"></script>
        <script src="js/routine.js"></script>
        <script src="js/famille.js"></script>
        <script src="js/tableauBordPage.js"></script>
        <script src="js/headerView.js"></script>
        <script src="js/dialogValiderMedailles.js"></script>

    </head>
    <body>
        <?php require_once('/app/routine' . $configApp->getSuffixeCheminpParNiveau() . '/gabarits/header.php'); ?>

<button id="ouvrirDialog">Valider les médailles</button>
<div id="dialog-confirm" title="Validation des médailles">
<p><span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 20px 0;"></span></p>
Mot de passe - Mode parent : <input type="text" name="mdpParent" id="mdpParent">
</div>
        <ul>
            <li><a href="routine.php">Routine du matin</a>
                <div class="CSSTableGenerator" >
                    <table class="tableauBord">
                        <tr>
                            <td>Nom</td>
                            <td><img src="images/icons/star.png"></td>
                            <td>$</td>
                            <td><img src="images/icons/medal_gold_1.png"></td>
                            <td>$</td>
                            <td>Total</td>
                        </tr>
                        <tr class="tableauBordRoutine">
                            <td class="prenom"></td>
                            <td class="nbrEtoiles">0</td>
                            <td class="sousTotalEtoiles">0</td>
                            <td><span class="nbrMedailles">0</span><em class="nbrMedaillesAValiderParenthese">(<em class="nbrMedaillesAValider">0</em>)</td>
                            <td class="sousTotalMedailles">0</td>
                            <td class="total">0</td>
                        </tr>
                    </table>
                </div>
            </li>
        </ul>
        <?php require_once('/app/routine' . $configApp->getSuffixeCheminpParNiveau() . '/gabarits/footer.php'); ?>
    </body>
</html>
