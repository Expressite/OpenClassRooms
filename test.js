for (i = 1; i <= 10; i++) {
  c = carre(i);
  console.log("le carré de " + i + " est " + c);
}

function carre(v) {
  resultat = v * v;
  return resultat;
}
