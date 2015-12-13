<?php

session_start();
if (!array_key_exists('idFamille', $_SESSION)) {
    header("Location: login.php");
}
