var validationMedaille = null;

$(function () {
    dialogValiderMedaille = $("#dialogValiderMedaille").dialog({
        autoOpen: false,
        resizable: false,
        height: 170,
        width: 300,
        modal: true,
        buttons: {
            "OK": function () {
                if (validationMedaille.getEnAttenteConfirmation()) {
                    var routine = validationMedaille.getRoutine();

                    // Ajax
                    var succesMajMedailles = routine.majMedailles("/routine" + config.getSuffixeCheminpParNiveau() + "/services/famille_validerMedailles.php",
                        $("#nbrMedailleValider").val());

                    if (succesMajMedailles) {
                        var tableauBordView = new TableauBordView(famille);
                        tableauBordView.majAffichageEtoilesMedailles($(".tableauBord"), routine.getPrenom());
                    }
                    else {
                        validationMedaille.annuler();
                    }

                    $(this).dialog("close");
                }
                else {
                    if (validationMedaille.estValide()) {
                        validationMedaille.setEnAttenteConfirmation(true);
                        var routine = validationMedaille.getRoutine();
                        var nbrMedaillesAValider = $("#nbrMedailleValider").val();
                        $("#nbrMedailleValiderConfirmation").text($("#nbrMedailleValider").val());
                        $("#nouveauTotalMedailleConfirmation").text($("#nouveauTotalMedaille").text());

                        $("#validerMedailleFormulaire").hide();
                        $("#validerMedailleConfirmation").show();
                    }
                }

            },
            Cancel: function () {
                if (validationMedaille.getEnAttenteConfirmation()) {
                    console.log("en attente de confirmation");
                    validationMedaille.setEnAttenteConfirmation(false);
                    validationMedaille.annuler();
                    $("#validerMedailleFormulaire").show();
                    $("#validerMedailleConfirmation").hide();
                }
                else {
                    validationMedaille.annuler();
                    $(this).dialog("close");
                }
            }
        }
    });

    $(".btnOuvrirDialogValiderMedaille").button().on("click", function () {
        var enfant = $(this).closest(".tableauBordRoutine");

        var routine = trouverRoutine($(enfant).find(".prenom").text());
        validationMedaille = new ValidationMedaille(routine);

        var nbrMedaillesAValider = routine.getNbrMedaillesAValider();
        $("#nbrMedailleValider").val(nbrMedaillesAValider);
        var nouveauTotalMedaille = parseInt(nbrMedaillesAValider) + parseInt(routine.getNbrMedailles());
        $("#nouveauTotalMedaille").text(nouveauTotalMedaille);

        $("#validerMedailleFormulaire").show();
        $("#validerMedailleConfirmation").hide();
        $("#medailleValiderMessage").hide();

        validationMedaille.valider($("#nbrMedailleValider").val());

        dialogValiderMedaille.dialog("open");
    });

    $("#nbrMedailleValider").change(function() {
        validationMedaille.annuler();
        if (validationMedaille.valider($("#nbrMedailleValider").val())) {
            var routine = validationMedaille.getRoutine();
            $("#nouveauTotalMedaille").text(routine.getNbrMedailles());
            $("#medailleValiderMessage").hide();
        }
        else {
            $("#medailleValiderMessage").show();
        }
    });

});

function ValidationMedaille (routine) {
    this.enAttenteConfirmation = false;
    this.routine = routine;
    this.nbrMedaillesInitial = routine.getNbrMedailles();
    this.nbrMedaillesAValiderInitial = routine.getNbrMedaillesAValider();
    //this.routine.validationMedaille(routine.getNbrMedaillesAValider());
    this.valide = true;

    this.getEnAttenteConfirmation = getEnAttenteConfirmation;
    function getEnAttenteConfirmation() {
        return this.enAttenteConfirmation;
    }

    this.setEnAttenteConfirmation = setEnAttenteConfirmation;
    function setEnAttenteConfirmation(enAttenteConfirmation) {
        this.enAttenteConfirmation = enAttenteConfirmation;
    }

    this.getRoutine = getRoutine;
    function getRoutine() {
        return this.routine;
    }

    this.annuler = annuler;
    function annuler() {
        this.routine.resetMedailles(this.nbrMedaillesInitial, this.nbrMedaillesAValiderInitial);
    }

    this.valider = valider
    function valider(nbrMedaillesAValider) {
        this.valide = this.routine.validerMedaille(nbrMedaillesAValider);
        return this.valide;
    }

    this.estValide = estValide;
    function estValide() {
        return this.valide;
    }
}
