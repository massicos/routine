function Routine(prenom, nbrEtoilesRecompenseTotal, nbrMedailles, nbrMedaillesAValider, idFamille, idEnfant, idRoutine)
{
    this.prenom = prenom;
    this.photo = false;
    this.dateFin = false;
    this.nbrEtoilesRecompenseTotal = nbrEtoilesRecompenseTotal;
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
    function setDateFin(dateFinRoutine)
    {
        this.dateFin = dateFinRoutine;
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
    	var totalTempsItemsRoutineNonCompletes = this.getTotalTempsItemsRoutineNonCompletes();
    	dateComparaison.setMinutes(dateComparaison.getMinutes() + totalTempsItemsRoutineNonCompletes);

    	var tempsLibre = (this.dateFin - dateComparaison) / 1000;
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

    this.getNbrEtoiles = getNbrEtoiles;
    function getNbrEtoiles()
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
    
    this.getNbrEtoilesRecompenseTotal = getNbrEtoilesRecompenseTotal;
    function getNbrEtoilesRecompenseTotal() {
        return this.nbrEtoilesRecompenseTotal;
    }

    this.getNbrMedailles = getNbrMedailles;
    function getNbrMedailles() {
        return this.nbrMedailles;
    }
    
    this.getNbrMedaillesAValider = getNbrMedaillesAValider;
    function getNbrMedaillesAValider() {
        return this.nbrMedaillesAValider;
    }

    this.addNbrEtoilesRecompenseTotal = addNbrEtoilesRecompenseTotal;
    function addNbrEtoilesRecompenseTotal(nbrEtoiles) {
        this.nbrEtoilesRecompenseTotal = this.nbrEtoilesRecompenseTotal + nbrEtoiles;
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
		this.nbrEtoilesRecompenseTotal = msg.nbrEtoilesRecompenseTotal;
		this.nbrMedailles = msg.nbrMedailles;
        this.nbrMedaillesAValider = msg.nbrMedaillesAValider;
	        console.log( "success " +  this.prenom + " " + this.nbrEtoilesRecompenseTotal);
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

   this.sauvegarderNbrEtoilesRecompenseTotal = sauvegarderNbrEtoilesRecompenseTotal;
   function sauvegarderNbrEtoilesRecompenseTotal(url, nbrEtoiles) {

        url = url + "?idFamille=" + this.idFamille + "&idEnfant=" + this.idEnfant + "&idRoutine=" + this.idRoutine + "&nbrEtoiles=" + nbrEtoiles;
        var jqxhr = $.ajax( {
		url: url,
		dataType: "json",
		async: false,
		context: this
	    })
            .done(function(msg) {
		this.prenom = msg.prenom;
		this.nbrEtoilesRecompenseTotal = msg.nbrEtoilesRecompenseTotal;
	        console.log( "success " +  this.prenom + " " + this.nbrEtoilesRecompenseTotal);
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
}
