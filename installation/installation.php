<?php

echo "Parametre : " . $argv[1] . "\n";
$niveau = $argv[1];
require_once('config.php.' . $niveau);

$USAGER_APACHE = "www-data"

echo "-----------------------\n";
if (file_exists(CHEMIN_DESTINATION)) {
    echo "Destruction du contenu de " . CHEMIN_DESTINATION . "\n";
    shell_exec("rm -fr " . CHEMIN_DESTINATION . "/*");
} else {
    echo "Repertoire inexistant - Creation de " . CHEMIN_DESTINATION . "\n";
    mkdir(CHEMIN_DESTINATION, 0755);
}
if (file_exists(CHEMIN_DESTINATION_PHP)) {
    echo "Destruction du contenu de " . CHEMIN_DESTINATION_PHP . "\n";
    shell_exec("rm -fr " . CHEMIN_DESTINATION_PHP . "/*");
} else {
    echo "Repertoire inexistant - Creation de " . CHEMIN_DESTINATION_PHP . "\n";
    mkdir(CHEMIN_DESTINATION_PHP, 0755);
}

echo "Copie des fichiers\n";
shell_exec("cp -R ../www/* " . CHEMIN_DESTINATION);
shell_exec("cp -R ../src/* " . CHEMIN_DESTINATION_PHP);

echo "Installation des fichiers de config\n";
shell_exec("mv " . CHEMIN_DESTINATION . "/config." . $niveau . ".php " . CHEMIN_DESTINATION . "/config.php");
shell_exec("rm -f " . CHEMIN_DESTINATION . "/config.*.php");
shell_exec("mv " . CHEMIN_DESTINATION . "/js/config." . $niveau . ".js " . CHEMIN_DESTINATION . "/js/config.js");
shell_exec("rm -f " . CHEMIN_DESTINATION . "/js/config.*.js");
$gitLog = shell_exec("git log -1 --format=%cd --date=short");
$gitLog = trim(preg_replace('/\s\s+/', ' ', $gitLog));
shell_exec('sed -i "s/GITLOG/' . $gitLog . '/" ' . CHEMIN_DESTINATION . "/config.php");

if ($niveau == "prod" || $niveau == "preprod") {
    echo "Conversion des fichiers\n";
    shell_exec("chown -R " . $USAGER_APACHE . ":" . $USAGER_APACHE . " " . CHEMIN_DESTINATION);
    shell_exec("chmod -R 755 " . CHEMIN_DESTINATION);
    shell_exec("chown -R " . $USAGER_APACHE . ":" . $USAGER_APACHE . " " . CHEMIN_DESTINATION_PHP);
    shell_exec("chmod -R 755 " . CHEMIN_DESTINATION_PHP);

    echo "################################################################################################\n";
    echo "Sur une installation sur lhg il faut rouler ceci car il les rm ne fonctionne pas (Routine-20) : \n";
    echo("rm -f " . CHEMIN_DESTINATION . "/config.*.php\n");
    echo("rm -f " . CHEMIN_DESTINATION . "/js/config.*.js\n");
    echo "################################################################################################\n";
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
