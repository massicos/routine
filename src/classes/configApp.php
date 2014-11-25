<?php

class configApp {
    private $niveau;
    private $version;
    private $racine;

    public function __construct($niveau, $version, $racine) {
        $this->niveau = $niveau;
        $this->version = $version;
        $this->racine = $racine;
    }

    public function getNiveau() {
        return $this->niveau;
    }

    public function getVersion() {
        return $this->version;
    }

    public function getSuffixeCheminpParNiveau() {
        if ($this->niveau != "prod") {
            return "-" . $this->niveau;
        }
        return "";
    }

    public function getRacine() {
        return $this->racine;
    }

    private function getRacineSrc() {
        return $this->racine . '/routine' . $this->getSuffixeCheminpParNiveau();
    }
    public function getRacineClasses() {
        return $this->getRacineSrc() . '/classes';
    }

    public function getRacineGabarits() {
        return $this->getRacineSrc() . '/gabarits';
    }

    public function getRacineData() {
        return $this->racine . "/data/routine" . $this->getSuffixeCheminpParNiveau() . "data";
    }
}
