<?php

require_once('IstockageJson.php');
require_once('itemRoutine.php');

class Routine implements IstockageJson {

    private $prenom;
    private $nbrEtoiles;
    private $cheminJson;
    private $nbrMedailles;
    private $nbrMedaillesAValider;
    private $itemsRoutine;
    private $nomRoutine;

    public function __construct() {

        $nbrparametres = func_num_args();
        if ($nbrparametres == 0) {
            $this->nomRoutine = "Vide";
            $this->prenom = "Vide";
            $this->nbrEtoiles = 0;
            $this->nbrMedailles = 0;
            $this->nbrMedaillesAValider = 0;
            $this->photo = "";
        } else if ($nbrparametres == 6) {
            $this->nomRoutine = func_get_arg(0);
            $this->prenom = func_get_arg(1);
            $this->nbrEtoiles = func_get_arg(2);
            $this->nbrMedailles = func_get_arg(3);
            $this->nbrMedaillesAValider = func_get_arg(4);
            $this->photo = func_get_arg(5);
        } else {
            throw new InvalidArgumentException("Constructeur de routine ne contient pas le bon nombre de paramètre");
        }
        $this->itemsRoutine = array();
    }

    public function getPrenom() {
        return $this->prenom;
    }

    public function getNbrEtoiles() {
        return $this->nbrEtoiles;
    }

    public function getNomRoutine() {
        return $this->nomRoutine;
    }

    public function setNbrEtoiles($nbrEtoiles) {
        if (!is_int($nbrEtoiles)) {
            throw new InvalidArgumentException("Nombre d'étoiles est invalide.");
        }
        if ($nbrEtoiles < 0) {
            throw new InvalidArgumentException("Nombre d'étoiles est invalide (plus petit que 0).");
        }
        $this->nbrEtoiles = $nbrEtoiles;
    }

    public function getNbrMedaillesAValider() {
        return $this->nbrMedaillesAValider;
    }

    public function addNbrEtoiles($nbrEtoiles) {
        $this->nbrEtoiles += $nbrEtoiles;
    }

    public function getNbrMedailles() {
        return $this->nbrMedailles;
    }

    public function setNbrMedailles($nbrMedailles) {
        if (!is_int($nbrMedailles)) {
            throw new InvalidArgumentException("Nombre de médailles invalide.");
        }
        if ($nbrMedailles < 0) {
            throw new InvalidArgumentException("Nombre de médailles invalide (plus petit que 0).");
        }
        $this->nbrMedailles = $nbrMedailles;
    }

    public function addNbrMedailles($nbrMedailles) {
        $this->nbrMedailles += $nbrMedailles;
    }

    public function addNbrMedaillesAValider($nbrMedaillesAValider) {
        $this->nbrMedaillesAValider += $nbrMedaillesAValider;
    }

    public function getNbrItemsRoutine() {
        return count($this->itemsRoutine);
    }

    public function getIndexOfItemsRoutine($index) {
        if (empty($this->itemsRoutine)) {
            throw new OutOfBoundsException("itemsRoutine vide.");
        }
        if ($index > count($this->itemsRoutine)) {
            throw new OutOfBoundsException("Index plus grand que le nombre d'itemsRoutine.");
        }
        return $this->itemsRoutine[$index];
    }

    public function addItemRoutine($itemRoutine){
        $this->itemsRoutine[] = $itemRoutine;
    }

    public function toJson() {
        $routineStdClass = new stdClass();
        $routineStdClass->nomRoutine = $this->nomRoutine;
        $routineStdClass->prenom = $this->prenom;
        $routineStdClass->nbrEtoiles = $this->nbrEtoiles;
        $routineStdClass->nbrMedailles = $this->nbrMedailles;
        $routineStdClass->nbrMedaillesAValider = $this->nbrMedaillesAValider;

        return json_encode($routineStdClass);
    }

    public function toStdClass() {
        $routineStdClass = new stdClass();
        $routineStdClass->nomRoutine = $this->nomRoutine;
        $routineStdClass->prenom = $this->prenom;
        $routineStdClass->nbrEtoiles = $this->nbrEtoiles;
        $routineStdClass->nbrMedailles = $this->nbrMedailles;
        $routineStdClass->nbrMedaillesAValider = $this->nbrMedaillesAValider;
        $routineStdClass->photo = $this->photo;

        $routineStdClass->itemsRoutine = array();
        $max = count($this->itemsRoutine);
        for ($i = 0; $i < $max; $i++) {
            $routineStdClass->itemsRoutine[] = $this->itemsRoutine[$i]->toStdClass();
        }

        return $routineStdClass;
    }

    public function charger($json) {
        $this->prenom = $json->prenom;
        $this->nbrEtoiles = $json->nbrEtoiles;
        $this->nbrMedailles = $json->nbrMedailles;
        $this->nbrMedaillesAValider = $json->nbrMedaillesAValider;
        $this->nomRoutine = $json->nomRoutine;
        $this->photo = $json->photo;

        if (isset($json->itemsRoutine)) {
            $max = count($json->itemsRoutine);
            for ($i = 0; $i < $max; $i++) {
                $itemRoutine = new ItemRoutine();
                $itemRoutine->charger($json->itemsRoutine[$i]);
                $this->itemsRoutine[] = $itemRoutine;
            }
        }

    }

    public function setConfigPersistence($config) {
        $this->cheminJson = $config[0];
    }

    public function sauvegarder($idFamille, $idEnfant, $idRoutine) {
        $routineStdClass = new stdClass();
        $routineStdClass->prenom = $this->prenom;
        $routineStdClass->nbrEtoiles = $this->nbrEtoiles;
        $routineStdClass->nbrMedailles = $this->nbrMedailles;
        $routineStdClass->nbrMedaillesAValider = $this->nbrMedaillesAValider;

        $cheminFamille = $this->cheminJson . DIRECTORY_SEPARATOR . 'famille-' . $idFamille;
        if (!is_dir($cheminFamille)) {
            throw new InvalidArgumentException("Aucun répertoire : " . $cheminFamille);
        }
        $cheminFichier = $cheminFamille
                . DIRECTORY_SEPARATOR . 'enfant-' . $idEnfant . '_routine-' . $idRoutine . '.json';
        $fp = fopen($cheminFichier, "w+");
        fwrite($fp, json_encode($routineStdClass));
        fclose($fp);
    }

    public function validerMedailles($nbrMedaillesAValider) {
        //echo "nbrMedaillesAValider = " . $nbrMedaillesAValider . "\n";
        //echo "$nbrMedaillesAValider > $this->nbrMedaillesAValider\n";
        if (!is_int($nbrMedaillesAValider)) {
            throw new InvalidArgumentException("Nombre de médailles à valider invalide. int");
        }
        if ($nbrMedaillesAValider > $this->nbrMedaillesAValider) {
            throw new InvalidArgumentException("Nombre de médailles à valider invalide.");
        }
        $this->nbrMedailles = $this->nbrMedailles + $nbrMedaillesAValider;
        $this->nbrMedaillesAValider = 0;

        return true;
    }

}
