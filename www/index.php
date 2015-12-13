<?php

require_once("config.php");
require_once('detectionLogin.php');

?>
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Tableau de bord - Routine<?php echo $configApp->getSuffixeCheminpParNiveau() ?></title>
        <link rel="stylesheet" href="css/general.css">
        <link rel="stylesheet" href="css/tableauBord.css">
        <link rel="stylesheet" href="css/modeParent.css">
        <link rel="stylesheet" href="css/validerMedaille.css">
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
        <script src="js/dialogModeParent.js"></script>
        <script src="js/dialogValiderMedaille.js"></script>
        <script src="js/dialogSetEtoilesMedailles.js"></script>

    </head>
    <body>
        <?php require_once($configApp->getRacineGabarits() . '/header.php'); ?>
<div id="modeParentActif">mode parent actif <a id="modeParentQuitter" href="javascript:void(0)"><i class="ui-icon ui-icon-circle-close" style="display: inline-block;vertical-align: text-bottom;"></i></a></div>
<button id="btnOuvrirDialogModeParent">Passer en mode parent</button>
<div id="dialogModeParent" title="Mode parent">
Mot de passe : <input type="password" name="mdpParent" id="mdpParent">
<div id="modeParentMessage"></div>
</div>

<div id="dialogValiderMedaille" title="Valider les médailles">
<div id="validerMedailleFormulaire">
<p>Nombre de médailles à valider : <input type="text" name="nbrMedailleValider" id="nbrMedailleValider" maxlength="2"></p>
<p>Nouveau total de médailles : <span id="nouveauTotalMedaille">0</span></p>
</div>
<div id="validerMedailleConfirmation">
<p>Êtes-vous certain des nouveaux chiffres ?
<p>Nombre de médailles à valider : <span id="nbrMedailleValiderConfirmation">0</p>
<p>Nouveau total de médailles : <span id="nouveauTotalMedailleConfirmation">0</span></p>
</div>
<div id="medailleValiderMessage" class="erreurValidation">Veuillez entrer nombre valide de médaille à valider.</div>
</div>

<div id="dialogSetEtoilesMedaille" title="Mettre à jour les étoiles et les médailles">
    <div id="setEtoilesMedaillesFormulaire">
        <p>Éditer le montant directement <input type="checkbox" name="chkBoxMontant" id="chkBoxMontant"></p>
        <p>Nombre d'étoiles : <input type="text" name="nouveauNbrEtoiles" id="nouveauNbrEtoiles"></p>
        <p>Nombre de médailles : <input type="text" name="nouveauNbrMedailles" id="nouveauNbrMedailles"></p></p>
        <p>Nouveau total en argent : <input type="text" name="nouveauTotalArgent" id="nouveauTotalArgent" valie="0">$</p>
    </div>
    <div id="setEtoilesMedaillesConfirmation">
        <p>Êtes-vous certain des nouveaux chiffres ?
            <p>Nombre d'étoiles : <span id="nouveauNbrEtoilesConfirmation">0</span></p>
            <p>Nombre de médailles : <span id="nouveauNbrMedaillesConfirmation">0</span></p></p>
            <p>Nouveau total en argent : <span id="nouveauTotalArgentConfirmation">0</span>$</p>
            </div>
            <div id="setEtoilesMedailleMessage" class="erreurValidation">Veuillez entrer nombre valide.</div>
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
                            <td><span class="nbrMedailles">0</span><em class="nbrMedaillesAValiderParenthese">(<em class="nbrMedaillesAValider">0</em>) <button class="btnOuvrirDialogValiderMedaille">Valider des médailles</button></td>
                            <td class="sousTotalMedailles">0</td>
                            <td><span class="total">0</span> <button class="btnOuvrirDialogSetEtoilesMedailles">Édition</button></td>
                        </tr>
                    </table>
                </div>
            </li>
        </ul>
        <?php require_once($configApp->getRacineGabarits() . '/footer.php'); ?>
    </body>
</html>
