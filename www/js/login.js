$(document).ready(function() {
    $("#btnConnecter").click(function() {
        if (ajaxLogin("services/famille_login.php", $("#login").val(), $("#password").val(), $("#loginMessage"))) {
            window.location.assign("index.php");
            //alert("Done !!");
        }
        else {
            $("#password").val("");
        }
        
    });
    
    function ajaxLogin(url, login, password, errorDisplay) {
        // Ajax
        var succesAjax = false;
        $(errorDisplay).hide();
        url = url + "?login=" + login + "&password=" + password;
        var jqxhr = $.ajax({
            url: url,
            dataType: "json",
            async: false,
            context: this
        })
                .done(function (msg) {
                    console.log("done");
                    console.debug(msg);
                    if (msg.isLogin) {
                        succesAjax = true;
                    }
                    else {
                        $(errorDisplay).text("Veuillez entrer un code d'usager et un mot de passe valide.");
                        $(errorDisplay).show();
                        succesAjax = false;                        
                    }
                })
                .fail(function (msg) {
                    console.log("fail");
                    $(errorDisplay).text("Problème de communication !");
                    $(errorDisplay).show();
                    succesAjax = false;
                })
        return succesAjax;        
    }        
});

