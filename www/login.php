<?php
require_once("config.php");
?>

<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Tableau de bord - Routine<?php echo $configApp->getSuffixeCheminpParNiveau() ?></title>
        <link rel="stylesheet" href="css/general.css">
        <link rel="stylesheet" href="css/login.css">
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
        <script src="js/login.js"></script>

    </head>
    <body>

        <div id="loginForm" title="Mode parent">
            <div class="loginFormRow">
                <div class="loginFormCell">Code d'usager :</div>
                <div class="loginFormCell"><input type="text" name="login" id="login"></div>
            </div>
            <div class="loginFormRow">
                <div class="loginFormCell">Mot de passe :</div>
                <div class="loginFormCell"><input type="password" name="mdpParent" id="password"></div>
            </div>
        </div>

        <div id="loginMessage"></div>
        <input type="button" value="Se connecter" id="btnConnecter">
        
        <?php require_once($configApp->getRacineGabarits() . '/footer.php'); ?>
    </body>
</html>        