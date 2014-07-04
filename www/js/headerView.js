function HeaderView(famille) {
    this.famille = famille;

    this.affichageInitial = affichageInitial;
    function affichageInitial(tableauBord)
    {
        $("#familleNom").text(famille.getNom());
    }


}
