//var STATUT = new Array("En attente", "En cours", "Fini");
var statuts = {ATTENTE: 0, EN_COURS: 1, PAUSE: 2, FINI_SUCCES: 3, FINI_ECHEC: 4};

function ItemRoutine(texte, cheminImage, tempsMinutes, nbrEtoiles)
{
    this.texte = texte;
    this.cheminImage = cheminImage;
    this.tempsMinutes = tempsMinutes;
    this.nbrEtoiles = nbrEtoiles;
    this.dateFin = null;
    this.statut = statuts.ATTENTE;

    this.getTexte = getTexte;
    function getTexte()
    {
        return this.texte;
    }

    this.getCheminImage = getCheminImage;
    function getCheminImage()
    {
        return this.cheminImage;
    }

    this.getTempsMinutes = getTempsMinutes;
    function getTempsMinutes()
    {
        return this.tempsMinutes;
    }

    this.getTempsSecondes = getTempsSecondes;
    function getTempsSecondes()
    {
        return this.tempsMinutes * 60;
    }

    this.getNbrEtoiles = getNbrEtoiles;
    function getNbrEtoiles()
    {
        return this.nbrEtoiles;
    }

    this.setDateFin = setDateFin;
    function setDateFin(dateFin)
    {
        this.dateFin = dateFin;
    }

    this.getDateFin = getDateFin;
    function getDateFin()
    {
        return this.dateFin;
    }

    this.getDateDebut = getDateDebut;
    function getDateDebut()
    {
        return this.dateDebut;
    }

    this.getStatut = getStatut;
    function getStatut()
    {
        return this.statut;
    }
    
    this.setStatut = setStatut;
    function setStatut(statut)
    {
        this.statut = statut;
    }    

    this.debuter = debuter;
    function debuter(dateDebut)
    {
        this.dateDebut = dateDebut;
        this.dateFin = new Date(dateDebut.getTime());
        this.dateFin.setMinutes(this.dateFin.getMinutes() + this.tempsMinutes);

        this.statut = statuts.EN_COURS;
    }

    this.reprendre = reprendre;
    function reprendre(dateDebut, secondesEcoulees)
    {
       console.log("secondesProgressBar " + secondesEcoulees);
       console.log("dateDebut avant = " +  this.dateDebut);
       this.dateDebut = dateDebut;
       this.dateDebut.setSeconds(this.dateDebut.getSeconds() - secondesEcoulees);
       console.log("dateDebut = " +  this.dateDebut);
       this.dateFin = new Date(dateDebut.getTime());
       this.dateFin.setMinutes(this.dateFin.getMinutes() + this.tempsMinutes);
       console.log("dateFin = " +  this.dateFin);

       this.statut = statuts.EN_COURS;
    }
    

    this.getSecondesEcoulees = getSecondesEcoulees;
    function getSecondesEcoulees(dateComparaison)
    {
        var secondes = (dateComparaison.getTime() - this.dateDebut.getTime()) / 1000;
        if (secondes < 0) {
            return 0;
        }
       return secondes;
    }    

}
