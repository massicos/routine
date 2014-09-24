$(function () {
    monDialog = $("#dialog-confirm").dialog({
        autoOpen: false,
        resizable: false,
        height: 140,
        modal: true,
        buttons: {
            "Delete all items": function () {
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
