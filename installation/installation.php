<?php

echo "Parametre : " . $argv[1] . "\n";
$niveau = $argv[1];
require_once('config.php.' . $niveau);

echo "-----------------------\n";
if (file_exists(CHEMIN_DESTINATION)) {
    echo "Destruction du contenu de " . CHEMIN_DESTINATION . "\n";
    shell_exec("rm -fr " . CHEMIN_DESTINATION . "/*");
} else {
    echo "Repertoire inexistant - Creation de " . CHEMIN_DESTINATION . "\n";
    mkdir(CHEMIN_DESTINATION, 0755);
}

echo "Copie des fichiers\n";
shell_exec("cp -R ../www/* " . CHEMIN_DESTINATION);

if ($niveau == "prod" || $niveau == "preprod") {
    convertir_fichiers_utf8_a_iso('../www', CHEMIN_DESTINATION);
    convertir_fichiers_utf8_a_iso('../www/js', CHEMIN_DESTINATION . '/js');
    shell_exec("chown -R apache:apache " . CHEMIN_DESTINATION);
    shell_exec("chmod -R 755 " . CHEMIN_DESTINATION);
}

echo "-----------------------\n";
echo "Fin de l'installation\n";

function convertir_fichiers_utf8_a_iso($path, $dest) {
    if (is_dir($path) && is_dir($dest)) {
        //$objects = array_diff(scandir($path), self::$listeexclusionfichier);
        $objects = scandir($path);
        if (count($objects) > 0) {
            foreach ($objects as $file) {
                if ($file == "." || $file == "..") {
                    continue;
                }
                if (is_file($path . DIRECTORY_SEPARATOR . $file)) {
                    if (filesize($path . DIRECTORY_SEPARATOR . $file) > 0) {
                        echo "Conversion de " . $file . "\n";
                        shell_exec("iconv -f UTF8 -t ISO8859-1 " . $path . DIRECTORY_SEPARATOR . $file . " > "
                                . $dest . DIRECTORY_SEPARATOR . $file);
                    } else {
                        throw new UnexpectedValueException("Fichier $file de taille 0.");
                    }
                }
            }
        } else {
            throw new UnexpectedValueException('Aucun fichier csv à consommer.');
        }
    } else {
        throw new InvalidArgumentException("La source ($path) ou la destination \n"
        . "($dest) de la conversion ne sont \n"
        . "pas des répertoires.");
    }
}
