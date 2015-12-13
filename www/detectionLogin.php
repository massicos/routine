<?php

session_start();
//echo $_SESSION['idFamille'] . "<br>\n";
if (!array_key_exists('idFamille', $_SESSION)) {
    header("Location: login.php");
    //echo "existe pas <br>\n";
}
//else {
//    echo "existe<br>\n";
//}
