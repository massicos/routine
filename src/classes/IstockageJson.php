<?php

interface IstockageJson {
    public function charger($idFamille, $idEnfant, $idRoutine);
    public function sauvegarder($idFamille, $idEnfant, $idRoutine);
    public function setConfigPersistence($config);
}
