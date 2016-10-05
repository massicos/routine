$(document).ready(function() {

    var auMoinsUneRoutineActive = false;

    famille = new Famille("Massicotte", 0.05, 0.25);
    famille.charger("/routine" + config.getSuffixeCheminpParNiveau() + "/services/famille_getJson.php");

    var headerView = new HeaderView(famille);
    headerView.affichageInitial();

	function trouverRoutine(prenom) {
        var max = famille.getNbrRoutines();
		for ( var i = 0; i < max; i++) {
			if (famille.getRoutineParIndex(i).getPrenom() == prenom) {
				return famille.getRoutineParIndex(i);
			}
		}
		return null;
	}

    function rafraichirInfo() {
        var max = famille.getNbrRoutines();
        for (var i = 0; i < max; i++) {
            var routine = famille.getRoutineParIndex(i);
            if (routine.estPretDebuter()) {
                if (!routine.estEnCoursItemRoutine()) {
                    var tempsLibre = routine.getTempsLibreSecondes(new Date());
                    var routineView = new RoutineView(routine);
                    routineView.rafraichirTempsJeux($("#enfant_" + i), tempsLibre);
                }
            }
        }
        setTimeout(rafraichirInfo, 10000);
    }
    setTimeout(rafraichirInfo, 10000);


    $(".tableauBordTempsHeureFinBoutonGo").click(function() {
        var enfant = $(this).closest(".enfant");
        if (validerHeure(enfant)) {
            var routine = trouverRoutine($(enfant).find(".nomEnfant").text());
            var routineView = new RoutineView(routine);
            routineView.affichageBoutonGo(enfant);            
        }
    });
    
    function validerHeure(enfant) {
        var heure = $(enfant).find(".tableauBordTempsHeuresFinInput").val();
        var minutes = $(enfant).find(".tableauBordTempsMinutesFinInput").val();

        if (!$.isNumeric(heure) || !$.isNumeric(minutes)) {
            alert("Veuillez saisir des heures et des minutes valides.");
            return false;
        }
        else if (heure < 0 || heure > 23) {
            alert("Veuillez saisir une heure valides.");
            return false;
        }
        else if (minutes < 0 || minutes > 59) {
            alert("Veuillez saisir des minutes valides.");
            return false;
        }
        return true;
    }

    $(".tableauBordTempsHeureFinBoutonStop").click(function() {
        var enfant = $(this).closest(".enfant");
        var routine = trouverRoutine($(enfant).find(".nomEnfant").text());
        var routineView = new RoutineView(routine);
		  routineView.affichageBoutonStop(enfant);
    });

    $(".progressbar").each(function() {
        $(this).progressbar({
            value: false,
            change: function() {
                $(this).find(".progress-label").text($(this).progressbar("value"));
            },
            complete: function() {
                var enfant = $(this).closest(".enfant");
                var routine = trouverRoutine($(enfant).find(".nomEnfant").text());
                var routineView = new RoutineView(routine);

                $(this).find(".progress-label").text("Complété !");
                var itemRoutineEnCours = routine.getItemRoutineEnCours();
        	       itemRoutineEnCours.setStatut(statuts.FINI_ECHEC);
        	       routineView.afficherEmoticon(enfant, "images/emoticons/face-sad.png");
        	       routineView.itemRoutineMarquerCompleter(enfant);
                   routineView.activerSelectionItemRoutineNonComplete($(enfant).find(".routine"));

        	       var tempsLibre = routine.getTempsLibreSecondes(new Date());
    		       routineView.rafraichirTempsJeux(enfant, tempsLibre);
            }
        });
    });

    $(".routine").selectable({
        stop: function (event, ui) {
            $(event.target).children('.ui-selected').not(':first').find(".ui-selected").removeClass('ui-selected');
            $(event.target).children('.ui-selected').not(':first').removeClass('ui-selected');

            var enfant = $(event.target).closest(".enfant");
            var routine = trouverRoutine($(enfant).find(".nomEnfant").text());
            routine.toStringDebug();

            var index = $(enfant).find(".ui-selected").find(".routineItemIndex").text();
            var itemRoutine = routine.getItemRoutine(index);
            itemRoutine.debuter(new Date());

            var routineView = new RoutineView(routine);
            routineView.selectionItemRoutine(enfant, $(event.target));
            routineView.desactiverSelectionItemRoutineNonComplete(event.target);

            var tempsLibre = routine.getTempsLibreSecondes(new Date());
            routineView.rafraichirTempsJeux(enfant, tempsLibre);
        }
    });

    function progress() {

        auMoinsUneRoutineActive = false;
        $(".progressbar").each(function() {
            var enfant = $(this).closest(".enfant");
            var routine = trouverRoutine($(enfant).find(".nomEnfant").text());

            if (routine.estEnCoursItemRoutine()) {
                auMoinsUneRoutineActive = true;

                var val = $(this).progressbar("value");
                var itemRoutineEnCours = routine.getItemRoutineEnCours();
                var secondes = itemRoutineEnCours.getSecondesEcoulees(new Date());
                //alert(secondes);
                if (val < secondes) {
                    $(this).progressbar("value", Math.round(secondes));
                }
            }
        });
        if (auMoinsUneRoutineActive) {
            setTimeout(progress, 3000);
        }
    }

    $(".boutonPause").click(function() {
        var enfant = $(this).closest(".enfant");
        var routine = trouverRoutine($(enfant).find(".nomEnfant").text());
        var routineView = new RoutineView(routine);

        var itemRoutineEnCours = routine.getItemRoutineEnCours();
        itemRoutineEnCours.setStatut(statuts.PAUSE);

        routineView.itemRoutinePause(enfant);
    });

    $(".boutonReprendre").click(function() {
        var enfant = $(this).closest(".enfant");
        var routine = trouverRoutine($(enfant).find(".nomEnfant").text());
        var routineView = new RoutineView(routine);

        var itemRoutineEnCours = routine.getItemRoutinePause();
        var progressBar = $(enfant).find(".progressbar");
        var secondesProgressBar = progressBar.progressbar("value");
        itemRoutineEnCours.reprendre(new Date(), secondesProgressBar);

        routineView.itemRoutineReprendre(enfant);

        if (auMoinsUneRoutineActive == false) {
            auMoinsUneRoutineActive = true;
            setTimeout(progress, 3000);
        }
    });

    $(".boutonStop").click(function() {
        var enfant = $(this).closest(".enfant");
        var routine = trouverRoutine($(enfant).find(".nomEnfant").text());
        var routineView = new RoutineView(routine);

        var itemRoutineEnCours = routine.getItemRoutineEnCours();

        var secondes = Math.round(itemRoutineEnCours.getSecondesEcoulees(new Date()));
        if (secondes <= itemRoutineEnCours.getTempsSecondes()) {
           itemRoutineEnCours.setStatut(statuts.FINI_SUCCES);
           routine.addNbrEtoiles(itemRoutineEnCours.getNbrEtoiles());
           routine.sauvegarderAddNbrEtoiles("/routine" + config.getSuffixeCheminpParNiveau() + "/services/famille_addNbrEtoiles.php", itemRoutineEnCours.getNbrEtoiles());
           routineView.afficherEtoiles(enfant, routine.getNbrEtoilesRoutineEnCours());
           routineView.afficherEmoticon(enfant, "images/emoticons/face-smile.png");

           var tempsLibre = routine.getTempsLibreSecondes(new Date());
           routineView.rafraichirTempsJeux(enfant, tempsLibre);
        }
        else {
        	  itemRoutineEnCours.setStatut(statuts.FINI_ECHEC);
        	  routineView.afficherEmoticon(enfant, "images/emoticons/face-sad.png");
        	  //alert("Trop tard");
        }

        routineView.itemRoutineMarquerCompleter(enfant);
        routineView.activerSelectionItemRoutineNonComplete($(enfant).find(".routine"));

        if (routine.estTerminee() && routine.meriteMedailleAValider()) {
            routine.addNbrMedaillesAValider(1);
            routine.sauvegarderNbrEtoilesAValider("/routine" + config.getSuffixeCheminpParNiveau() + "/services/famille_addNbrEtoilesAValider.php", 1);

            routineView.routineParfaite(enfant);
        }
    });

    $(".boutonAnnuler").click(function() {
        var enfant = $(this).closest(".enfant");
        var routine = trouverRoutine($(enfant).find(".nomEnfant").text());
        var routineView = new RoutineView(routine);

        var itemRoutineEnCours = routine.getItemRoutineEnCours();
        if (!itemRoutineEnCours) {
            itemRoutineEnCours = routine.getItemRoutinePause();
        }
        itemRoutineEnCours.setStatut(statuts.ATTENTE);

        var tempsLibre = routine.getTempsLibreSecondes(new Date());
        routineView.rafraichirTempsJeux(enfant, tempsLibre);

        routineView.itemRoutineMarquerAnnuler($(enfant).find(".routine"));
        routineView.itemRoutineAnnuler(enfant);
        routineView.activerSelectionItemRoutineNonComplete($(enfant).find(".routine"));
    });

    var max = famille.getNbrRoutines();
    for (var i = 0; i < max; i++) {
        var routineView = new RoutineView(famille.getRoutineParIndex(i));
        routineView.affichageInitial($(".enfant")[i]);
    }

	function RoutineView(routine) {
		this.routine = routine;

	    this.affichageInitial = affichageInitial;
	    function affichageInitial(enfant)
	    {
			$(enfant).find(".nomEnfant").text(this.routine.getPrenom());
			$(enfant).find(".photoEnfant").attr("src", this.routine.getPhoto());
			$(enfant).find(".nbrEtoiles").text(this.routine.getNbrEtoiles());
			$(enfant).find(".nbrMedailles").text(this.routine.getNbrMedailles());

            $(enfant).find(".nbrMedaillesAValider").text(routine.getNbrMedaillesAValider());

			this.affichageTableauBordInitial(enfant);
			this.affichageItemsRoutineInitial(enfant);
			$(enfant).find(".chrono").hide();
			$(enfant).find(".message").hide();

            this.desactiverSelectionItemRoutineNonComplete($(enfant).find(".routine"));
	    }

	    this.affichageTableauBordInitial = affichageTableauBordInitial;
	    function affichageTableauBordInitial(enfant)
	    {
	    	//$(enfant).find(".tempsLabel").text(LABEL_FIN_ROUTINE);
	    	$(enfant).find(".tableauBordTempsHeureFin").hide();
	    	$(enfant).find(".tableauBordTempsHeureFinBoutonStop").hide();
	    	$(enfant).find(".tableauBordTempsTotalRoutineMinutes").text(this.routine.getTotalTempsItemsRoutineNonCompletes());
	    	$(enfant).find(".enfantInfoResultat").hide();
	    	$(enfant).find(".tempsJeux").hide();
	    	$(enfant).find(".tableauBordTempsLibre").hide();
	    }

	    this.affichageItemsRoutineInitial = affichageItemsRoutineInitial;
	    function affichageItemsRoutineInitial(enfant)
	    {
	    	var max = this.routine.getNbrItemRoutine();
	    	for (var i = 0; i < max; i++) {
	    		if (i > 0) {
	    			var itemPrecedent = $(enfant).find(".routineItem")[i-1];
	    			$(itemPrecedent).clone().appendTo($(enfant).find(".routine"));
	    		}
	    	    var itemRoutine = $(enfant).find(".routineItem")[i];
	    	    $(itemRoutine).find(".routineItemIndex").text(i);
	    	    $(itemRoutine).find(".routineItemTexte").text(this.routine.getItemRoutine(i).getTexte());
	    	    $(itemRoutine).find(".tempsMinutes").text(this.routine.getItemRoutine(i).getTempsMinutes());
	    	    $(itemRoutine).find(".etoiles").text(this.routine.getItemRoutine(i).getNbrEtoiles());
	    	    $(itemRoutine).find(".routineItemImg").attr("src", this.routine.getItemRoutine(i).getCheminImage());
	    	}
	    }

	    this.affichageBoutonGo = affichageBoutonGo;
	    function affichageBoutonGo(enfant) {
	        var heure = $(enfant).find(".tableauBordTempsHeuresFinInput").val();
	        var minutes = $(enfant).find(".tableauBordTempsMinutesFinInput").val();
	        var dateFin = new Date();
	        dateFin.setHours(heure, minutes, 0);
	        var tempsLibre = routine.setDateFin(dateFin, new Date());
	        if (tempsLibre > 0) {
	        	var tableauBord = $(enfant).find(".tableauBord");
	            $(tableauBord).find(".tableauBordTempsFinEdit").hide();
	            $(tableauBord).find(".tableauBordTempsHeureFinBoutonGo").hide();
	            $(tableauBord).find(".tableauBordTempsHeureFinBoutonStop").show();
	            $(tableauBord).find(".tableauBordTempsHeureFin").text(heure + ":" + minutes);
	            $(tableauBord).find(".tableauBordTempsHeureFin").show();
	            this.rafraichirTempsJeux(enfant, tempsLibre);
                this.activerSelectionItemRoutineNonComplete($(enfant).find(".routine"));
	        }
	        else {
	            alert("Le temps total doit être plus grand que le temps total de la routine");
	        }
	    }

	    this.affichageBoutonStop = affichageBoutonStop;
	    function affichageBoutonStop(enfant) {
	    	  $(enfant).find(".tableauBordTempsTotalRoutineMinutes").text(this.routine.getTotalTempsItemsRoutine());

	        var tableauBord = $(enfant).find(".tableauBord");
	        $(tableauBord).find(".tableauBordTempsHeuresFinInput").val("00");
	        $(tableauBord).find(".tableauBordTempsMinutesFinInput").val("00");
	        $(tableauBord).find(".tableauBordTempsFinEdit").show();
	        $(tableauBord).find(".tableauBordTempsHeureFinBoutonGo").show();
	        $(tableauBord).find(".tableauBordTempsHeureFinBoutonStop").hide();
	        $(tableauBord).find(".tableauBordTempsHeureFin").hide();
	    }

	    this.selectionItemRoutine = selectionItemRoutine;
	    function selectionItemRoutine(enfant, itemRoutine) {
	    	$(enfant).find(".chrono").show();

            var progressbarLocal = $(enfant).find(".progressbar");
            progressbarLocal.progressbar("value", 0);

            var index = $(itemRoutine).find(".ui-selected").find(".routineItemIndex").text();
            var itemRoutine = this.routine.getItemRoutine(index);

            var tempsItemRoutine = parseInt(itemRoutine.getTempsMinutes()) * 60;
            progressbarLocal.progressbar("option", "max", tempsItemRoutine);

            $(enfant).find(".boutonStop").show();
            $(enfant).find(".boutonPause").show();
            $(enfant).find(".boutonAnnuler").show();
            $(enfant).find(".chrono").find(".boutonReprendre").hide();
            $(enfant).find(".message").hide();

            setTimeout(progress, 3000);
	    }

        this.desactiverSelectionItemRoutineNonComplete = desactiverSelectionItemRoutineNonComplete;
        function desactiverSelectionItemRoutineNonComplete(listeItemRoutine) {
            $(listeItemRoutine).selectable("disable");
        }

        this.activerSelectionItemRoutineNonComplete = activerSelectionItemRoutineNonComplete;
        function activerSelectionItemRoutineNonComplete(listeItemRoutine) {
            $(listeItemRoutine).selectable("enable");
        }

       this.afficherEtoiles = afficherEtoiles;
       function afficherEtoiles(enfant, nbrEtoile) {
   	    var objDestination = $(enfant).find(".nbrEtoilesImg");
          $(objDestination).empty();
          var i = 0;
          for (i = 0; i < parseInt(nbrEtoile); i++) {
              var star = $('<img/>', {
                  src: "images/icons/star.png",
                  class: "etoileImg"
              });
              $(objDestination).prepend(star);
          }
          $(enfant).find(".nbrEtoilesTexte").text(nbrEtoile);
          $(enfant).find(".enfantInfoResultat").show();

	      $(enfant).find(".nbrEtoiles").text(this.routine.getNbrEtoiles());
       }

      this.itemRoutinePause = itemRoutinePause;
      function itemRoutinePause(enfant) {
          $(enfant).find(".boutonStop").hide();
          $(enfant).find(".boutonPause").hide();
          $(enfant).find(".boutonReprendre").show();
      }

      this.itemRoutineAnnuler = itemRoutineAnnuler;
      function itemRoutineAnnuler(enfant) {
          $(enfant).find(".boutonStop").hide();
          $(enfant).find(".boutonPause").hide();
          $(enfant).find(".boutonReprendre").hide();
          $(enfant).find(".boutonAnnuler").hide();
      }

      this.itemRoutineReprendre = itemRoutineReprendre;
      function itemRoutineReprendre(enfant) {
          $(enfant).find(".boutonStop").show();
          $(enfant).find(".boutonPause").show();
          $(enfant).find(".boutonReprendre").hide();
          $(enfant).find(".boutonAnnuler").show();
      }

      this.itemRoutineMarquerCompleter = itemRoutineMarquerCompleter;
      function itemRoutineMarquerCompleter(enfant) {
          $(enfant).find(".ui-selected").hide();

          var tempTotalRoutineMinutes = this.routine.getTotalTempsItemsRoutineNonCompletes();
          $(enfant).find(".tableauBordTempsTotalRoutineMinutes").text(tempTotalRoutineMinutes);

      }

      this.itemRoutineMarquerAnnuler = itemRoutineMarquerAnnuler;
      function itemRoutineMarquerAnnuler(enfant) {
          $(enfant).find(".routineItem").find(".ui-selected").removeClass("ui-selected");
          $(enfant).find(".routineItem").removeClass("ui-selected");

          var tempTotalRoutineMinutes = this.routine.getTotalTempsItemsRoutineNonCompletes();
          $(enfant).find(".tableauBordTempsTotalRoutineMinutes").text(tempTotalRoutineMinutes);
      }

      this.afficherEmoticon = afficherEmoticon;
      function afficherEmoticon(enfant, src) {
      	 var objDestination = $(enfant).find(".messageImg")
          $(objDestination).empty();
          var star = $('<img/>', {
              src: src,
              class: "emoticon"
          });
          $(objDestination).prepend(star);
          $(enfant).find(".message").show();
          $(enfant).find(".boutonStop").hide();
          $(enfant).find(".boutonPause").hide();
          $(enfant).find(".boutonReprendre").hide();
          $(enfant).find(".boutonAnnuler").hide();
      }

      this.afficherMedaille = afficherMedaille;
      function afficherMedaille(enfant, src) {
      	 var objDestination = $(enfant).find(".medailleImg")
          $(objDestination).empty();
          var medaille = $('<img/>', {
              src: src,
              class: "emoticon"
          });
          $(objDestination).prepend(medaille);
      }

      this.rafraichirTempsJeux = rafraichirTempsJeux;
      function rafraichirTempsJeux(enfant, tempsJeuxRoutine) {
      	 var obj = $(enfant).find(".tempsJeux");
      	 tempsJeuxRoutine = Math.round(tempsJeuxRoutine / 60);
      	 $(enfant).find(".tableauBordTempsLibreMinutes").text(tempsJeuxRoutine);
         $(enfant).find(".tableauBordTempsLibre").show();
      	 if (tempsJeuxRoutine >  60) {
              tempsJeuxRoutine = 60;
      	 }
      	 //alert("tempsJeuxRoutine = " + tempsJeuxRoutine);
      	 $(obj).show();
          if (parseInt(tempsJeuxRoutine) < 0) {
              tempsJeuxRoutine = parseInt(tempsJeuxRoutine) * -1;
          }
          var height = Math.abs((parseInt(tempsJeuxRoutine) * 150 / 60) - 150);

          $(obj).find(".tempsJeuxIndicateur").attr({style: "height: " + height + "px;"});
          $(obj).closest(".tableauBord").find(".tempsJeuxMinutes").text(tempsJeuxRoutine);
          $(obj).show();
      }

      this.routineParfaite = routineParfaite
      function routineParfaite(enfant) {
         var obj = $(enfant).find(".nbrMedaillesAValider");
         $(obj).text(routine.getNbrMedaillesAValider());

      	 var objDestination = $(enfant).find(".medailleImg")
          $(objDestination).empty();
          var medaille = $('<img/>', {
              src: "images/icons/medal_gold_1.png",
              class: "emoticon"
          });
          $(objDestination).prepend(medaille);
      }

	}


});
