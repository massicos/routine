<?php

require_once('../src/classes/itemRoutine.php');

class itemRoutine_test extends PHPUnit_Framework_TestCase {

    protected $itemRoutine;
    protected function setUp() {
        $this->itemRoutine = new ItemRoutine("Texte de l'item", "images/image.png", 2, 5);
    }

    public function test_get() {
        $this->assertEquals("Texte de l'item", $this->itemRoutine->getTexte());
        $this->assertEquals("images/image.png", $this->itemRoutine->getCheminImage());
        $this->assertEquals(2, $this->itemRoutine->getTempsMinutes());
        $this->assertEquals(5, $this->itemRoutine->getNbrEtoiles());
    }

    public function test_getTexte_2() {
        $this->itemRoutine = new ItemRoutine("Texte de l'item2", "images/image2.png", 3, 10);
        $this->assertEquals("Texte de l'item2", $this->itemRoutine->getTexte());
        $this->assertEquals("images/image2.png", $this->itemRoutine->getCheminImage());
        $this->assertEquals(3, $this->itemRoutine->getTempsMinutes());
        $this->assertEquals(10, $this->itemRoutine->getNbrEtoiles());
    }

    public function test_charger_1() {
        $str = file_get_contents("json/itemsRoutine-1.json");
        $json = json_decode($str);
        $this->itemRoutine = new ItemRoutine();
        $this->itemRoutine->charger($json);
        $this->assertEquals("Déjeuner", $this->itemRoutine->getTexte());
        $this->assertEquals("../routinePerso/images/itemsRoutine/dejeuner.jpg", $this->itemRoutine->getCheminImage());
        $this->assertEquals(15, $this->itemRoutine->getTempsMinutes());
        $this->assertEquals(8, $this->itemRoutine->getNbrEtoiles());
    }

    public function test_charger_2() {
        $str = file_get_contents("json/itemsRoutine-2.json");
        $json = json_decode($str);
        $this->itemRoutine = new ItemRoutine();
        $this->itemRoutine->charger($json);
        $this->assertEquals("Faire son lit", $this->itemRoutine->getTexte());
        $this->assertEquals("../routinePerso/images/itemsRoutine/lit.jpg", $this->itemRoutine->getCheminImage());
        $this->assertEquals(10, $this->itemRoutine->getTempsMinutes());
        $this->assertEquals(5, $this->itemRoutine->getNbrEtoiles());
    }

}
