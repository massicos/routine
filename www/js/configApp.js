function ConfigApp(niveau) {
    this.niveau = niveau;
    
    this.getSuffixeCheminpParNiveau = getSuffixeCheminpParNiveau;
    function getSuffixeCheminpParNiveau()
    {
        if (this.niveau != "prod") {
            return "-" +  this.niveau;
        }
        return "";
    }    
}


