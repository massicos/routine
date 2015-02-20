var routineSetEtoilesMedailles = null;

$(function () {
    dialogSetEtoilesMedaille = $("#dialogSetEtoilesMedaille").dialog({
        autoOpen: false,
        resizable: false,
        height: 260,
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
        $("#nouveauTotalArgent").val(total.toFixed(2));

        $("#setEtoilesMedaillesFormulaire").show();
        $("#setEtoilesMedaillesConfirmation").hide();
        $("#setEtoilesMedailleMessage").hide();

        $("#nouveauNbrEtoiles").attr("disabled", false);
        $("#nouveauNbrMedailles").attr("disabled", false);
        $("#nouveauTotalArgent").attr("disabled", true);
        $("#chkBoxMontant").attr("checked", false);

        dialogSetEtoilesMedaille.dialog("open");
    });

    $("#nouveauNbrEtoiles").change(function() {
        validationChangementEtoilesMedailles();
    });

    $("#nouveauNbrMedailles").change(function() {
        validationChangementEtoilesMedailles();
    });

    $("#chkBoxMontant").click(function() {
        if ($(this).is(':checked')) {
            $("#nouveauNbrEtoiles").attr("disabled", true);
            $("#nouveauNbrMedailles").attr("disabled", true);
            $("#nouveauTotalArgent").attr("disabled", false);
        }
        else {
            $("#nouveauNbrEtoiles").attr("disabled", false);
            $("#nouveauNbrMedailles").attr("disabled", false);
            $("#nouveauTotalArgent").attr("disabled", true);
        }
    });

    $("#nouveauTotalArgent").change(function() {

        var estUnNombreValide = Number.isInteger(parseInt($(this).val()))
                                && ($(this).val() - parseFloat( $(this).val() ) + 1) >= 0;
        if (!estUnNombreValide) {
            $("#nouveauTotalArgent").val("--");
            $("#setEtoilesMedailleMessage").show();
            return;
        }

        var sousTotalMedailles = parseInt($("#nouveauNbrMedailles").val()) * famille.getMontantParSuccesComplet();
        var totalEnArgent = $(this).val();

        if (totalEnArgent < sousTotalMedailles) {
            if (parseFloat(totalEnArgent) % famille.getMontantParSuccesComplet() == 0) {
                $("#nouveauNbrEtoiles").val(0);
                $("#nouveauNbrMedailles").val(parseFloat(totalEnArgent) / famille.getMontantParSuccesComplet());
            }
            else {
                var nbrMedailles = parseFloat(totalEnArgent) / famille.getMontantParSuccesComplet();
                $("#nouveauNbrMedailles").val(parseInt(nbrMedailles));
                var nbrEtoiles = ((parseInt(nbrMedailles) * famille.getMontantParSuccesComplet()) - parseFloat(totalEnArgent)) / famille.getMontantParEtoile();
                nbrEtoiles = nbrEtoiles * -1;
                nbrEtoiles = Math.ceil(parseFloat(nbrEtoiles.toFixed(2)));
                $("#nouveauNbrEtoiles").val(parseInt(nbrEtoiles));
            }

        }
        else {
            var sousTotalEtoiles = parseFloat(totalEnArgent) - parseFloat(sousTotalMedailles);
            var nbrEtoiles = parseFloat(sousTotalEtoiles) / famille.getMontantParEtoile();
            nbrEtoiles = Math.ceil(parseFloat(nbrEtoiles.toFixed(2)));
            $("#nouveauNbrEtoiles").val(parseInt(nbrEtoiles));
        }
    });

    function validationChangementEtoilesMedailles() {
        $("#setEtoilesMedailleMessage").hide();

        var nbrEtoiles = $("#nouveauNbrEtoiles").val();
        var nbrMedailles = $("#nouveauNbrMedailles").val();
        if (Number.isInteger(parseInt(nbrEtoiles))
                && Number.isInteger(parseInt(nbrMedailles))) {
            var total = nbrEtoiles * famille.getMontantParEtoile()
            + nbrMedailles * famille.getMontantParSuccesComplet();
            $("#nouveauTotalArgent").val(total.toFixed(2));
        }
        else {
            $("#nouveauTotalArgent").val("--");
            $("#setEtoilesMedailleMessage").show();
        }
    }

});
