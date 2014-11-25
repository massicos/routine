<?php

define('NIVEAU', "prod");
define('RACINE', '/home/poudlar/app');
require_once(RACINE . '/routine/classes/configApp.php');

global $configApp;
$configApp = new configApp(NIVEAU, "0.4 (GITLOG)", RACINE);
