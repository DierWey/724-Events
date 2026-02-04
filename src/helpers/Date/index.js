export const MONTHS = {
  1: "janvier",
  2: "février",
  3: "mars",
  4: "avril",
  5: "mai",
  6: "juin",
  7: "juillet",
  8: "août",
  9: "septembre",
  10: "octobre",
  11: "novembre",
  12: "décembre",
};

// export const getMonth = (date) => MONTHS[date.getMonth()]; // Renvoie le numéro du mois actuel -1
/* la constante getMonth est une fonction qui prend date en argument et est censée renvoyer le nom 
français de ce mois grâce à l'objet MONTHS et à la méthode date.getMonth() */
/* La méthode date.getMonth() retourne le mois d'une date (De 0 à 11 où January=0, February=1 etc.)
Donc, getMonth()+1 pour avoir les mois de 1 à 12 comme l'Array MONTHS */

export const getMonth = (date) => MONTHS[date.getMonth()+1];

