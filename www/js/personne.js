function Personne(prenom)
{
    this.prenom = prenom;
    //this.dateDebutItemRoutine = null;
    this.dateFinItemRoutine = false;
    this.dateFinRoutine = false;

    this.getPrenom = getPrenom;
    function getPrenom()
    {
        return this.prenom;
    }

    this.getDateFinRoutine = getDateFinRoutine;
    function getDateFinRoutine()
    {
        return this.dateFinRoutine;
    }

    this.setDateFinRoutine = setDateFinRoutine;
    function setDateFinRoutine(dateFinRoutine)
    {
        this.dateFinRoutine = dateFinRoutine;
    }

    this.getTempsJeuxMinutes = getTempsJeuxMinutes;
    function getTempsJeuxMinutes()
    {
        return this.dateFinRoutine;
    }

    this.setDateFinItemRoutine = setDateFinItemRoutine;
    function setDateFinItemRoutine(dateDebutItemRoutine)
    {
        this.dateFinItemRoutine = dateDebutItemRoutine;
    }

    this.getDateFinItemRoutine = getDateFinItemRoutine;
    function getDateFinItemRoutine()
    {
        return this.dateFinItemRoutine;
    }

    this.getSecondeItemRoutine = getSecondeItemRoutine;
    function getSecondeItemRoutine(dateComparaison, tempsRoutineItem)
    {
        var secondes = (this.dateFinItemRoutine.getTime() - dateComparaison.getTime()) / 1000;
        var secondesAffichage = tempsRoutineItem - parseInt(secondes);
        if (secondesAffichage < 0) {
            return 0;
        }
        return secondesAffichage;
    }

}