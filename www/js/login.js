$(document).ready(function() {
    $("#btnConnecter").click(function() {
        if (ajaxLogin("services/famille_login.php", $("#login"), $("#password"), null)) {
            window.location.assign("index.php");
        }
        
    });
    
    function ajaxLogin(url, login, password, errorDisplay) {
        // Ajax
        var succesAjax = false;
        url = url + "?login=" + $(login).val() + "&password=" + $(password).val();
        var jqxhr = $.ajax({
            url: url,
            dataType: "json",
            async: false,
            context: this
        })
                .done(function (msg) {
                    console.log("done");
                    if (msg.parentMode) {
                        $(btnToDisplay).show();
                        $("#parentModeActive").show();
                        $("#btnOpenDialogParentMode").hide();            
                    }
                    succesAjax = true;
                })
                .fail(function (msg) {
                    console.log("fail");
                    alert("Problème de communication !")
                    succesAjax = false;
                })
        return succesAjax;        
    }        
});

