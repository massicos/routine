<?php

define('NIVEAU', "prod");
require_once('/app/routine/classes/configApp.php');

global $configApp;
$configApp = new configApp(NIVEAU, "0.4 (GITLOG)");
