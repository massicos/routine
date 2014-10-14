$(function () {
    monDialog = $("#dialog-confirm").dialog({
        autoOpen: false,
        resizable: false,
        height: 140,
        width: 350,
        modal: true,
        buttons: {
            "Delete all items": function () {
                alert("bidon");
                $(this).dialog("close");
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#ouvrirDialog").button().on("click", function () {
        monDialog.dialog("open");
    });

});
