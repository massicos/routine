var famille = null;
var tableauBordView = null;
$(document).ready(function() {

    famille = new Famille("Massicotte", 0.05, 0.25);
    famille.charger("/routine" + config.getSuffixeCheminpParNiveau() + "/services/famille_getJson.php");

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
			affichageLigneTableau(tableauBord, i);
		}
	}

	this.majAffichageEtoilesMedailles = majAffichageEtoilesMedailles;
	function majAffichageEtoilesMedailles(tableauBord, prenom)
	{
		var max = this.famille.getNbrRoutines();
		for (var i = 0; i < max; i++) {
			var routine = this.famille.getRoutineParIndex(i);
			if (routine.getPrenom() == prenom){
				affichageLigneTableau(tableauBord, i);
				break;
			}
		}
	}

	this.affichageLigneTableau = affichageLigneTableau
	function affichageLigneTableau(tableauBord, i) {
		var routineAffichage = $(tableauBord).find(".tableauBordRoutine")[i];
		var routine = this.famille.getRoutineParIndex(i);
		$(routineAffichage).find(".prenom").text(routine.getPrenom());
		var routineAffichage = $(tableauBord).find(".tableauBordRoutine")[i];
		$(routineAffichage).find(".nbrEtoiles").text(routine.getNbrEtoiles());
		var sousTotalEtoiles = routine.getNbrEtoiles() * famille.getMontantParEtoile();
		$(routineAffichage).find(".sousTotalEtoiles").text(sousTotalEtoiles.toFixed(2) + "$");
		var nbrMedailles = routine.getNbrMedailles();
		$(routineAffichage).find(".nbrMedailles").text(nbrMedailles);
		$(routineAffichage).find(".nbrMedaillesAValider").text(routine.getNbrMedaillesAValider());
		var sousTotalMedailles = nbrMedailles * famille.getMontantParMedaille();
		$(routineAffichage).find(".sousTotalMedailles").text(sousTotalMedailles.toFixed(2) + "$");
		var sousTotalEtoiles = routine.getNbrEtoiles() * famille.getMontantParEtoile();
		var total = sousTotalEtoiles + sousTotalMedailles;
		$(routineAffichage).find(".total").text(total.toFixed(2) + "$");
	}

	this.affichageModeParent = affichageModeParent;
	function affichageModeParent(tableauBord) {
		if (this.famille.getModeParent()) {
			$("#modeParentActif").show();
			$(".btnOuvrirDialogValiderMedaille").show();
			$(".btnOuvrirDialogSetEtoilesMedailles").show();
		}
		else {
			$("#modeParentActif").hide();
			$(".btnOuvrirDialogValiderMedaille").hide();
			$(".btnOuvrirDialogSetEtoilesMedailles").hide();
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
