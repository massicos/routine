<?php

interface IstockageJson {
    public function charger($json);
    public function sauvegarder($idFamille, $idEnfant, $idRoutine);
    public function setConfigPersistence($config);
}
