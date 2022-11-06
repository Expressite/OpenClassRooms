//on peut définir une facture ainsi :
facture1ligne1 = {article: 'écran', qte: 1, prix:200};
facture1ligne2 = {article: 'clavier', qte: 2, prix:15};
facture1 = {client:'Dupont Laurent', adresse:'3 route des cygnes, 74000 Annecy', articles: [facture1ligne1, facture1ligne2]};

//ou plus condensé, comme ça :
facture2 = {client:'Leroi Valérie', adresse:'5 route des lions, 74000 Annecy', articles: [{article: 'clavier', qte: 4, prix:45}, {article: 'écran', qte: 1, prix:200}]};

//toutes les factures dans un tableau
toutesLesFactures = [facture1, facture2]

//parcourir toutes les factures avec un for
var container = document.getElementById("container");
//afficher tous les clients
var title = document.createElement("h1");
title.innerHTML = "Liste des clients";
container.appendChild(title);

for(i=0; i<toutesLesFactures.length;i++){
    var client = document.createElement("p");
    client.innerHTML = toutesLesFactures[i].client;    
    container.appendChild(client);    
}

//afficher toutes les lignes de factures du premier client :
var titleClient = document.createElement("h1");
titleClient.innerHTML = "Détail de la facture de " + toutesLesFactures[0].client;
container.appendChild(titleClient);
totalFacture = 0;
for(i=0; i<toutesLesFactures[0].articles.length; i++){
    var uneLigneDefacture = document.createElement("p");
    prixTotalArticle = toutesLesFactures[0].articles[i].qte  * toutesLesFactures[0].articles[i].prix;
    totalFacture = totalFacture + prixTotalArticle; //on ajoute le prix total de l'article au total de la facture
    uneLigneDefacture.innerHTML = "Article : " + toutesLesFactures[0].articles[i].article + " Quantité : " + toutesLesFactures[0].articles[i].qte + " Prix : " + toutesLesFactures[0].articles[i].prix + " Total article : " + prixTotalArticle;
    container.appendChild(uneLigneDefacture);    
}
totalFactureClient = document.createElement("h3");
totalFactureClient.innerHTML = "Total de la facture : " + totalFacture;
container.appendChild(totalFactureClient); 


//maintenant la même chose mais pour tous les clients
var titleDetailTousClients = document.createElement("h1");
titleDetailTousClients.innerHTML = "Détail des factures de tous les clients";
container.appendChild(titleDetailTousClients);

for(i=0; i<toutesLesFactures.length;i++){
    var titleClient = document.createElement("h2");
    titleClient.innerHTML = "Détail de la facture de " + toutesLesFactures[0].client;
    container.appendChild(titleClient);    

    totalFacture = 0;
    for(j=0; j<toutesLesFactures[i].articles.length; j++){
        var uneLigneDefacture = document.createElement("p");
        prixTotalArticle = toutesLesFactures[i].articles[j].qte  * toutesLesFactures[i].articles[j].prix;
        totalFacture = totalFacture + prixTotalArticle; //on ajoute le prix total de l'article au total de la facture
        uneLigneDefacture.innerHTML = "Article : " + toutesLesFactures[i].articles[j].article + " Quantité : " + toutesLesFactures[i].articles[j].qte + " Prix : " + toutesLesFactures[i].articles[j].prix + " Total article : " + prixTotalArticle;
        container.appendChild(uneLigneDefacture);    
    }
    totalFactureClient = document.createElement("h3");
    totalFactureClient.innerHTML = "Total de la facture : " + totalFacture;
    container.appendChild(totalFactureClient); 
}

//maintenant la même chose mais on accorde une réduction si le total de la facture est > à 200
var titleDetailTousClients = document.createElement("h1");
titleDetailTousClients.innerHTML = "Détail des factures de tous les clients avec réduction de 10%";
container.appendChild(titleDetailTousClients);

for(i=0; i<toutesLesFactures.length;i++){
    var titleClient = document.createElement("h2");
    titleClient.innerHTML = "Détail de la facture de " + toutesLesFactures[0].client;
    container.appendChild(titleClient);    

    totalFacture = 0;
    for(j=0; j<toutesLesFactures[i].articles.length; j++){
        var uneLigneDefacture = document.createElement("p");
        prixTotalArticle = toutesLesFactures[i].articles[j].qte  * toutesLesFactures[i].articles[j].prix;
        totalFacture = totalFacture + prixTotalArticle; //on ajoute le prix total de l'article au total de la facture
        uneLigneDefacture.innerHTML = "Article : " + toutesLesFactures[i].articles[j].article + " Quantité : " + toutesLesFactures[i].articles[j].qte + " Prix : " + toutesLesFactures[i].articles[j].prix + " Total article : " + prixTotalArticle;
        container.appendChild(uneLigneDefacture);    
    }
    totalFactureClient = document.createElement("h3");
    totalFactureClient.innerHTML = "Total de la facture : " + totalFacture;
    container.appendChild(totalFactureClient); 
    if(totalFacture > 200){
        mtReduction = totalFacture * 0.1;
        netAPayer = totalFacture - mtReduction;
        reduction = document.createElement("p");
        reduction.innerHTML = "Reduction 10% : " + mtReduction;
        container.appendChild(reduction);    

        net = document.createElement("h3");
        net.innerHTML = "Net à payer : " + netAPayer;
        container.appendChild(net);    
    }
}