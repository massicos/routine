<?php

require_once('IstockageJson.php');

class Routine implements IstockageJson {

    private $prenom;
    private $nbrEtoiles;
    private $cheminJson;
    private $nbrMedailles;
    private $nbrMedaillesAValider;

    public function __construct() {

        $nbrparametres = func_num_args();
        if ($nbrparametres == 0) {
            $this->prenom = "Vide";
            $this->nbrEtoiles = 0;
            $this->nbrMedailles = 0;
            $this->nbrMedaillesAValider = 0;
        } else if ($nbrparametres == 4) {
            $this->prenom = func_get_arg(0);
            $this->nbrEtoiles = func_get_arg(1);
            $this->nbrMedailles = func_get_arg(2);
            $this->nbrMedaillesAValider = func_get_arg(3);
        } else {
            throw new InvalidArgumentException("Constructeur de routine ne contient pas le bon nombre de paramètre");
        }
    }

    public function getPrenom() {
        return $this->prenom;
    }

    public function getNbrEtoiles() {
        return $this->nbrEtoiles;
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

    public function toJson() {
        $routineStdClass = new stdClass();
        $routineStdClass->prenom = $this->prenom;
        $routineStdClass->nbrEtoiles = $this->nbrEtoiles;
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
        $this->nbrEtoiles = $json->nbrEtoiles;
        $this->nbrMedailles = $json->nbrMedailles;
        $this->nbrMedaillesAValider = $json->nbrMedaillesAValider;

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
