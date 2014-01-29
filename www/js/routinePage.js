$(document).ready(function() {

    var personnes = new Array();
    personnes["Charles"] = new Personne("Charles");
    personnes["Léanne"] = new Personne("Léanne");

    var LABEL_TEMPS_JEUX = "Temps de jeux :";
    var LABEL_TEMPS_AVANT_FIN_ROUTINE = "Temps - Fin de routine :";
    //var json = '{"result":true,"count":2}';
    //var objJson = JSON.parse(json);
    //var objJson = $.parseJSON(json);
    //alert(objJson.count);

    $(".tempsLabel").text(LABEL_TEMPS_AVANT_FIN_ROUTINE);
    $(".message").hide();
    $(".boutonStop").hide();
    $(".enfantInfoResultat").hide();

    //$(".dateDebutRoutine").text(new Date(milliseconds));

    $(".tempsMinutes").each(function() {
        var tempsMillisecondes = $(this).closest(".routineItemInfoTemps").find(".tempsMillisecondes").text()
        $(this).text(tempsMillisecondes / 1000 / 60);
    });


    function rafraichirTempsJeux(obj, tempsJeuxRoutine) {
        if (parseInt(tempsJeuxRoutine) < 0) {
            tempsJeuxRoutine = parseInt(tempsJeuxRoutine) * -1;
        }
        var height = Math.abs((parseInt(tempsJeuxRoutine) * 150 / 60) - 150);
        $(obj).find(".tempsJeuxIndicateur").attr({style: "height: " + height + "px;"});
        $(obj).closest(".tableauBord").find(".tempsJeuxMinutes").text(tempsJeuxRoutine);
    }

    function calculTempJeux(dateFin, tempsRoutineMinutes) {
        dateNow = new Date();
        timeStampRoutine = dateNow.getTime() - dateFin.getTime() - parseInt(tempsRoutineMinutes) * 60 * 1000;
        return timeStampRoutine / 1000 / 60;
    }

    $(".routine").selectable({
        selected: function(event, ui) {
            $("#message").hide();
            $(event.target).closest(".enfant").find(".boutonStop").show();

            var progressbarLocal = $(event.target).closest(".enfant").find(".progressbar");
            progressbarLocal.progressbar("value", 0);
            var tempsRoutineItem = $(event.target).find(".ui-selected").find(".tempsMillisecondes").text() / 1000;
            var d = new Date();
            d = new Date(d.getTime() + (parseInt(tempsRoutineItem) * 1000));
            personnes[$(event.target).closest(".enfant").find(".nomEnfant").text()].setDateFinItemRoutine(d);
            progressbarLocal.progressbar("option", "max", tempsRoutineItem);

            setTimeout(progress, 3000);
        }
    });

    function verifierTemps(obj) {
        var message = "Stop " + $(obj).closest(".enfant").find(".nomEnfant").text();
        var chronoTemps = $(obj).closest(".enfant").find(".progressbar").progressbar("value");
        var tempsRoutineItem = $(obj).closest(".enfant").find(".ui-selected").find(".tempsMillisecondes").text() / 1000;
        message = message + " " + chronoTemps + " " + tempsRoutineItem;

        if (parseInt(chronoTemps) >= parseInt(tempsRoutineItem)) {
            message = message + " Failed";
            var messageImg = $(obj).closest(".enfant").find(".messageImg");
            afficherEmoticon(messageImg, "images/emoticons/face-sad.png");
            var messageEtoiles = $(obj).closest(".enfant").find(".messageEtoiles");
            $(messageEtoiles).empty();
        }
        else {
            message = message + " OK";
            var etoiles = $(obj).closest(".enfant").find(".ui-selected").find("span.etoiles").text();
            message = message + " " +
                    +etoiles
            " étoiles";
            var nbrEtoiles = $(obj).closest(".enfant").find(".nbrEtoilesTexte").text();
            nbrEtoiles = parseInt(nbrEtoiles) + parseInt(etoiles);
            afficherEtoile($(obj).closest(".enfant").find(".nbrEtoilesImg"), nbrEtoiles);
            $(obj).closest(".enfant").find(".nbrEtoilesTexte").text(nbrEtoiles);
            $(obj).closest(".enfant").find(".enfantInfoResultat").show();

            var messageEtoiles = $(obj).closest(".enfant").find(".messageEtoiles");
            afficherEtoile(messageEtoiles, etoiles);

            var messageImg = $(obj).closest(".enfant").find(".messageImg");
            afficherEmoticon(messageImg, "images/emoticons/face-smile.png");

        }
        $(obj).closest(".enfant").find(".message").show();
        //$(obj).closest(".enfant").find(".messageTexte").text(message);
    }

    function routineItemMarquerCompleter(obj) {
        $(obj).closest(".enfant").find(".ui-selected").addClass("routineItemTermine");
        $(obj).closest(".enfant").find(".ui-selected").selectable({disabled: true});
        $(obj).closest(".enfant").find(".routineItem").removeClass("ui-selected");
        $(obj).closest(".enfant").find(".boutonStop").hide();
        calculTempsRestantRoutine($(obj).closest(".enfant").find(".routine"));
        var tempsTotalRoutineMinutes = $(obj).closest(".enfant").find(".tempsTotalRoutineMinutes").text();
        alert(personnes[$(obj).closest(".enfant").find(".nomEnfant").text()].getDateFinItemRoutine());
        var tempsJeuxRoutine = calculTempJeux(personnes[$(obj).closest(".enfant").find(".nomEnfant").text()].getDateFinItemRoutine(),
                tempsTotalRoutineMinutes);

        //var tempsJeuxRoutine = calculTempJeux(new Date(parseInt($(obj).closest(".enfant").find(".tempsJeuxDateFinRoutine").text())),
        //        tempsTotalRoutineMinutes);
        rafraichirTempsJeux($(obj).closest(".enfant").find(".tempsJeux"), tempsJeuxRoutine);
    }

    function afficherEmoticon(objDestination, src) {
        $(objDestination).empty();
        var star = $('<img/>', {
            src: src,
            class: "emoticon"
        });
        $(objDestination).prepend(star);
    }

    function afficherEtoile(objDestination, nbrEtoile) {
        $(objDestination).empty();
        var i = 0;
        for (i = 0; i < parseInt(nbrEtoile); i++) {
            var star = $('<img/>', {
                src: "images/icons/star.png",
                class: "etoileImg"
            });
            $(objDestination).prepend(star);
        }
    }

    $(".boutonStop").click(function() {
        verifierTemps(this);
        routineItemMarquerCompleter(this);
    });

    $(".progressbar").each(function() {
        $(this).progressbar({
            value: false,
            change: function() {
                $(this).find(".progress-label").text($(this).progressbar("value"));
            },
            complete: function() {
                $(this).find(".progress-label").text("Complété !");
                verifierTemps(this);
                routineItemMarquerCompleter(this);
            }
        });
    });

    function progress() {

        var auMoinsUneRoutineActive = false;
        $(".progressbar").each(function() {
            var enfant = $(this).closest(".enfant");
            var p = personnes[$(enfant).find(".nomEnfant").text()];
            //alert($(enfant).find(".nomEnfant").text() + " " + p.getDateFinItemRoutine());
            if (p.getDateFinItemRoutine() !== false) {
                auMoinsUneRoutineActive = true;

                var val = $(this).progressbar("value");
                var tempsRoutineItem = $(enfant).find(".ui-selected").find(".tempsMillisecondes").text();
                if (val < tempsRoutineItem) {
                    seconde = p.getSecondeItemRoutine(new Date(), tempsRoutineItem / 1000);
                    //alert(seconde);
                    $(this).progressbar("value", seconde);
                }
            }

        });
        if (auMoinsUneRoutineActive) {
            setTimeout(progress, 3000);
        }
    }

    $(".tempsJeuxMinutes").hide();
    $(".tempsJeuxMinutesBoutonStop").hide();

    function calculTempsRestantRoutine(obj) {
        $(obj).closest(".enfant").find(".tempsTotalRoutineMinutes").text(0);

        $(obj).find(".routineItem").not(".routineItemTermine").each(function() {
            var total = $(this).closest(".enfant").find(".tempsTotalRoutineMinutes");
            $(total).text(parseInt($(total).text()) +
                    parseInt($(this).find(".tempsMillisecondes").text()) / 1000 / 60);
        });

    }
    //calculTempsRestantRoutine($("#charlesRoutine"));
    //calculTempsRestantRoutine($("#leanneRoutine"));
    $(".routine").each(function() {
        calculTempsRestantRoutine(this);
    });

    function addMinutes(date, minutes) {
        return new Date(date.getTime() + minutes * 60000);
    }

    $(".tempsJeuxMinutesBoutonGo").click(function() {
        var tableauBord = $(this).closest(".tableauBord");
        var tempTotalRoutineMinutes = $(tableauBord).find(".tempsTotalRoutineMinutes").text();
        var tempsJeuxMinuteInput = $(tableauBord).find(".tempsJeuxMinuteInput").val();
        var tempsJeuxMinutes = parseInt(tempsJeuxMinuteInput) - parseInt(tempTotalRoutineMinutes)
        if (tempsJeuxMinutes > 0) {
            $(tableauBord).find(".tempsJeuxMinuteInput").hide();
            $(tableauBord).find(".tempsJeuxMinutes").text(tempsJeuxMinutes);
            $(tableauBord).find(".tempsJeuxMinutes").show();
            $(tableauBord).find(".tempsJeuxMinutesBoutonGo").hide();
            $(tableauBord).find(".tempsJeuxMinutesBoutonStop").show();
            $(tableauBord).find(".tempsLabel").text(LABEL_TEMPS_JEUX);
            var d = new Date();
            $(tableauBord).find(".tempsJeuxDateFinRoutine").text(addMinutes(d, tempsJeuxMinutes).getTime());
            rafraichirTempsJeux($(this).closest(".enfant").find(".tempsJeux"), tempsJeuxMinutes);
        }
        else {
            alert("Le temps total doit être plus grand que le temps total de la routine");
        }
    });

    $(".tempsJeuxMinutesBoutonStop").click(function() {
        var tableauBord = $(this).closest(".tableauBord");
        var tempTotalRoutineMinutes = $(tableauBord).find(".tempsTotalRoutineMinutes").text();
        var tempsJeuxMinuteInput = $(tableauBord).find(".tempsJeuxMinuteInput").val();
        $(tableauBord).find(".tempsJeuxMinuteInput").show();
        $(tableauBord).find(".tempsJeuxMinuteInput").val(10);
        $(tableauBord).find(".tempsJeuxMinutes").hide();
        $(tableauBord).find(".tempsJeuxMinutesBoutonGo").show();
        $(tableauBord).find(".tempsJeuxMinutesBoutonStop").hide();
        $(tableauBord).find(".tempsLabel").text(LABEL_TEMPS_AVANT_FIN_ROUTINE);
    });

});