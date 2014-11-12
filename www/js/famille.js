function Famille(nom, montantParEtoile, montantParSuccesComplet)
{
    this.nom = nom;
    this.montantParEtoile = montantParEtoile;
    this.montantParSuccesComplet = montantParSuccesComplet;
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

    this.getMontantParSuccesComplet = getMontantParSuccesComplet;
    function getMontantParSuccesComplet()
    {
        return this.montantParSuccesComplet;
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
}
