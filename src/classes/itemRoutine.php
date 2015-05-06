<?php
class ItemRoutine {
    private $texte;
    private $cheminImage;
    private $tempsMinutes;
    private $nbrEtoiles;

    public function __construct() {
        $nbrparametres = func_num_args();
        if ($nbrparametres == 0) {
            $this->texte = "Vide";
            $this->cheminImage = "Vide";
            $this->tempsMinutes = 0;
            $this->nbrEtoiles = 0;
        }
        else {
            $this->texte = func_get_arg(0);
            $this->cheminImage = func_get_arg(1);
            $this->tempsMinutes = func_get_arg(2);
            $this->nbrEtoiles = func_get_arg(3);
        }
    }

    public function getTexte() {
        return $this->texte;
    }

    public function getCheminImage() {
        return $this->cheminImage;
    }

    public function getTempsMinutes() {
        return $this->tempsMinutes;
    }

    public function getNbrEtoiles() {
        return $this->nbrEtoiles;
    }

    public function charger($json) {
        $this->texte = $json->texte;
        $this->cheminImage = $json->cheminImage;
        $this->tempsMinutes = $json->tempsMinutes;
        $this->nbrEtoiles = $json->nbrEtoiles;
    }

    public function toStdClass() {
        $itemRoutineStdClass = new StdClass();
        $itemRoutineStdClass->texte = $this->texte;
        $itemRoutineStdClass->cheminImage = $this->cheminImage;
        $itemRoutineStdClass->tempsMinutes = $this->tempsMinutes;
        $itemRoutineStdClass->nbrEtoiles = $this->nbrEtoiles;

        return $itemRoutineStdClass;
    }
}
