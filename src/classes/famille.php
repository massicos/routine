<?php

require_once("routine.php");

class Famille {
    private $nom;
    private $email;
    private $cheminJson;
    private $mdp;
    private $mdpAcces;
    private $modeParent;
    private $montantParEtoile;
    private $montantParMedaille;
    private $routines;
    
    public function __construct($idFamille, $cheminJson) {
        $this->cheminJson = $cheminJson;
        $this->charger($idFamille);
        $this->modeParent =  false;
    }
    
    public static function getNbrFamilles($cheminJson) {
        $files = scandir($cheminJson);
        // -2 = . et../
        return count($files) - 2;
    }

    public function getNom() {
        return $this->nom;
    }
    
    public function getEmail() {
        return $this->email;
    }    

    public function getMontantParEtoile() {
        return $this->montantParEtoile;
    }

    public function getMontantParMedaille() {
        return $this->montantParMedaille;
    }

    public function getNbrRoutines() {
        return count($this->routines);
    }

    public function isModeParent() {
        return $this->modeParent;
    }

    public function validerMdp($mdp) {
        if ($this->mdp == $mdp) {
            $this->modeParent = true;
            return true;
        }
        $this->modeParent = false;
        return false;
    }
    
    public function validerMdpAcces($mdpAcces) {
        if ($this->mdpAcces == $mdpAcces) {
            return true;
        }
        return false;
    }    

    public function quitterModeParent() {
        $this->modeParent = false;
    }

    public function getRoutineParNomRoutinePrenom($nomRoutine, $prenom) {
        $max = count($this->routines);
        for ($i = 0; $i < $max; $i++) {
            $routine = $this->routines[$i];
            if ($routine->getNomRoutine() == $nomRoutine
                    && $routine->getPrenom() == $prenom) {
                return $routine;
            }
        }
        return false;
    }

    public function toStdClass() {
        $familleStdObj = new StdClass();
        $familleStdObj->nom = $this->nom;
        $familleStdObj->email = $this->email;
        $familleStdObj->modeParent = $this->modeParent;
        $familleStdObj->montantParEtoile = $this->montantParEtoile;
        $familleStdObj->montantParMedaille = $this->montantParMedaille;
        $familleStdObj->mdp = $this->mdp;
        $familleStdObj->mdpAcces = $this->mdpAcces;        

        $familleStdObj->routines =  array();
        $max = count($this->routines);
        for ($i = 0; $i < $max; $i++) {
            $familleStdObj->routines[] = $this->routines[$i]->toStdClass();
        }

        return $familleStdObj;
    }
    public function toJson() {
        $familleStdObj = new StdClass();
        $familleStdObj->nom = $this->nom;
        $familleStdObj->email = $this->email;
        $familleStdObj->modeParent = $this->modeParent;
        $familleStdObj->montantParEtoile = $this->montantParEtoile;
        $familleStdObj->montantParMedaille = $this->montantParMedaille;
        $familleStdObj->mdp = $this->mdp;
        $familleStdObj->mdpAcces = $this->mdpAcces;

        $familleStdObj->routines =  array();
        $max = count($this->routines);
        for ($i = 0; $i < $max; $i++) {
            $familleStdObj->routines[] = $this->routines[$i]->toStdClass();
        }

        return json_encode($familleStdObj);
    }

    public function charger($idFamille) {
        $cheminFichier = $this->cheminJson . DIRECTORY_SEPARATOR . 'famille-' . $idFamille . '.json';

        if (!is_readable($cheminFichier)) {
            throw new InvalidArgumentException("Aucun fichier : " . $cheminFichier);
        }
        $fp = fopen($cheminFichier, "r");
        $str = fread($fp, filesize($cheminFichier));
        fclose($fp);

        $json = json_decode($str);
        $this->nom = $json->nom;
        $this->email = $json->email;
        $this->mdp = $json->mdp;
        $this->montantParEtoile = $json->montantParEtoile;
        $this->montantParMedaille = $json->montantParMedaille;
        $this->mdpAcces = $json->mdpAcces;

        $this->routines = array();

        if (isset($json->routines)) {
            $max = count($json->routines);
            for ($i = 0; $i < $max; $i++) {
                $routine = new Routine();
                $routine->charger($json->routines[$i]);
                $this->routines[] = $routine;
            }
        }
    }

    public function sauvegarder($idFamille) {
        $cheminFichier = $this->cheminJson . DIRECTORY_SEPARATOR . 'famille-' . $idFamille . '.json';
        //echo $cheminFichier . "\n";

        if (!is_writable($cheminFichier)) {
            throw new InvalidArgumentException("Aucun fichier : " . $cheminFichier);
        }
        $fp = fopen($cheminFichier, "w+");
        fwrite($fp, $this->toJson());
        fclose($fp);
    }
    
    public function gotMedailleAValider() {
        if (count($this->routines) == 0) {
            return false;
        }
        
        foreach ($this->routines as $routine) {
            if ($routine->getNbrMedaillesAValider() > 0) {
                return true;
            }
        }
        return false;
    }
    
    public function getRoutineParIndex($index) {
        return $this->routines[$index];
    }
}
