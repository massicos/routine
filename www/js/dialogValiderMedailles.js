$(function () {
    monDialog = $("#dialog-confirm").dialog({
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
                        $("#modeParentActif").show();
                        $(this).dialog("close");
                    } else {
                        $("#mdpInvalide").show();
                    }

                })
                .fail(function(msg) {
                    console.log( "error" + msg.erreur);
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

    $("#ouvrirDialog").button().on("click", function () {
        $("#mdpParent").val("");
        $("#mdpInvalide").hide();
        monDialog.dialog("open");
    });

    $("#modeParentQuitter").click(function() {
        $("#modeParentActif").hide();
    });

});
