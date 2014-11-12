var famille = null;
var tableauBordView = null;
$(document).ready(function() {

	famille = new Famille("Massicotte", 0.05, 0.25);
	var routine0 = new Routine("0", 0, 0, 0, 1, 2, 1);
	routine0.charger("/routine" + config.getSuffixeCheminpParNiveau() + "/services/routine_charger.php");
    famille.addRoutine(routine0);
	var routine1 = new Routine("1", 0, 0, 0, 1, 1, 1);
	routine1.charger("/routine" + config.getSuffixeCheminpParNiveau() + "/services/routine_charger.php");
    famille.addRoutine(routine1);

    var headerView = new HeaderView(famille);
    headerView.affichageInitial();

    tableauBordView = new TableauBordView(famille);
    tableauBordView.affichageInitial($(".tableauBord"));

});


function TableauBordView(famille) {
	this.famille = famille;

	this.affichageInitial = affichageInitial;
	function affichageInitial(tableauBord)
	{
		this.affichageModeParent(tableauBord);

		var max = this.famille.getNbrRoutines();
		for (var i = 0; i < max; i++) {
			if (i > 0) {
				var routinePrecedente = $(tableauBord).find(".tableauBordRoutine")[i-1];
				$(routinePrecedente).clone().appendTo($(tableauBord));
			}
			var routineAffichage = $(tableauBord).find(".tableauBordRoutine")[i];
			var routine = this.famille.getRoutineParIndex(i);
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

	this.majAffichageMedaille = majAffichageMedaille;
	function majAffichageMedaille(tableauBord, prenom)
	{
		var max = this.famille.getNbrRoutines();
		for (var i = 0; i < max; i++) {
			var routine = this.famille.getRoutineParIndex(i);
			if (routine.getPrenom() == prenom){
				var routineAffichage = $(tableauBord).find(".tableauBordRoutine")[i];
				var nbrMedailles = routine.getNbrMedailles();
				$(routineAffichage).find(".nbrMedailles").text(nbrMedailles);
				$(routineAffichage).find(".nbrMedaillesAValider").text(routine.getNbrMedaillesAValider());
				var sousTotalMedailles = nbrMedailles * famille.getMontantParSuccesComplet();
				$(routineAffichage).find(".sousTotalMedailles").text(sousTotalMedailles.toFixed(2) + "$");
				var sousTotalEtoiles = routine.getNbrEtoilesRecompenseTotal() * famille.getMontantParEtoile();
				var total = sousTotalEtoiles + sousTotalMedailles;
				$(routineAffichage).find(".total").text(total.toFixed(2) + "$");

				break;
			}
		}
	}

	this.affichageModeParent = affichageModeParent;
	function affichageModeParent(tableauBord) {
		if (this.famille.getModeParent()) {
			$("#modeParentActif").show();
			$(".btnOuvrirDialogValiderMedaille").show();
		}
		else {
			$("#modeParentActif").hide();
			$(".btnOuvrirDialogValiderMedaille").hide();
			$("#btnOuvrirDialogModeParent").show();
		}
	}
}

function trouverRoutine(prenom) {
	var max = famille.getNbrRoutines();
	for ( var i = 0; i < max; i++) {
		if (famille.getRoutineParIndex(i).getPrenom() == prenom) {
			return famille.getRoutineParIndex(i);
		}
	}
	return null;
}
