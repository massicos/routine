<?php
class Famille {
    private $nom;
    private $cheminJson;
    private $mdp;
    private $modeParent;

    public function __construct($idFamille, $cheminJson) {
        $this->cheminJson = $cheminJson;
        $this->charger($idFamille);
        $this->modeParent =  false;
    }

    public function getNom() {
        return $this->nom;
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

    public function quitterModeParent() {
        $this->modeParent = false;
    }

    public function toJson() {
        $familleStdObj = new StdClass();
        $familleStdObj->nom = $this->nom;
        $familleStdObj->modeParent = $this->modeParent;

        return json_encode($familleStdObj);
    }

    public function charger($idFamille) {
        $cheminFichier = $this->cheminJson . DIRECTORY_SEPARATOR . 'famille-' . $idFamille
                . DIRECTORY_SEPARATOR . 'famille.json';

        if (!is_readable($cheminFichier)) {
            throw new InvalidArgumentException("Aucun fichier : " . $cheminFichier);
        }
        $fp = fopen($cheminFichier, "r");
        $str = fread($fp, filesize($cheminFichier));
        fclose($fp);

        $json = json_decode($str);
        $this->nom = $json->nom;
        $this->mdp = $json->mdp;
    }
}
