        <div class="conteneurRoutines">
            <?php
            $max = count($familleStdObj->routines);
            for ($i = 0; $i < $max; $i++) {
            ?>
            <div class="enfant" id="enfant_<?php echo $i ?>">
                <div class="enfantInfo">
                    <div class="enfantInfoPerso">
                        <img class="photoEnfant"
                             src="../routinePerso/images/photos/nom1.jpg">
                        <div class="nomEnfant">Nom1</div>
                        <div class="totaux"><img src="images/icons/star.png"> <em class="nbrEtoiles">0</em> <img src="images/icons/medal_gold_1.png"> <em class="nbrMedailles">0</em><em class="nbrMedaillesAValiderParenthese">(<em class="nbrMedaillesAValider">0</em>)</em></div>
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
                            <div style="display:inline-flex">
                                <div id="canvas-holder_itemRoutine<?php echo $i ?>" style="width:40%">
                                    <canvas id="chart-area_tempsLibre<?php echo $i ?>" width="300" height="300" />
                                </div>
                                <div id="canvas-holder_itemRoutine<?php echo $i ?>" style="width:40%">
                                    <canvas id="chart-area_tempsLibre<?php echo $i ?>" width="300" height="300" />
                                </div>   
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
                    <div class="progressbar" id="progressbar<?php echo $familleStdObj->routines[$i]->prenom ?>">
                        <div class="progress-label">En attente...</div>
                    </div>
                    <input type="button" class="boutonStop" value="Stop">
                    <input type="button" class="boutonPause" value="Pause">
                    <input type="button" class="boutonReprendre" value="Reprendre">
                    <input type="button" class="boutonAnnuler" value="Annuler">
                </div>

                <ol class="routine" id="<?php echo $familleStdObj->routines[$i]->prenom ?>Routine">
                    <li class="routineItem"><img src="" class="routineItemImg">
                        <span class="routineItemIndex">0</span> <span
                            class="routineItemTexte">item routine vide</span> <span
                            class="routineItemInfoTemps"><img
                                src="images/icons/time.png"> <span class="tempsMinutes">0</span></span>
                        <span class="routineItemInfoEtoiles"><img
                                src="images/icons/star.png"> <span class="etoiles">0</span></span></li>
                </ol>
            </div>
            <?php
            }
            ?>
        </div>