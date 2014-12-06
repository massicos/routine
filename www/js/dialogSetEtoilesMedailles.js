var routineSetEtoilesMedailles = null;

$(function () {
    dialogSetEtoilesMedaille = $("#dialogSetEtoilesMedaille").dialog({
        autoOpen: false,
        resizable: false,
        height: 230,
        width: 300,
        modal: true,
        buttons: {
            "OK": function () {
                // Ajax
                var succesMajMedailles = routineSetEtoilesMedailles.majEtoilesMedailles("/routine" +
                    config.getSuffixeCheminpParNiveau() + "/services/routine_setEtoilesMedailles.php",
                    $("#nouveauNbrEtoiles").val(),
                    $("#nouveauNbrMedailles").val());

                if (succesMajMedailles) {
                    var tableauBordView = new TableauBordView(famille);
                    tableauBordView.majAffichageEtoilesMedailles($(".tableauBord"), routineSetEtoilesMedailles.getPrenom());
                }

                $(this).dialog("close");
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $(".btnOuvrirDialogSetEtoilesMedailles").button().on("click", function () {
        var enfant = $(this).closest(".tableauBordRoutine");

        routineSetEtoilesMedailles = trouverRoutine($(enfant).find(".prenom").text());

        var nbrEtoiles = routineSetEtoilesMedailles.getNbrEtoiles();
        $("#nouveauNbrEtoiles").val(nbrEtoiles);
        var nbrMedailles = routineSetEtoilesMedailles.getNbrMedailles();
        $("#nouveauNbrMedailles").val(nbrMedailles);
        var total = nbrEtoiles * famille.getMontantParEtoile()
            + nbrMedailles * famille.getMontantParSuccesComplet();
        $("#nouveauTotalArgent").text(total.toFixed(2));

        $("#setEtoilesMedaillesFormulaire").show();
        $("#setEtoilesMedaillesConfirmation").hide();
        $("#setEtoilesMedailleMessage").hide();

        dialogSetEtoilesMedaille.dialog("open");
    });

    $("#nouveauNbrEtoiles").change(function() {
        validationChangementEtoilesMedailles();
    });

    $("#nouveauNbrMedailles").change(function() {
        validationChangementEtoilesMedailles();
    });

    function validationChangementEtoilesMedailles() {
        $("#setEtoilesMedailleMessage").hide();

        var nbrEtoiles = $("#nouveauNbrEtoiles").val();
        var nbrMedailles = $("#nouveauNbrMedailles").val();
        if (Number.isInteger(parseInt(nbrEtoiles))
                && Number.isInteger(parseInt(nbrMedailles))) {
            var total = nbrEtoiles * famille.getMontantParEtoile()
            + nbrMedailles * famille.getMontantParSuccesComplet();
            $("#nouveauTotalArgent").text(total.toFixed(2));
        }
        else {
            $("#nouveauTotalArgent").text("--");
            $("#setEtoilesMedailleMessage").show();
        }
    }

});
