<?php

class configApp {
    private $niveau;
    private $version;
    
    public function __construct($niveau, $version) {
        $this->niveau = $niveau;
        $this->version = $version;
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
    
    
}
