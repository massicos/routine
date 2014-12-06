function Routine(prenom, nbrEtoiles, nbrMedailles, nbrMedaillesAValider, idFamille, idEnfant, idRoutine)
{
    this.prenom = prenom;
    this.photo = false;
    this.dateFin = false;
    this.nbrEtoiles = nbrEtoiles;
    this.nbrMedailles = nbrMedailles;
    this.nbrMedaillesAValider = nbrMedaillesAValider;

    this.idFamille = idFamille;
    this.idEnfant = idEnfant;
    this.idRoutine = idRoutine;

    this.itemsRoutine = new Array();

    this.getPrenom = getPrenom;
    function getPrenom()
    {
        return this.prenom;
    }

    this.getPrenomNormalise = getPrenomNormalise
    function getPrenomNormalise(){
        if (this.prenom == "Charles") {
            return "charles";
        }
        return "leanne";
    };

    this.setPrenom = setPrenom;
    function setPrenom(prenom)
    {
        this.prenom = prenom;
    }

    this.getPhoto = getPhoto;
    function getPhoto()
    {
        return this.photo;
    }

    this.setPhoto = setPhoto;
    function setPhoto(photo)
    {
        this.photo = photo;
    }

    this.getDateFin = getDateFin;
    function getDateFin()
    {
        return this.dateFin;
    }

    this.setDateFin = setDateFin;
    function setDateFin(dateFin, dateComparaison)
        {
            var tempsLibre = this.calculTempsLibre(dateFin, dateComparaison);
            if (tempsLibre < 0) {
                this.dateFin = false;
                return 0;
            }
            this.dateFin = dateFin;
            return tempsLibre;
    }

    this.getTempsJeuxMinutes = getTempsJeuxMinutes;
    function getTempsJeuxMinutes()
    {
        return this.dateFin;
    }

    this.getIdFamille = getIdFamille;
    function getIdFamille()
    {
        return this.idFamille;
    }

    this.getIdEnfant = getIdEnfant;
    function getIdEnfant()
    {
        return this.idEnfant;
    }

    this.getIdRoutine = getIdRoutine;
    function getIdRoutine()
    {
        return this.idRoutine;
    }

    this.getNbrItemRoutine = getNbrItemRoutine;
    function getNbrItemRoutine()
    {
        return this.itemsRoutine.length;
    }

    this.addItemRoutine = addItemRoutine;
    function addItemRoutine(itemRoutine)
    {
    	this.itemsRoutine[this.itemsRoutine.length] = itemRoutine;
    }

    this.getItemRoutine = getItemRoutine;
    function getItemRoutine(index)
    {
    	return this.itemsRoutine[index];
    }

    this.getTotalTempsItemsRoutine = getTotalTempsItemsRoutine;
    function getTotalTempsItemsRoutine()
    {
    	if (this.itemsRoutine.length == 0) {
            return this.itemsRoutine.length;
    	}

    	var total = 0;
    	var max = this.itemsRoutine.length;
    	for (var i = 0; i < max; i++){
    		total += this.itemsRoutine[i].getTempsMinutes();
    	}
    	return total;
    }

    this.getTotalTempsItemsRoutineNonCompletes = getTotalTempsItemsRoutineNonCompletes;
    function getTotalTempsItemsRoutineNonCompletes()
    {
    	if (this.itemsRoutine.length == 0) {
            return this.itemsRoutine.length;
    	}

    	var total = 0;
    	var max = this.itemsRoutine.length;
    	for (var i = 0; i < max; i++){
    		if (this.itemsRoutine[i].getStatut() != statuts.FINI_SUCCES
    		        && this.itemsRoutine[i].getStatut() != statuts.FINI_ECHEC) {
    			total += this.itemsRoutine[i].getTempsMinutes();
    		}
    	}
    	return total;
    }

    this.getTempsLibreSecondes = getTempsLibreSecondes;
    function getTempsLibreSecondes(dateComparaison)
    {
        var tempsLibre = this.calculTempsLibre(this.dateFin, dateComparaison);
        if (tempsLibre < 0) {
            return 0;
        }
        return tempsLibre;
    }

    this.estEnCoursItemRoutine = estEnCoursItemRoutine;
    function estEnCoursItemRoutine()
    {
    	if (this.itemsRoutine.length == 0) {
            return false;
    	}

    	var max = this.itemsRoutine.length;
    	for (var i = 0; i < max; i++){
    		if (this.itemsRoutine[i].getStatut() == statuts.EN_COURS) {
    			return true;
    		}
    	}
    	return false;
    }

    this.estPretDebuter = estPretDebuter;
    function estPretDebuter()
    {
    	if (this.itemsRoutine.length == 0) {
            return false;
    	}
        if (this.dateFin != false) {
            return true;
        }

    	return false;
    }

    this.getItemRoutineEnCours = getItemRoutineEnCours;
    function getItemRoutineEnCours()
    {
    	var max = this.itemsRoutine.length;
    	for (var i = 0; i < max; i++){
    		if (this.itemsRoutine[i].getStatut() == statuts.EN_COURS) {
    			return this.itemsRoutine[i];
    		}
    	}
    	return false;
    }

    this.getItemRoutinePause = getItemRoutinePause;
    function getItemRoutinePause()
    {
    	var max = this.itemsRoutine.length;
    	for (var i = 0; i < max; i++){
    		if (this.itemsRoutine[i].getStatut() == statuts.PAUSE) {
    			return this.itemsRoutine[i];
    		}
    	}
    	return false;
    }

    this.toStringDebug = toStringDebug;
    function toStringDebug()
    {
        console.log("--------");
        console.log(this.prenom);
    	var max = this.itemsRoutine.length;
        console.log("Nombre de itemsRoutine = " + max);
    	for (var i = 0; i < max; i++){
            console.log(this.itemsRoutine[i].getTexte() + ", Statut = " + this.itemsRoutine[i].getStatut());
    	}
    }

    this.getNbrEtoilesRoutineEnCours = getNbrEtoilesRoutineEnCours;
    function getNbrEtoilesRoutineEnCours()
    {
    	if (this.itemsRoutine.length == 0) {
            return false;
    	}

        var nbrEtoiles = 0;
    	var max = this.itemsRoutine.length;
    	for (var i = 0; i < max; i++){
    		if (this.itemsRoutine[i].getStatut() == statuts.FINI_SUCCES) {
    			nbrEtoiles += this.itemsRoutine[i].getNbrEtoiles();
    		}
    	}
    	return nbrEtoiles;
    }

    this.getNbrEtoiles = getNbrEtoiles;
    function getNbrEtoiles() {
        return this.nbrEtoiles;
    }

    this.getNbrMedailles = getNbrMedailles;
    function getNbrMedailles() {
        return this.nbrMedailles;
    }

    this.getNbrMedaillesAValider = getNbrMedaillesAValider;
    function getNbrMedaillesAValider() {
        return this.nbrMedaillesAValider;
    }

    this.addNbrEtoiles = addNbrEtoiles;
    function addNbrEtoiles(nbrEtoiles) {
        this.nbrEtoiles = this.nbrEtoiles + nbrEtoiles;
    }


    this.addNbrMedaillesAValider = addNbrMedaillesAValider;
    function addNbrMedaillesAValider(nbrMedailles) {
        this.nbrMedaillesAValider = this.nbrMedaillesAValider + nbrMedailles;
    }

    this.charger = charger;
    function charger(url) {

        url = url + "?idFamille=" + this.idFamille + "&idEnfant=" + this.idEnfant + "&idRoutine=" + this.idRoutine;
        var jqxhr = $.ajax( {
		url: url,
		dataType: "json",
		async: false,
		context: this
	    })
            .done(function(msg) {
		this.prenom = msg.prenom;
		this.nbrEtoiles = msg.nbrEtoiles;
		this.nbrMedailles = msg.nbrMedailles;
        this.nbrMedaillesAValider = msg.nbrMedaillesAValider;
	        console.log( "success " +  this.prenom + " " + this.nbrEtoiles);
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

   this.sauvegarderNbrEtoiles = sauvegarderNbrEtoiles;
   function sauvegarderNbrEtoiles(url, nbrEtoiles) {

        url = url + "?idFamille=" + this.idFamille + "&idEnfant=" + this.idEnfant + "&idRoutine=" + this.idRoutine + "&nbrEtoiles=" + nbrEtoiles;
        var jqxhr = $.ajax( {
		url: url,
		dataType: "json",
		async: false,
		context: this
	    })
            .done(function(msg) {
		this.prenom = msg.prenom;
		this.nbrEtoiles = msg.nbrEtoiles;
	        console.log( "success " +  this.prenom + " " + this.nbrEtoiles);
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


   this.sauvegarderNbrEtoilesAValider = sauvegarderNbrEtoilesAValider;
   function sauvegarderNbrEtoilesAValider(url, nbrEtoilesAValider) {

        url = url + "?idFamille=" + this.idFamille + "&idEnfant=" + this.idEnfant + "&idRoutine=" + this.idRoutine + "&nbrEtoilesAValider=" + nbrEtoilesAValider;
        var jqxhr = $.ajax( {
		url: url,
		dataType: "json",
		async: false,
		context: this
	    })
            .done(function(msg) {
		this.prenom = msg.prenom;
		this.nbrEtoilesAValider = msg.nbrEtoilesAValider;
	        console.log( "success " +  this.prenom + " " + this.nbrEtoilesAValider);
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

    this.estTerminee = estTerminee;
    function estTerminee() {
     	var max = this.itemsRoutine.length;
    	for (var i = 0; i < max; i++){
    		if (this.itemsRoutine[i].getStatut() != statuts.FINI_SUCCES &&
                    this.itemsRoutine[i].getStatut() != statuts.FINI_ECHEC) {
    			return false;
    		}
    	}
        return true;
    }

    this.meriteMedailleAValider = meriteMedailleAValider;
    function meriteMedailleAValider() {
     	var max = this.itemsRoutine.length;
    	for (var i = 0; i < max; i++){
    		if (this.itemsRoutine[i].getStatut() != statuts.FINI_SUCCES) {
    			return false;
    		}
    	}
        return true;
    }

    this.calculTempsLibre = calculTempsLibre;
    function calculTempsLibre(dateFin, dateComparaison) {
        var totalTempsItemsRoutineNonCompletes = this.getTotalTempsItemsRoutineNonCompletes();
        dateComparaison.setMinutes(dateComparaison.getMinutes() + totalTempsItemsRoutineNonCompletes);
        var tempsLibre = (dateFin - dateComparaison) / 1000;

        return tempsLibre;
    }

    this.addNbrMedaille = addNbrMedaille;
    function addNbrMedaille(nbrMedailles) {
        this.nbrMedailles = parseInt(this.nbrMedailles) + parseInt(nbrMedailles);
    }

    this.validerMedaille = validerMedaille;
    function validerMedaille(nbrMedaillesAValider) {
        if (nbrMedaillesAValider < 0 || nbrMedaillesAValider > this.nbrMedaillesAValider) {
            return false;
        }
        else if (!Number.isInteger(parseInt(nbrMedaillesAValider))) {
            return false;
        }
        this.nbrMedailles = parseInt(this.nbrMedailles) + parseInt(nbrMedaillesAValider);
        this.nbrMedaillesAValider = 0;
        return true;
    }

    this.majMedailles = majMedailles;
    function majMedailles(url, nbrMedaillesAValider) {
        // Ajax
        var succesAjax = false;
        url = url + "?idEnfant=" + this.idEnfant + "&idRoutine=" + this.idRoutine + "&nbrMedaillesAValider=" + nbrMedaillesAValider;
        var jqxhr = $.ajax( {
        url: url,
        dataType: "json",
        async: false,
        context: this
        })
        .done(function(msg) {
            this.prenom = msg.prenom;
            this.nbrEtoilesAValider = msg.nbrEtoilesAValider;
            succesAjax = true;
        })
        .fail(function(msg) {
            console.log(msg);
            console.log( "error " + msg.responseJSON.messageErreur);
            alert(msg.responseJSON.messageErreur);
            succesAjax = false;
         })
         return succesAjax;
    }

    this.resetMedailles = resetMedailles;
    function resetMedailles(nbrMedailles, nbrMedaillesAValider) {
        this.nbrMedailles = nbrMedailles;
        this.nbrMedaillesAValider = nbrMedaillesAValider;
    }

    this.majEtoilesMedailles = majEtoilesMedailles;
    function majEtoilesMedailles(url, nbrEtoiles, nbrMedailles) {
        // Ajax
        var succesAjax = false;
        url = url + "?idEnfant=" + this.idEnfant + "&idRoutine=" + this.idRoutine +
            "&nbrMedailles=" + nbrMedailles +
            "&nbrEtoiles=" + nbrEtoiles;
        var jqxhr = $.ajax( {
            url: url,
            dataType: "json",
            async: false,
            context: this
        })
        .done(function(msg) {
            this.nbrEtoiles = msg.nbrEtoiles;
            this.nbrMedailles = msg.nbrMedailles;
            succesAjax = true;
        })
        .fail(function(msg) {
            console.log(msg);
            console.log( "error " + msg.responseJSON.messageErreur);
            alert(msg.responseJSON.messageErreur);
            succesAjax = false;
        })
        return succesAjax;
    }

}
