$(document).ready(function() {

	var routines = new Array();
	routines[0] = new Routine("Charles");
	routines[0].setPhoto("../routinePerso/images/photos/Charles1.jpg");
	routines[0].addItemRoutine(new ItemRoutine("Texte de l'item 0-C", "../routinePerso/images/itemsRoutine/habiller.jpg", 15, 1));
	routines[0].addItemRoutine(new ItemRoutine("Texte de l'item 1-C", "../routinePerso/images/itemsRoutine/dejeuner.jpg", 17, 2));	
	routines[1] = new Routine("Léanne");
	routines[1].setPhoto("../routinePerso/images/photos/Leanne1.jpg");
	routines[1].addItemRoutine(new ItemRoutine("Texte de l'item 0-L", "../routinePerso/images/itemsRoutine/habiller.jpg", 10, 3));
	routines[1].addItemRoutine(new ItemRoutine("Texte de l'item 1-L", "../routinePerso/images/itemsRoutine/dejeuner.jpg", 12, 4));	

	//var LABEL_FIN_ROUTINE = "Heure de fin :";
	//var LABEL_TEMPS_LIBRE = "Temps de jeux :";

	var max = routines.length;
	for ( var i = 0; i < max; i++) {
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
                $(this).find(".progress-label").text("Complété !");
                verifierTemps(this);
                routineItemMarquerCompleter(this);
            }
        });
    });    
    
    $(".routine").selectable({
        selected: function(event, ui) {
            var enfant = $(event.target).closest(".enfant");
            var routine = trouverRoutine($(enfant).find(".nomEnfant").text());
            
            var index = $(enfant).find(".ui-selected").find(".routineItemIndex").text();
            alert("index = " + index);
            var itemRoutine = routine.getItemRoutine(index);
            itemRoutine.debuter(new Date());
            
            var routineView = new RoutineView(routine);
    		routineView.selectionItemRoutine(enfant, $(event.target));
        }
    });
    
    function progress() {

        var auMoinsUneRoutineActive = false;
        $(".progressbar").each(function() {
            var enfant = $(this).closest(".enfant");
            var routine = trouverRoutine($(enfant).find(".nomEnfant").text());
            //alert("estEnCoursItemRoutine (" + routine.getPrenom() + ") = " + routine.estEnCoursItemRoutine());
            
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
	
	function RoutineView(routine) {
		this.routine = routine;
		
	    this.affichageInitial = affichageInitial;
	    function affichageInitial(enfant)
	    {
			$(enfant).find(".nomEnfant").text(this.routine.getPrenom());
			$(enfant).find(".photoEnfant").attr("src", this.routine.getPhoto());
			this.affichageTableauBordInitial(enfant);
			this.affichageItemsRoutineInitial(enfant);
			$(enfant).find(".chrono").hide();
	    }
	    
	    this.affichageTableauBordInitial = affichageTableauBordInitial;
	    function affichageTableauBordInitial(enfant)
	    {
	    	//$(enfant).find(".tempsLabel").text(LABEL_FIN_ROUTINE);
	    	$(enfant).find(".tableauBordTempsHeureFin").hide();
	    	$(enfant).find(".tableauBordTempsHeureFinBoutonStop").hide();
	    	$(enfant).find(".tableauBordTempsTotalRoutineMinutes").text(this.routine.getTotalTempsItemsRoutineNonCompletes());
	    	$(enfant).find(".nbrEtoilesImg").hide();
	    	$(enfant).find(".nbrEtoilesTexte").hide();
	    	$(enfant).find(".tempsJeux").hide();
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
	        var tempTotalRoutineMinutes = this.routine.getTotalTempsItemsRoutineNonCompletes();
	        var heure = $(enfant).find(".tableauBordTempsHeureFinInput").val()[0] + $(enfant).find(".tableauBordTempsHeureFinInput").val()[1];
	        var minutes = $(enfant).find(".tableauBordTempsHeureFinInput").val()[3] + $(enfant).find(".tableauBordTempsHeureFinInput").val()[4];
	        var dateFin = new Date();
	        dateFin.setHours(heure, minutes, 0);
	        routine.setDateFin(dateFin);
	        var tempsLibre = routine.getTempsLibreSecondes(new Date());
	        if (tempsLibre > 0) {
	        	var tableauBord = $(enfant).find(".tableauBord");
	            $(tableauBord).find(".tableauBordTempsHeureFinInput").hide();
	            $(tableauBord).find(".tableauBordTempsHeureFinBoutonGo").hide();
	            $(tableauBord).find(".tableauBordTempsHeureFinBoutonStop").show();
	            $(tableauBord).find(".tableauBordTempsHeureFin").text($(enfant).find(".tableauBordTempsHeureFinInput").val());
	            $(tableauBord).find(".tableauBordTempsHeureFin").show();
	            //rafraichirTempsJeux($(this).closest(".enfant").find(".tempsJeux"), tempsJeuxMinutes);
	            
	        }
	        else {
	            alert("Le temps total doit être plus grand que le temps total de la routine");
	        }
	    }
	    
	    this.affichageBoutonStop = affichageBoutonStop;
	    function affichageBoutonStop(enfant) {
	    	$(enfant).find(".tableauBordTempsTotalRoutineMinutes").text(this.routine.getTotalTempsItemsRoutine());

	        var tableauBord = $(enfant).find(".tableauBord");
	        $(tableauBord).find(".tableauBordTempsHeureFinInput").val("00:00");
	        $(tableauBord).find(".tableauBordTempsHeureFinInput").show();
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
            
            setTimeout(progress, 3000);
            /*
            var tempsItemRoutine = $(event.target).find(".ui-selected").find(".tempsMillisecondes").text() / 1000;
            var d = new Date();
            d = new Date(d.getTime() + (parseInt(tempsRoutineItem) * 1000));
            personnes[$(event.target).closest(".enfant").find(".nomEnfant").text()].setDateFinItemRoutine(d);
            progressbarLocal.progressbar("option", "max", tempsRoutineItem);

            setTimeout(progress, 3000);
            */
	    }	    
	}
});