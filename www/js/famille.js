function Famille(nom, montantParEtoile, montantParMedaille)
{
    this.nom = nom;
    this.montantParEtoile = montantParEtoile;
    this.montantParMedaille = montantParMedaille;
    this.modeParent = false;

    this.routines = new Array();

    this.getNom = getNom;
    function getNom()
    {
        return this.nom;
    }

    this.getMontantParEtoile = getMontantParEtoile;
    function getMontantParEtoile()
    {
        return this.montantParEtoile;
    }

    this.getMontantParMedaille = getMontantParMedaille;
    function getMontantParMedaille()
    {
        return this.montantParMedaille;
    }

    this.getNbrRoutines = getNbrRoutines;
    function getNbrRoutines()
    {
        return this.routines.length;
    }

    this.setModeParent = setModeParent;
    function setModeParent(modeParent)
    {
        this.modeParent = modeParent;
    }

    this.getModeParent = getModeParent;
    function getModeParent()
    {
        return this.modeParent;
    }

    this.addRoutine = addRoutine;
    function addRoutine(routine)
    {
        return this.routines[this.routines.length] = routine;
    }

    this.getRoutineParIndex = getRoutineParIndex;
    function getRoutineParIndex(index)
    {
        if (this.routines.length == 0) {
            return false;
        }
        return this.routines[index];
    }

    this.chargerJson = chargerJson;
    function chargerJson(obj) {
        this.nom = obj.nom;
        this.montantParEtoile = obj.montantParEtoile;
        this.montantParMedaille = obj.montantParMedaille;
        this.modeParent = false;
        if (obj.routines !=  null) {
            console.log("routine non vide !!");
            for (var i = 0; i < obj.routines.length; i++) {
                var routine = new Routine("Vide", 0, 0, 0, 0, 0, 0);
                routine.chargerJson(obj.routines[i]);
                this.routines[i] = routine;
            }
        }
    }

    this.charger = charger;
    function charger(url) {
        url = url;
        var jqxhr = $.ajax( {
            url: url,
            dataType: "json",
            async: false,
            context: this
        })
        .done(function(msg) {
            this.chargerJson(msg);
            console.log( "success " +  this.nom + " " + this.montantParEtoile);
            console.log(this.routines);
        })
        .fail(function(msg) {
            console.log("bidon");
            console.debug(msg);
            console.log( "error" + msg.erreur);
        })
        .always(function() {
            console.log( "complete" );
        });
    }
}
