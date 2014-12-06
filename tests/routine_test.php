<?php

require_once('../src/classes/routine.php');

class routine_test extends PHPUnit_Framework_TestCase {

    protected $configApp;
    protected function setUp() {
        $this->routine = new Routine("Léanne", 0, 0, 0);
    }

    /**
     * @expectedException InvalidArgumentException
     */
    public function test_construct_1() {
        $this->routine = new Routine("Charles", 0, 0, 0, "bidon");
    }

    public function test_getNom_1() {
        $this->routine = new Routine("Charles", 0, 0, 0);
        $this->assertEquals("Charles", $this->routine->getPrenom());
    }

    public function test_getNom_2() {
        $this->assertEquals("Léanne", $this->routine->getPrenom());
    }

    public function test_getNbrEtoiles_0() {
        $this->assertEquals(0, $this->routine->getNbrEtoiles());
    }

    public function test_getNbrEtoiles_2() {
        $this->routine = new Routine("Léanne", 2, 3, 0);
        $this->assertEquals(2, $this->routine->getNbrEtoiles());
    }

    public function test_addNbrEtoiles() {
        $this->routine->addNbrEtoiles(1);
        $this->assertEquals(1, $this->routine->getNbrEtoiles());
        $this->routine->addNbrEtoiles(1);
        $this->assertEquals(2, $this->routine->getNbrEtoiles());
        $this->routine->addNbrEtoiles(2);
        $this->assertEquals(4, $this->routine->getNbrEtoiles());
        $this->routine->addNbrEtoiles(3);
        $this->assertEquals(7, $this->routine->getNbrEtoiles());
    }

    public function test_getNbrMedailles_0() {
        $this->assertEquals(0, $this->routine->getNbrEtoiles());
    }

    public function test_getNbrMedailles_2() {
        $this->routine = new Routine("Léanne", 2, 3, 0);
        $this->assertEquals(2, $this->routine->getNbrEtoiles());
    }

    public function test_addNbrMedailles() {
        $this->routine->addNbrEtoiles(1);
        $this->assertEquals(1, $this->routine->getNbrEtoiles());
        $this->routine->addNbrEtoiles(1);
        $this->assertEquals(2, $this->routine->getNbrEtoiles());
        $this->routine->addNbrEtoiles(2);
        $this->assertEquals(4, $this->routine->getNbrEtoiles());
        $this->routine->addNbrEtoiles(3);
        $this->assertEquals(7, $this->routine->getNbrEtoiles());
    }

    public function test_getNbrMedaillesAValider_0() {
        $this->assertEquals(0, $this->routine->getNbrMedaillesAValider());
    }

    public function test_getNbrMedaillesAValider_2() {
        $this->routine = new Routine("Léanne", 2, 3, 2);
        $this->assertEquals(2, $this->routine->getNbrMedaillesAValider());
    }


    public function test_loadJson_1() {
        $this->routine = new Routine();
        $this->routine->setConfigPersistence(array("./json"));
        $this->routine->charger(1, 1, 1);
        $this->assertEquals("Léanne", $this->routine->getPrenom());
        $this->assertEquals(2, $this->routine->getNbrEtoiles());
        $this->assertEquals(4, $this->routine->getNbrMedaillesAValider());
    }

    public function test_loadJson_2() {
        $this->routine = new Routine();
        $this->routine->setConfigPersistence(array("./json"));
        $this->routine->charger(1, 2, 1);
        $this->assertEquals("Charles", $this->routine->getPrenom());
        $this->assertEquals(3, $this->routine->getNbrEtoiles());
        $this->assertEquals(5, $this->routine->getNbrMedaillesAValider());
    }

    /**
     * @expectedException InvalidArgumentException
     */
    public function test_loadJson_absent() {
        $this->routine = new Routine();
        $this->routine->setConfigPersistence(array("./json"));
        $this->routine->charger(1, 3, 1);
    }

