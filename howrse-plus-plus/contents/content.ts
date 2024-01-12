/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PlasmoCSConfig } from "plasmo"

import {
  addQuickEditBtnToTop,
  displayItemsAtTop,
  distribute_skill_markers
} from "~utils/scripts/gen_functs"
import { insertCoatRarity } from "~utils/scripts/pages/coat_section"
import { chooseSampleName } from "~utils/scripts/pages/new_foal"
import { addSellButtonToTop } from "~utils/scripts/pages/sell_horse"

declare global {
  interface Window {
    chevalSexe: any
    enduranceGenetique: any
    vitesseGenetique: any
    dressageGenetique: any
    galopGenetique: any
    trotGenetique: any
    sautGenetique: any
    enduranceComplet: any
    vitesseComplet: any
    dressageComplet: any
    galopComplet: any
    trotComplet: any
    sautComplet: any
    chevalNom: any
  }
}

export const config: PlasmoCSConfig = {
  matches: [
    "https://us.howrse.com/elevage/chevaux/cheval*",
    "https://us.howrse.com/elevage/chevaux/?elevage*",
    "https://us.howrse.com/elevage/chevaux/centreInscription*",
    "https://us.howrse.com/elevage/competition/*",
    "https://us.howrse.com/elevage/chevaux/choisirNoms*",
    "https://us.howrse.com/marche/vente/vendre?*",
    "https://us.howrse.com/elevage/fiche*",
    "https://us.howrse.com/elevage/chevaux/rechercherMale*",
    "https://us.howrse.com/centre/pres*",
    "https://us.howrse.com/marche/vente*",
    "https://us.howrse.com/marche%2Fvente%2F*",
    "https://us.howrse.com/marche/echange*",
    "https://www.caballow.com/elevage/chevaux/cheval*",
    "https://www.caballow.com/elevage/chevaux/?elevage*",
    "https://www.caballow.com/elevage/chevaux/centreInscription*",
    "https://www.caballow.com/elevage/competition/*",
    "https://www.caballow.com/elevage/chevaux/choisirNoms*",
    "https://www.caballow.com/marche/vente/vendre?*",
    "https://www.caballow.com/elevage/fiche*",
    "https://www.caballow.com/elevage/chevaux/rechercherMale*",
    "https://www.caballow.com/centre/pres*",
    "https://www.caballow.com/marche/vente*",
    "https://www.caballow.com/marche%2Fvente%2F*",
    "https://www.caballow.com/marche/echange*",
    "https://www.howrse.com/elevage/chevaux/cheval*",
    "https://www.howrse.com/elevage/chevaux/?elevage*",
    "https://www.howrse.com/elevage/chevaux/centreInscription*",
    "https://www.howrse.com/elevage/competition/*",
    "https://www.howrse.com/elevage/chevaux/choisirNoms*",
    "https://www.howrse.com/marche/vente/vendre?*",
    "https://www.howrse.com/elevage/fiche*",
    "https://www.howrse.com/elevage/chevaux/rechercherMale*",
    "https://www.howrse.com/centre/pres*",
    "https://www.howrse.com/marche/vente*",
    "https://www.howrse.com/marche%2Fvente%2F*",
    "https://www.howrse.com/joueur/collection/*",
    "https://www.howrse.com/marche/echange*"
  ]
}

const winPath = window.location.pathname
console.log(winPath)
if (winPath) {
  if (winPath.includes("elevage/chevaux/cheval")) {
    console.log("Inside case ", "elevage/chevaux/cheval")
    displayItemsAtTop()
    addSellButtonToTop()
    addQuickEditBtnToTop()
    insertCoatRarity()
    distribute_skill_markers()
    console.log("Done inside case ", "elevage/chevaux/cheval")
  } else if (winPath.includes("/chevaux/choisirNoms")) {
    // New foal page
    console.log("Inside case ", "/chevaux/choisirNoms")
    chooseSampleName()
  } else if (winPath.includes("/elevage/fiche")) {
    console.log("Inside case ", "/elevage/fiche")
    displayItemsAtTop()
    insertCoatRarity()
    console.log("Done inside case ", "/elevage/fiche")
  } else if (winPath.includes("/marche/vente/voir")) {
    console.log("Inside case ", "/marche/vente/voir")
    displayItemsAtTop()
    insertCoatRarity()
    console.log("Done inside case ", "/marche/vente/voir")
  }
}
