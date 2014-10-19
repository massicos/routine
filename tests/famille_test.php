<?php

require_once('../src/classes/famille.php');

class famille_test extends PHPUnit_Framework_TestCase {

    protected $famille;
    public function setUp() {
        $this->famille = new Famille(1, "json");
    }
    public function test_nom() {
        $this->assertEquals("Massicotte", $this->famille->getNom());
    }

    public function test_nom_bellemare() {
        $this->famille = new Famille(2, "json");
        $this->assertEquals("Bellemare", $this->famille->getNom());
    }

    /**
     * @expectedException InvalidArgumentException
     */
    public function test_nom_bellemare_exception() {
        $this->famille = new Famille(2, "jsonMauvaisChemin");
    }

    public function test_modeParent() {
        $this->assertEquals(false, $this->famille->isModeParent());

        $this->assertEquals(true, $this->famille->validerMdp("bonmdp"));
        $this->assertEquals(true, $this->famille->isModeParent());

        $this->famille->quitterModeParent();
        $this->assertEquals(false, $this->famille->isModeParent());

        $this->assertEquals(false, $this->famille->validerMdp("mauvaismdp"));
        $this->assertEquals(false, $this->famille->isModeParent());
    }
}
