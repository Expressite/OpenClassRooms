const original = [
    {name: "Pierre", age:18},
    {name: "Eric", age:44},
    {name: "Valérie", age:32},
    {name: "Nicole", age:29},
    {name: "François", age:25},
];

/*
Ici le tabeau original va être réduit grâce à un filtre appliqué à chaque élément du tableau
La fonction exécute une boucle implicite sur chaque élément
Les éléments éligibles sont conservés dans un accumulateur (variable acc)
La fonction admet comme paramètre une fonction de filtrage acceptant elle-même deux paramètres : 
- l'accumulateur (tableau résultant)
- variable permettant de boucler sur chaque élément du tableau
*/
const reduced30 = original.reduce(
    (acc, people) =>
        people.age < 31 ? acc.concat(people) : acc,
    []
)

//on peut aussi l'écrire de façon plus classique :
function filter40(acc, el){
    if(el.age > 40){
        acc.push(el);
    }
    return acc;
}

//appel de la fonction de filtrage en donnant un tableau vide comme valeur initiale
const reduced40 = original.reduce(filter40, []);

fillElement("originalArray", original);
fillElement("reducedArray30", reduced30);
fillElement("reducedArray40", reduced40);

function fillElement(el, array){
    listToDisplay = array.map(el => `<li>${el.name} (${el.age})</li>`);
    listToDisplay = `<ul>${listToDisplay.join("")}</ul>`;
    document.getElementById(el).innerHTML = listToDisplay;
}