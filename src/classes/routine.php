<?php

require_once('IstockageJson.php');

class Routine implements IstockageJson {

    private $prenom;
    private $nbrEtoilesRecompenseTotal;
    private $cheminJson;
    private $nbrMedailles;
    private $nbrMedaillesAValider;

    public function __construct() {

        $nbrparametres = func_num_args();
        if ($nbrparametres == 0) {
            $this->prenom = "Vide";
            $this->nbrEtoilesRecompenseTotal = 0;
            $this->nbrMedailles = 0;
            $this->nbrMedaillesAValider = 0;
        } else if ($nbrparametres == 4) {
            $this->prenom = func_get_arg(0);
            $this->nbrEtoilesRecompenseTotal = func_get_arg(1);
            $this->nbrMedailles = func_get_arg(2);
            $this->nbrMedaillesAValider = func_get_arg(3);
        } else {
            throw new InvalidArgumentException("Constructeur de routine ne contient pas le bon nombre de paramètre");
        }
    }

    public function getPrenom() {
        return $this->prenom;
    }

    public function getNbrEtoilesRecompenseTotal() {
        return $this->nbrEtoilesRecompenseTotal;
    }

    public function getNbrMedaillesAValider() {
        return $this->nbrMedaillesAValider;
    }

    public function addNbrEtoiles($nbrEtoiles) {
        $this->nbrEtoilesRecompenseTotal += $nbrEtoiles;
    }

    public function getNbrMedailles() {
        return $this->nbrMedailles;
    }


    public function addNbrMedailles($nbrMedailles) {
        $this->nbrMedailles += $nbrMedailles;
    }

    public function addNbrMedaillesAValider($nbrMedaillesAValider) {
        $this->nbrMedaillesAValider += $nbrMedaillesAValider;
    }

    public function toJson() {
        $routineStdClass = new stdClass();
        $routineStdClass->prenom = $this->prenom;
        $routineStdClass->nbrEtoilesRecompenseTotal = $this->nbrEtoilesRecompenseTotal;
        $routineStdClass->nbrMedailles = $this->nbrMedailles;
        $routineStdClass->nbrMedaillesAValider = $this->nbrMedaillesAValider;
        
        return json_encode($routineStdClass);
    }
    public function charger($idFamille, $idEnfant, $idRoutine) {
        $cheminFichier = $this->cheminJson . DIRECTORY_SEPARATOR . 'famille-' . $idFamille
                . DIRECTORY_SEPARATOR . 'enfant-' . $idEnfant . '_routine-' . $idRoutine . '.json';

        if (!is_readable($cheminFichier)) {
            throw new InvalidArgumentException("Aucun fichier : " . $cheminFichier);
        }
        $fp = fopen($cheminFichier, "r");
        $str = fread($fp, filesize($cheminFichier));
        fclose($fp);
        
        $json = json_decode($str);
        $this->prenom = $json->prenom;
        $this->nbrEtoilesRecompenseTotal = $json->nbrEtoilesRecompenseTotal;
        $this->nbrMedailles = $json->nbrMedailles;
        $this->nbrMedaillesAValider = $json->nbrMedaillesAValider;
        
    }

    public function setConfigPersistence($config) {
        $this->cheminJson = $config[0];
    }

    public function sauvegarder($idFamille, $idEnfant, $idRoutine) {
        $routineStdClass = new stdClass();
        $routineStdClass->prenom = $this->prenom;
        $routineStdClass->nbrEtoilesRecompenseTotal = $this->nbrEtoilesRecompenseTotal;
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

}
