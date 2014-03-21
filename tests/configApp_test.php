<?php

require_once('../src/classes/configApp.php');

class configApp_test extends PHPUnit_Framework_TestCase {

    protected $configApp;
    protected function setUp() {
        $this->configApp = new configApp("unitTest", "0.2");    
    }
    
    public function test_getNiveau() {     
        $this->assertEquals("unitTest", $this->configApp->getNiveau());
    }
    
    public function test_getNiveau_2() {
        $this->configApp = new configApp("unitTest2", "0.3");
        $this->assertEquals("unitTest2", $this->configApp->getNiveau());
    }
    
    public function test_getVersion() {     
        $this->assertEquals("0.2", $this->configApp->getVersion());
    }
    
    public function test_getVersion_2() {
        $this->configApp = new configApp("unitTest2", "0.3");
        $this->assertEquals("0.3", $this->configApp->getVersion());
    }
    
    public function test_getSuffixeCheminData() {     
        $this->assertEquals("unitTest", $this->configApp->getSuffixeCheminpParNiveau());
    }
    
    public function test_getSuffixeCheminData_2() {
        $this->configApp = new configApp("prod", "0.3");
        $this->assertEquals("", $this->configetSuffixeCheminpParNiveauinData());
    }    

}
