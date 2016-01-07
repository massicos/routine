<?php

define('NIVEAU', "preprod");
define('RACINE', '/home/poudlar/app');
require_once(RACINE . '/routine-' . NIVEAU .  '/classes/configApp.php');

global $configApp;
$configApp = new configApp(NIVEAU, "0.5 (GITLOG)", RACINE);
