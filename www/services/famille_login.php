<?php
require_once('../config.php');

require_once($configApp->getRacineClasses() . '/famille.php');
require_once($configApp->getRacineClasses() . '/routine.php');

try {

    session_start();
    $stdObj = new stdClass();
    if (array_key_exists('idFamille', $_SESSION)) {
        $stdObj->isLogin = true;        
    }
    else {
        //echo $_REQUEST['login'] . "<br>\n";
        //echo $_REQUEST['password'] . "<br>\n";

        $stdObj = new stdClass();
        $stdObj->isLogin = false;
        $maxFamille = Famille::getNbrFamilles($configApp->getRacineData());
        for ($i = 0; $i <= $maxFamille; $i++) {
            $famille = new Famille($i, $configApp->getRacineData());
//            echo $famille->getNom() . "<br>\n";
//            echo $_REQUEST['login'] . "<br>\n";
//            echo $_REQUEST['password'] . "<br>\n";
            if ($famille->getNom() == $_REQUEST['login']) {
                //echo "check mdp\n";
                $stdObj->isLogin = $famille->validerMdpAcces($_REQUEST['password']);
                if ($stdObj->isLogin) {
                    $_SESSION['idFamille'] = $i;
                    //echo "check mdp true\n";
                }
                break;
            }
        }  
    }
    echo json_encode($stdObj);
} catch (Exception $ex) {
    $stdObj = new stdClass();
    $stdObj->erreur = 1;
    $stdObj->messageErreur = $ex->getMessage();
    
    header('500: Error', true, 500);
    echo json_encode($stdObj);
}
