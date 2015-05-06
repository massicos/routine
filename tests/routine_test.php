<?php

require_once('../src/classes/routine.php');
require_once('../src/classes/itemRoutine.php');

class routine_test extends PHPUnit_Framework_TestCase {

    protected $configApp;
    protected function setUp() {
        $this->routine = new Routine("Routine 1", "Léanne", 0, 0, 0, "image.jpg");
    }

    /**
     * @expectedException InvalidArgumentException
     */
    public function test_construct_1() {
        $this->routine = new Routine("Routine 2", "Charles", 0, 0, 0, "images.jpg", "bidon");
    }

    public function test_getNom_1() {
        $this->routine = new Routine("Routine 2", "Charles", 0, 0, 0, "image.jpg");
        $this->assertEquals("Charles", $this->routine->getPrenom());
    }

    public function test_getNbrItemsRoutine() {
        $this->assertEquals(0, $this->routine->getNbrItemsRoutine());
    }

    public function test_getNbrItemsRoutine_1_2() {
        $this->routine->addItemRoutine(new ItemRoutine("Texte de l'item 1", "images/image.png", 2, 5));
        $this->assertEquals(1, $this->routine->getNbrItemsRoutine());
        $this->routine->addItemRoutine(new ItemRoutine("Texte de l'item 2", "images/image.png", 2, 5));
        $this->assertEquals(2, $this->routine->getNbrItemsRoutine());

        $itemRoutine = $this->routine->getIndexOfItemsRoutine(0);
        $this->assertEquals("Texte de l'item 1", $itemRoutine->getTexte());
        $itemRoutine = $this->routine->getIndexOfItemsRoutine(1);
        $this->assertEquals("Texte de l'item 2", $itemRoutine->getTexte());
    }

    /**
    * @expectedException OutOfBoundsException
    */
    public function test_getNbrItemsRoutine_1_3() {
        $this->routine->addItemRoutine(new ItemRoutine("Texte de l'item 1", "images/image.png", 2, 5));
        $this->assertEquals(1, $this->routine->getNbrItemsRoutine());
        $this->routine->addItemRoutine(new ItemRoutine("Texte de l'item 2", "images/image.png", 2, 5));
        $this->assertEquals(2, $this->routine->getNbrItemsRoutine());

        $itemRoutine = $this->routine->getIndexOfItemsRoutine(3);
    }

    /**
    * @expectedException OutOfBoundsException
    */
    public function test_getNbrItemsRoutine_0() {
        $itemRoutine = $this->routine->getIndexOfItemsRoutine(0);
    }

    public function test_getNom_2() {
        $this->assertEquals("Léanne", $this->routine->getPrenom());
    }

    public function test_getNbrEtoiles_0() {
        $this->assertEquals(0, $this->routine->getNbrEtoiles());
    }

    public function test_getNbrEtoiles_2() {
        $this->routine = new Routine("Routine 1", "Léanne", 2, 3, 0, "image.jpg");
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
        $this->routine = new Routine("Routine 1", "Léanne", 2, 3, 0, "image.jpg");
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
        $this->routine = new Routine("Routine 1", "Léanne", 2, 3, 2, "image.jpg");
        $this->assertEquals(2, $this->routine->getNbrMedaillesAValider());
    }


    public function test_loadJson_1() {
        $str = file_get_contents("json/routine-1.json");
        //$this->routine = new Routine();
        //$this->routine->setConfigPersistence(array("./json"));
        $this->routine->charger(json_decode($str));
        $this->assertEquals("Léanne", $this->routine->getPrenom());
        $this->assertEquals(425, $this->routine->getNbrEtoiles());
        $this->assertEquals(22, $this->routine->getNbrMedaillesAValider());
        $this->assertEquals("Routine 1", $this->routine->getNomRoutine());
    }

    public function test_loadJson_2() {
        $str = file_get_contents("json/routine-2.json");
        //$this->routine = new Routine();
        //$this->routine->setConfigPersistence(array("./json"));
        $this->routine->charger(json_decode($str));
        $this->assertEquals("Charles", $this->routine->getPrenom());
        $this->assertEquals(420, $this->routine->getNbrEtoiles());
        $this->assertEquals(23, $this->routine->getNbrMedaillesAValider());
        $this->assertEquals("Routine 2", $this->routine->getNomRoutine());
        $this->assertEquals(0, $this->routine->getNbrItemsRoutine());
    }

    public function test_loadJson_3() {
        $str = file_get_contents("json/routine-3.json");
        //$this->routine = new Routine();
        //$this->routine->setConfigPersistence(array("./json"));
        $this->routine->charger(json_decode($str));
        $this->assertEquals("Léanne", $this->routine->getPrenom());
        $this->assertEquals(400, $this->routine->getNbrEtoiles());
        $this->assertEquals(15, $this->routine->getNbrMedaillesAValider());
        $this->assertEquals(15, $this->routine->getNbrMedaillesAValider());
        $this->assertEquals("Routine 3", $this->routine->getNomRoutine());
        $this->assertEquals(2, $this->routine->getNbrItemsRoutine());
    }

    public function test_toJson_1() {
        $this->assertEquals('{"nomRoutine":"Routine 1","prenom":"L\u00e9anne","nbrEtoiles":0,"nbrMedailles":0,"nbrMedaillesAValider":0}', $this->routine->toJson());
    }

    public function test_toJson_2() {
        $this->routine = new Routine("Routine 2", "Charles", 22, 10, 5, "image.jpg");
        $this->assertEquals('{"nomRoutine":"Routine 2","prenom":"Charles","nbrEtoiles":22,"nbrMedailles":10,"nbrMedaillesAValider":5}', $this->routine->toJson());
    }

    public function test_validerMedailles() {
        $this->routine = new Routine("Routine 2", "Charles", 22, 10, 5, "image.jpg");

        $this->routine->validerMedailles(5);
        $this->assertEquals(15, $this->routine->getNbrMedailles());
        $this->assertEquals(0, $this->routine->getNbrMedaillesAValider());
    }

    public function test_validerMedailles_2() {
        $this->routine = new Routine("Routine 2", "Charles", 22, 10, 5, "image.jpg");

        $this->routine->validerMedailles(2);
        $this->assertEquals(12, $this->routine->getNbrMedailles());
        $this->assertEquals(0, $this->routine->getNbrMedaillesAValider());
    }

    /**
     * @expectedException InvalidArgumentException
     */
    public function test_validerMedailles_3() {
        $this->routine = new Routine("Charles", 22, 10, 5, "image.jpg");

        $this->routine->validerMedailles(6);
    }

    /**
     * @expectedException InvalidArgumentException
     */
    public function test_validerMedailles_4() {
        $this->routine = new Routine("Charles", 22, 10, 5, "image.jpg");

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
