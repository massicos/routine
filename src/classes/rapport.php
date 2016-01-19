<?php
require_once('famille.php');
require_once('../Mustache/Autoloader.php');

class Rapport {

    function __construct() {
        
    }
    
    static function genererMessageMedailleAValider($famille) {
        Mustache_Autoloader::register();
        $m = new Mustache_Engine;
        return $m->render(file_get_contents('../gabarits/courrielMedailleAValider.template.html'), $famille->toStdClass());
    }
    
    static function notificationFamillesMessageMedailleAValider($racineData) {
        $max = Famille::getNbrFamilles($racineData);
        echo "max = " . $max . "\n";
        for ($i = 0; $i < $max; $i++) {
            $famille = new Famille($i, $racineData);
            self::courriel($famille, "Médaille à valider", self::genererMessageMedailleAValider($famille));
        }
    }

    static function courriel(Famille $famille, $sujet, $message) {
        echo  "===============================\n";
        echo $famille->getNom() . " - " . $famille->getEmail() . "\n";
        echo $sujet . "\n";
        //echo $message  . "\n";
        //mail($recipients, $subject, $body, $text_headers);
    }
}

