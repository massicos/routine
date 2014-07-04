<?php

require_once("config.php");

?>
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Routine<?php echo $configApp->getSuffixeCheminpParNiveau() ?></title>
        <link rel="stylesheet" href="css/general.css">
        <link rel="stylesheet" href="css/styleRoutine.css">
        <link rel="stylesheet" href="css/base/jquery.ui.all.css">
        <script src="js/lib/jquery.min.js"></script>

        <script src="js/lib/ui/jquery.ui.core.js"></script>
        <script src="js/lib/ui/jquery.ui.widget.js"></script>
        <script src="js/lib/ui/jquery.ui.mouse.js"></script>
        <script src="js/lib/ui/jquery.ui.selectable.js"></script>
        <script src="js/lib/ui/jquery.ui.progressbar.js"></script>

        <script src="js/configApp.js"></script>
        <script src="js/config.js"></script>
        <script src="js/itemRoutine.js"></script>
        <script src="js/routine.js"></script>
        <script src="js/famille.js"></script>
        <script src="js/routinePage.js"></script>
        <script src="js/headerView.js"></script>
    </head>
    <body>
        <?php require_once('/app/routine' . $configApp->getSuffixeCheminpParNiveau() . '/gabarits/header.php'); ?>

        <div class="conteneurRoutines">
            <div class="enfant" id="enfant_charles">
                <div class="enfantInfo">
                    <div class="enfantInfoPerso">
                        <img class="photoEnfant"
                             src="../routinePerso/images/photos/nom1.jpg">
                        <div class="nomEnfant">Nom1</div>
                        <div class="totaux"><img src="images/icons/star.png"> <em class="nbrEtoilesRecompenseTotal">0</em> <img src="images/icons/medal_gold_1.png"> <em class="nbrMedailles">0</em><em class="nbrMedaillesAValiderParenthese">(<em class="nbrMedaillesAValider">0</em>)</em></div>
                    </div>
                    <div class="tableauBord">
                        <div class="tableauBordInfoTemps">
                            <div class="tableauBordTempsRoutine">
                                <em class="tableauBordTempsLabel">Heure de fin :</em>
                                <div class="tableauBordTempsHeureFin">10</div>
                                <span class="tableauBordTempsFinEdit">
                                    <input type="text" class="tableauBordTempsFinInput tableauBordTempsHeuresFinInput">:<input type="text" class="tableauBordTempsFinInput tableauBordTempsMinutesFinInput">
                                </span>
                                <input type="button"
                                       class="tableauBordTempsHeureFinBouton tableauBordTempsHeureFinBoutonGo"
                                       value="Go"> <input type="button"
                                       class="tableauBordTempsHeureFinBouton tableauBordTempsHeureFinBoutonStop"
                                       value="X"> | <em>Temps total - routine :</em>
                                <div class="tableauBordTempsTotalRoutineMinutes">X</div>
                                minutes 
                                <span class="tableauBordTempsLibre"> | 
                                    <em class="tableauBordTempsLibreLabel">Temps libre :</em>
                                    <span class="tableauBordTempsLibreMinutes">0</span>
                                    minutes</span>
                            </div>
                        </div>
                        <div class="enfantInfoResultat">
                            <div class="nbrEtoilesImg"></div>
                            <div class="nbrEtoilesTexte">0</div>
                        </div>
                        <div class="tempsJeux">
                            <div class="tempsJeuxIndicateur"></div>
                        </div>
                    </div>
                </div>


                <div class="message">
                    <span class="messageImg"></span>
                    <span class="medailleImg"></span>
                    <div class="messageEtoiles"></div>
                    <div class="messageTexte"></div>
                </div>
                <div class="chrono">
                    <div class="progressbar" id="progressbarCharles">
                        <div class="progress-label">En attente...</div>
                    </div>
                    <input type="button" class="boutonStop" value="Stop">
                    <input type="button" class="boutonPause" value="Pause">
                    <input type="button" class="boutonReprendre" value="Reprendre">
                </div>

                <ol class="routine" id="charlesRoutine">
                    <li class="routineItem"><img src="" class="routineItemImg">
                        <span class="routineItemIndex">0</span> <span
                            class="routineItemTexte">item routine vide</span> <span
                            class="routineItemInfoTemps"><img
                                src="images/icons/time.png"> <span class="tempsMinutes">0</span></span>
                        <span class="routineItemInfoEtoiles"><img
                                src="images/icons/star.png"> <span class="etoiles">0</span></span></li>
                </ol>
            </div>

            <div class="enfant" id="enfant_leanne">
                <div class="enfantInfo">
                    <div class="enfantInfoPerso">
                        <img class="photoEnfant"
                             src="../routinePerso/images/photos/nom1.jpg">
                        <div class="nomEnfant">Nom1</div>
                        <div class="totaux"><img src="images/icons/star.png"> <em class="nbrEtoilesRecompenseTotal">0</em> <img src="images/icons/medal_gold_1.png"> <em class="nbrMedailles">0</em><em class="nbrMedaillesAValiderParenthese">(<em class="nbrMedaillesAValider">0</em>)</em></div>
                    </div>
                    <div class="tableauBord">
                        <div class="tableauBordInfoTemps">
                            <div class="tableauBordTempsRoutine">
                                <em class="tableauBordTempsLabel">Heure de fin :</em>
                                <div class="tableauBordTempsHeureFin">10</div>
                                <span class="tableauBordTempsFinEdit">
                                    <input type="text" class="tableauBordTempsFinInput tableauBordTempsHeuresFinInput">:<input type="text" class="tableauBordTempsFinInput tableauBordTempsMinutesFinInput">
                                </span>
                                <input type="button"
                                       class="tableauBordTempsHeureFinBouton tableauBordTempsHeureFinBoutonGo"
                                       value="Go"> <input type="button"
                                       class="tableauBordTempsHeureFinBouton tableauBordTempsHeureFinBoutonStop"
                                       value="X"> | <em>Temps total - routine :</em>
                                <div class="tableauBordTempsTotalRoutineMinutes">X</div>
                                minutes 
                                <span class="tableauBordTempsLibre"> | 
                                    <em class="tableauBordTempsLibreLabel">Temps libre :</em>
                                    <span class="tableauBordTempsLibreMinutes">0</span>
                                    minutes</span>
                            </div>
                        </div>
                        <div class="enfantInfoResultat">
                            <div class="nbrEtoilesImg"></div>
                            <div class="nbrEtoilesTexte">0</div>
                        </div>
                        <div class="tempsJeux">
                            <div class="tempsJeuxIndicateur"></div>
                        </div>
                    </div>
                </div>


                <div class="message">
                    <span class="messageImg"></span>
                    <span class="medailleImg"></span>
                    <div class="messageEtoiles"></div>
                    <div class="messageTexte"></div>
                </div>
                <div class="chrono">
                    <div class="progressbar" id="progressbarCharles">
                        <div class="progress-label">En attente...</div>
                    </div>
                    <input type="button" class="boutonStop" value="Stop">
                    <input type="button" class="boutonPause" value="Pause">
                    <input type="button" class="boutonReprendre" value="Reprendre">
                </div>

                <ol class="routine" id="charlesRoutine">
                    <li class="routineItem"><img src="" class="routineItemImg">
                        <span class="routineItemIndex">0</span> <span
                            class="routineItemTexte">item routine vide</span> <span
                            class="routineItemInfoTemps"><img
                                src="images/icons/time.png"> <span class="tempsMinutes">0</span></span>
                        <span class="routineItemInfoEtoiles"><img
                                src="images/icons/star.png"> <span class="etoiles">0</span></span></li>
                </ol>
            </div>
        </div>
        <?php require_once('/app/routine' . $configApp->getSuffixeCheminpParNiveau() . '/gabarits/footer.php'); ?>
    </body>
</html>