    public function test_sauvegarder() {
        shell_exec("rm -fr ./jsonSauvegarde/famille-1/*");

        $this->routine->setConfigPersistence(array("./jsonSauvegarder"));
        $this->routine->sauvegarder(1, 1, 1);
        $this->routine->charger(1, 1, 1);
        $this->assertEquals(0, $this->routine->getNbrEtoiles());
        $this->assertEquals(0, $this->routine->getNbrEtoiles());
        $this->assertEquals("Léanne", $this->routine->getPrenom());

        $this->routine->addNbrEtoiles(4);
        $this->routine->addNbrMedaillesAValider(5);

        $this->routine->sauvegarder(1, 1, 1);
        $this->routine->charger(1, 1, 1);
        $this->assertEquals(4, $this->routine->getNbrEtoiles());
        $this->assertEquals(5, $this->routine->getNbrMedaillesAValider());
        $this->assertEquals("Léanne", $this->routine->getPrenom());

        shell_exec("rm -fr ./jsonSauvegarde/famille-1/*");
    }

    /**
     * @expectedException InvalidArgumentException
     */
    public function test_sauvegarder_fammileAbsente() {
        $this->routine->setConfigPersistence(array("./jsonSauvegarder"));
        $this->routine->sauvegarder(2, 1, 1);
    }

    public function test_toJson_1() {
        $this->assertEquals('{"prenom":"L\u00e9anne","nbrEtoiles":0,"nbrMedailles":0,"nbrMedaillesAValider":0}', $this->routine->toJson());
    }

    public function test_toJson_2() {
        $this->routine = new Routine("Charles", 22, 10, 5);
        $this->assertEquals('{"prenom":"Charles","nbrEtoiles":22,"nbrMedailles":10,"nbrMedaillesAValider":5}', $this->routine->toJson());
    }

    public function test_validerMedailles() {
        $this->routine = new Routine("Charles", 22, 10, 5);

        $this->routine->validerMedailles(5);
        $this->assertEquals(15, $this->routine->getNbrMedailles());
        $this->assertEquals(0, $this->routine->getNbrMedaillesAValider());
    }

    public function test_validerMedailles_2() {
        $this->routine = new Routine("Charles", 22, 10, 5);

        $this->routine->validerMedailles(2);
        $this->assertEquals(12, $this->routine->getNbrMedailles());
        $this->assertEquals(0, $this->routine->getNbrMedaillesAValider());
    }

    /**
     * @expectedException InvalidArgumentException
     */
    public function test_validerMedailles_3() {
        $this->routine = new Routine("Charles", 22, 10, 5);

        $this->routine->validerMedailles(6);
    }

    /**
     * @expectedException InvalidArgumentException
     */
    public function test_validerMedailles_4() {
        $this->routine = new Routine("Charles", 22, 10, 5);

        $this->routine->validerMedailles("a");
    }

    public function test_setNbrMedailles_1() {
        $this->routine->setNbrMedailles(2);
        $this->assertEquals(2, $this->routine->getNbrMedailles());
    }

    public function test_setNbrMedailles_2() {
        $this->routine->setNbrMedailles(0);
        $this->assertEquals(0, $this->routine->getNbrMedailles());
    }

    /**
    * @expectedException InvalidArgumentException
    */
    public function test_setNbrMedailles_3() {
        $this->routine->setNbrMedailles("a");
    }

    /**
    * @expectedException InvalidArgumentException
    */
    public function test_setNbrMedailles_4() {
        $this->routine->setNbrMedailles(-1);
    }

    public function test_setNbrEtoiles_1() {
        $this->routine->setNbrEtoiles(2);
        $this->assertEquals(2, $this->routine->getNbrEtoiles());
    }
    
    public function test_setNbrEtoiles_2() {
        $this->routine->setNbrEtoiles(0);
        $this->assertEquals(0, $this->routine->getNbrEtoiles());
    }

    /**
    * @expectedException InvalidArgumentException
    */    
    public function test_setNbrEtoiles_3() {
        $this->routine->setNbrEtoiles("a");
    }
    
    /**
    * @expectedException InvalidArgumentException
    */    
    public function test_setNbrEtoiles_4() {
        $this->routine->setNbrEtoiles(-1);
    }    
}
