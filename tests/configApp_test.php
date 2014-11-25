<?php

require_once('../src/classes/configApp.php');

class configApp_test extends PHPUnit_Framework_TestCase {

    protected $configApp;
    protected function setUp() {
        $this->configApp = new configApp("unitTest", "0.2", "/app");
    }

    public function test_getNiveau() {
        $this->assertEquals("unitTest", $this->configApp->getNiveau());
    }

    public function test_getNiveau_2() {
        $this->configApp = new configApp("unitTest2", "0.3", "/app");
        $this->assertEquals("unitTest2", $this->configApp->getNiveau());
    }

    public function test_getVersion() {
        $this->assertEquals("0.2", $this->configApp->getVersion());
    }

    public function test_getVersion_2() {
        $this->configApp = new configApp("unitTest2", "0.3", "/app");
        $this->assertEquals("0.3", $this->configApp->getVersion());
    }

    public function test_getSuffixeCheminData() {
        $this->assertEquals("-unitTest", $this->configApp->getSuffixeCheminpParNiveau());
    }

    public function test_getSuffixeCheminData_2() {
        $this->configApp = new configApp("prod", "0.3", "/app");
        $this->assertEquals("", $this->configApp->getSuffixeCheminpParNiveau());
    }

    public function test_getRacine() {
        $this->assertEquals("/app", $this->configApp->getRacine());
    }

    public function test_getRacine_2() {
        $this->configApp = new configApp("prod", "0.3", "/app/tmp");
        $this->assertEquals("/app/tmp", $this->configApp->getRacine());
    }

    public function test_getRacineClasses_1() {
        $this->assertEquals("/app/routine-unitTest/classes", $this->configApp->getRacineClasses());
    }

    public function test_getRacineClasses_2() {
        $this->configApp = new configApp("prod", "0.3", "/app");
        $this->assertEquals("/app/routine/classes", $this->configApp->getRacineClasses());
    }

    public function test_getRacineGabarits_1() {
        $this->assertEquals("/app/routine-unitTest/gabarits", $this->configApp->getRacineGabarits());
    }

    public function test_getRacineGabarits_2() {
        $this->configApp = new configApp("prod", "0.3", "/app");
        $this->assertEquals("/app/routine/gabarits", $this->configApp->getRacineGabarits());
    }

    public function test_getRacineData_1() {
        $this->assertEquals("/app/data/routine-unitTestdata", $this->configApp->getRacineData());
    }

    public function test_getRacineData_2() {
        $this->configApp = new configApp("prod", "0.3", "/app");
        $this->assertEquals("/app/data/routinedata", $this->configApp->getRacineData());
    }
}
