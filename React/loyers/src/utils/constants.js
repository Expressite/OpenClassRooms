//dev
export const API_URL = "http://localhost:8000/api/";
//test en accès local au serveur
//export const API_URL = "http://192.168.0.196:8000/api/";
//prod
//export const API_URL = "http://88.162.30.84:49158/api/";

export const RENT_STATUS_PAID = "PAID";
export const RENT_STATUS_UNPAID = "UNPAID";
export const rentStatusValues = {
  PAID: "Payé",
  UNPAID: "Impayé",
};
export const mailTitle = "Quittance de loyer";
export const mailBody =
  "Bonjour,%0D%0A%0D%0AVoici la quittance de loyer du mois de %month pour le bien situé au : %0D%0A%0D%0A %appStreet %0D%0A %appStair %0D%0A %appZipCode %appCity %0D%0A%0D%0A Cliquez sur ce lien pour télécharger la quittance : %link %0D%0A%0D%0A Cordialement,%0D%0A%0D%0A Mathias et Vincent Garand";
