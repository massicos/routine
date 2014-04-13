$(document).ready(function() {

    var auMoinsUneRoutineActive = false;	    
	var routines = new Array();
	routines[0] = new Routine("0", 0, 1, 2, 1);
	routines[0].charger("/routine" + config.getSuffixeCheminpParNiveau() + "/services/routine_charger.php");
	routines[0].setPhoto("../routinePerso/images/photos/Charles1.jpg");
	routines[0].addItemRoutine(new ItemRoutine("Déjeuner", "../routinePerso/images/itemsRoutine/dejeuner.jpg", 1, 8));
	routines[0].addItemRoutine(new ItemRoutine("S'habiller", "../routinePerso/images/itemsRoutine/habiller.jpg", 8, 4));
	routines[0].addItemRoutine(new ItemRoutine("Brosser les dents", "../routinePerso/images/itemsRoutine/brosserDents.jpg", 5, 3));	
	routines[1] = new Routine("1", 0, 1, 1, 1);
	routines[1].charger("/routine" + config.getSuffixeCheminpParNiveau() + "/services/routine_charger.php");
	routines[1].setPhoto("../routinePerso/images/photos/Leanne1.jpg");
	routines[1].addItemRoutine(new ItemRoutine("Déjeuner", "../routinePerso/images/itemsRoutine/dejeuner.jpg", 15, 8));
	routines[1].addItemRoutine(new ItemRoutine("S'habiller", "../routinePerso/images/itemsRoutine/habiller.jpg", 8, 4));
	routines[1].addItemRoutine(new ItemRoutine("Brosser les dents", "../routinePerso/images/itemsRoutine/brosserDents.jpg", 5, 3));
	routines[1].addItemRoutine(new ItemRoutine("Se peigner", "../routinePerso/images/itemsRoutine/peigner.jpg", 5, 4));

	//var LABEL_FIN_ROUTINE = "Heure de fin :";
	//var LABEL_TEMPS_LIBRE = "Temps de jeux :";

	var max = routines.length;
	for (var i = 0; i < max; i++) {
		var routineView = new RoutineView(routines[i]);
		routineView.affichageInitial($(".enfant")[i]);
	}

	function trouverRoutine(prenom) {
		var max = routines.length;
		for ( var i = 0; i < max; i++) {
			if (routines[i].getPrenom() == prenom) {
				return routines[i];
			}
		}
		return null;
	}

    function rafraichirInfo() {
		var max = routines.length;
		for (var i = 0; i < max; i++) {
            if (routines[i].estPretDebuter()) {
		        if (!routines[i].estEnCoursItemRoutine()) {
		            var tempsLibre = routines[i].getTempsLibreSecondes(new Date());
		            var routineView = new RoutineView(routines[i]);
		            routineView.rafraichirTempsJeux($("#enfant_" + routines[i].getPrenomNormalise()), tempsLibre);
		        }
            }
        }
        setTimeout(rafraichirInfo, 10000);
    }
    setTimeout(rafraichirInfo, 10000);

	
    $(".tableauBordTempsHeureFinBoutonGo").click(function() {
        var enfant = $(this).closest(".enfant");
        var routine = trouverRoutine($(enfant).find(".nomEnfant").text());
        var routineView = new RoutineView(routine);
		  routineView.affichageBoutonGo(enfant);
    });
    
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
        	       
        	       var tempsLibre = routine.getTempsLibreSecondes(new Date());
    		       routineView.rafraichirTempsJeux(enfant, tempsLibre);
            }
        });
    });    
    
    $(".routine").selectable({
        selected: function(event, ui) {
            var enfant = $(event.target).closest(".enfant");
            var routine = trouverRoutine($(enfant).find(".nomEnfant").text());
            
            var index = $(enfant).find(".ui-selected").find(".routineItemIndex").text();
            //alert("index = " + index);
            var itemRoutine = routine.getItemRoutine(index);
            itemRoutine.debuter(new Date());
            
            var routineView = new RoutineView(routine);
    		   routineView.selectionItemRoutine(enfant, $(event.target));
    		   
    		   var tempsLibre = routine.getTempsLibreSecondes(new Date());
    		   routineView.rafraichirTempsJeux(enfant, tempsLibre);
        }
    });
    
    function progress() {

        auMoinsUneRoutineActive = false;
        $(".progressbar").each(function() {
            var enfant = $(this).closest(".enfant");
            var routine = trouverRoutine($(enfant).find(".nomEnfant").text());
            //alert("estEnCoursItemRoutine (" + routine.getPrenom() + ") = " + routine.estEnCoursItemRoutine());
            console.log(routine.estEnCoursItemRoutine() + " " + routine.getPrenom());
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
           routine.addNbrEtoilesRecompenseTotal(itemRoutineEnCours.getNbrEtoiles());
           routine.sauvegaderNbrEtoilesRecompenseTotal("/routine" + config.getSuffixeCheminpParNiveau() + "/services/routine_addNbrEtoiles.php", itemRoutineEnCours.getNbrEtoiles());
           routineView.afficherEtoiles(enfant, routine.getNbrEtoiles());
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
        //routineItemMarquerCompleter(this);
    });
        	
	function RoutineView(routine) {
		this.routine = routine;
		
	    this.affichageInitial = affichageInitial;
	    function affichageInitial(enfant)
	    {
			$(enfant).find(".nomEnfant").text(this.routine.getPrenom());
			$(enfant).find(".photoEnfant").attr("src", this.routine.getPhoto());
			$(enfant).find(".nbrEtoilesRecompenseTotal").text(this.routine.getNbrEtoilesRecompenseTotal());
			this.affichageTableauBordInitial(enfant);
			this.affichageItemsRoutineInitial(enfant);
			$(enfant).find(".chrono").hide();
			$(enfant).find(".message").hide();
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
	        //alert(heure + ":" + minutes);
	        var dateFin = new Date();
	        dateFin.setHours(heure, minutes, 0);
	        routine.setDateFin(dateFin);
	        var tempsLibre = routine.getTempsLibreSecondes(new Date());
	        if (tempsLibre > 0) {
	        	var tableauBord = $(enfant).find(".tableauBord");
	            $(tableauBord).find(".tableauBordTempsFinEdit").hide();
	            $(tableauBord).find(".tableauBordTempsHeureFinBoutonGo").hide();
	            $(tableauBord).find(".tableauBordTempsHeureFinBoutonStop").show();
	            //alert(heure + ":" + minutes);
	            $(tableauBord).find(".tableauBordTempsHeureFin").text(heure + ":" + minutes);
	            $(tableauBord).find(".tableauBordTempsHeureFin").show();
	            this.rafraichirTempsJeux(enfant, tempsLibre);
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
	    	//alert("view selectionItemRoutine");
	    	
	    	$(enfant).find(".chrono").show();
            
            var progressbarLocal = $(enfant).find(".progressbar");
            progressbarLocal.progressbar("value", 0);
            
            var index = $(itemRoutine).find(".ui-selected").find(".routineItemIndex").text();
            //alert("index = " + index);
            var itemRoutine = this.routine.getItemRoutine(index);
            
            var tempsItemRoutine = parseInt(itemRoutine.getTempsMinutes()) * 60;
            progressbarLocal.progressbar("option", "max", tempsItemRoutine);
            //alert(itemRoutine.getTempsMinutes() + " " + tempsItemRoutine);
          
            $(enfant).find(".boutonStop").show();
            $(enfant).find(".boutonPause").show();
            $(enfant).find(".chrono").find(".boutonReprendre").hide();
console.log("hide");
            $(enfant).find(".message").hide();  
            setTimeout(progress, 3000);
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

	      $(enfant).find(".nbrEtoilesRecompenseTotal").text(this.routine.getNbrEtoilesRecompenseTotal());
       }

      this.itemRoutinePause = itemRoutinePause;   
      function itemRoutinePause(enfant) {
          $(enfant).find(".boutonStop").hide();
          $(enfant).find(".boutonPause").hide();
          $(enfant).find(".boutonReprendre").show();
      }

      this.itemRoutineReprendre = itemRoutineReprendre;   
      function itemRoutineReprendre(enfant) {
          $(enfant).find(".boutonStop").show();
          $(enfant).find(".boutonPause").show();
          $(enfant).find(".boutonReprendre").hide();
      }
   
      this.itemRoutineMarquerCompleter = itemRoutineMarquerCompleter;   
      function itemRoutineMarquerCompleter(enfant) {
          $(enfant).find(".ui-selected").addClass("routineItemTermine");
          $(enfant).find(".ui-selected").selectable({disabled: true});
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
          //alert("height = " + height);
          
          $(obj).find(".tempsJeuxIndicateur").attr({style: "height: " + height + "px;"});
          $(obj).closest(".tableauBord").find(".tempsJeuxMinutes").text(tempsJeuxRoutine);
          $(obj).show();
      }       
	}


});
