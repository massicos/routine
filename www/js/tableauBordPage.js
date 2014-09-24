$(document).ready(function() {

	var famille = new Famille("Massicotte", 0.05, 0.25);
	var routine0 = new Routine("0", 0, 0, 0, 1, 2, 1);
	routine0.charger("/routine" + config.getSuffixeCheminpParNiveau() + "/services/routine_charger.php");
    famille.addRoutine(routine0);
	var routine1 = new Routine("1", 0, 0, 0, 1, 1, 1);
	routine1.charger("/routine" + config.getSuffixeCheminpParNiveau() + "/services/routine_charger.php");
    famille.addRoutine(routine1);

    var headerView = new HeaderView(famille);
    headerView.affichageInitial();

    var tableauBordView = new TableauBordView(famille);
    tableauBordView.affichageInitial($(".tableauBord"));
/*
	var max = routines.length;
	for ( var i = 0; i < max; i++) {
		var tableauBordView = new TableauBordView(routines[i]);
		tableauBordView.affichageInitial($(".enfant")[i]);
	}
*/
	function trouverRoutine(prenom) {
		var max = routines.length;
		for ( var i = 0; i < max; i++) {
			if (routines[i].getPrenom() == prenom) {
				return routines[i];
			}
		}
		return null;
	}

	function TableauBordView(famille) {
		this.famille = famille;

	    this.affichageInitial = affichageInitial;
	    function affichageInitial(tableauBord)
	    {
			$("#modeParentActif").hide();

	    	var max = this.famille.getNbrRoutines();
            console.log("max = " + max);
            console.log("length = " + $(tableauBord).find(".tableauBordRoutine").length);
	    	for (var i = 0; i < max; i++) {
                console.log("i = " + i);
	    		if (i > 0) {
                    console.log("clone");
	    			var routinePrecedente = $(tableauBord).find(".tableauBordRoutine")[i-1];
	    			$(routinePrecedente).clone().appendTo($(tableauBord));
	    		}
	    	    var routineAffichage = $(tableauBord).find(".tableauBordRoutine")[i];
                var routine = this.famille.getRoutineParIndex(i);
                console.log("prenom = " + routine.getPrenom());
	    	    $(routineAffichage).find(".prenom").text(routine.getPrenom());
                $(routineAffichage).find(".nbrEtoiles").text(routine.getNbrEtoilesRecompenseTotal());
                var sousTotalEtoiles = routine.getNbrEtoilesRecompenseTotal() * famille.getMontantParEtoile();
                $(routineAffichage).find(".sousTotalEtoiles").text(sousTotalEtoiles.toFixed(2) + "$");
                var nbrMedailles = routine.getNbrMedailles();
                $(routineAffichage).find(".nbrMedailles").text(nbrMedailles);
                $(routineAffichage).find(".nbrMedaillesAValider").text(routine.getNbrMedaillesAValider());
                var sousTotalMedailles = nbrMedailles * famille.getMontantParSuccesComplet();
                $(routineAffichage).find(".sousTotalMedailles").text(sousTotalMedailles.toFixed(2) + "$");
                var total = sousTotalEtoiles + sousTotalMedailles;
                $(routineAffichage).find(".total").text(total.toFixed(2) + "$");
	    	}
	    }
    }


});
