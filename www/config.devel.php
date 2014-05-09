<?php

define('NIVEAU', "devel");
require_once('/app/routine-' . NIVEAU .  '/classes/configApp.php');

global $configApp;
$configApp = new configApp(NIVEAU, "0.3 (GITLOG)");
