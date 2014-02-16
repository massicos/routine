function Routine(prenom)
{
    this.prenom = prenom;
    this.photo = false;
    this.dateFin = false;
    this.itemsRoutine = new Array();

    this.getPrenom = getPrenom;
    function getPrenom()
    {
        return this.prenom;
    }

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

    	return (this.dateFin - dateComparaison) / 1000;
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

}