<?php

require_once('../src/classes/famille.php');
require_once('../src/classes/routine.php');

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

    public function test_getMontantParEtoile() {
        $this->assertEquals(0.05, $this->famille->getMontantParEtoile());
    }

    public function test_getMontantParMedaille() {
        $this->assertEquals(0.25, $this->famille->getMontantParMedaille());
    }

    public function test_getNbrRoutines_0() {
        $this->famille = new Famille(0, "json");
        $this->assertEquals(0, $this->famille->getNbrRoutines());
    }

    public function test_getNbrRoutines_1() {
        $this->assertEquals(2, $this->famille->getNbrRoutines());
    }

    public function test_gestRoutineParNomRoutinePrenom() {
        $routine = $this->famille->getRoutineParNomRoutinePrenom("Routine A", "Léanne Json");
        $this->assertEquals("Léanne Json", $routine->getPrenom());
        $this->assertEquals("Routine A", $routine->getNomRoutine());
    }

    public function test_gestRoutineParNomRoutinePrenom_aucun1() {
        $routine = $this->famille->getRoutineParNomRoutinePrenom("Routine ABC", "Léanne Json");
        $this->assertEquals(false, $routine);
    }

    public function test_gestRoutineParNomRoutinePrenom_aucun2() {
        $routine = $this->famille->getRoutineParNomRoutinePrenom("Routine A", "Léanne Json vide");
        $this->assertEquals(false, $routine);
    }
}
