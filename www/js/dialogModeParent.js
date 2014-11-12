$(function () {
    monDialog = $("#dialogModeParent").dialog({
        autoOpen: false,
        resizable: false,
        height: 120,
        width: 300,
        modal: true,
        buttons: {
            "OK": function () {

                url = "/routine" + config.getSuffixeCheminpParNiveau() +
                        "/services/famille_modeParent.php?mdp=" + $("#mdpParent").val();
                var jqxhr = $.ajax( {
                url: url,
                dataType: "json",
                async: false,
                context: this
                })
                .done(function(msg) {
                    console.log( "success " +  msg.nom + " " + msg.modeParent);
                    if (msg.modeParent) {
                        $("#btnOuvrirDialogModeParent").hide();
                        famille.setModeParent(true);
                        tableauBordView.affichageModeParent($(".tableauBord"));
                        $(this).dialog("close");
                    } else {
                        $("#modeParentMessage").text("Erreur, mot de passe invalide.");
                        $("#mdpParent").val("");
                        $("#modeParentMessage").show();
                    }

                })
                .fail(function(msg) {
                    console.log( "error" + msg.erreur);
                    $("#modeParentMessage").text("Erreur, problème de communication.");
                 })
                .always(function() {
                    console.log( "complete" );
                });
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#btnOuvrirDialogModeParent").button().on("click", function () {
        $("#mdpParent").val("");
        $("#modeParentMessage").hide();
        monDialog.dialog("open");
    });

    $("#modeParentQuitter").click(function() {

        url = "/routine" + config.getSuffixeCheminpParNiveau() +
                "/services/famille_quitterModeParent.php";
        var jqxhr = $.ajax( {
        url: url,
        dataType: "json",
        async: false,
        context: this
        })
        .done(function(msg) {
            console.log( "success " +  msg.nom + " " + msg.modeParent);
            famille.setModeParent(false);
            tableauBordView.affichageModeParent($(".tableauBord"));
        })
        .fail(function(msg) {
            console.log( "error" + msg.erreur);
         })
        .always(function() {
            console.log( "complete" );
        });
    });

});
