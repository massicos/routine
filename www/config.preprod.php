<?php

define('NIVEAU', "preprod");
define('RACINE', '/app');
require_once(RACINE . '/routine-' . NIVEAU .  '/classes/configApp.php');

global $configApp;
$configApp = new configApp(NIVEAU, "0.4 (GITLOG)", RACINE);
