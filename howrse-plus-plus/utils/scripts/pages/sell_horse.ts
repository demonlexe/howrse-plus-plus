import {
  getHorseIdFromHorsePage,
  waitForElement
} from "utils/scripts/gen_functs"

import { getSetting } from "~settingsObtainer"

export async function addSellButtonToTop() {
  const [extraHorseButtonsEnabled] = await Promise.all([
    getSetting("extraHorseButtonsEnabled")
  ])
  if (!extraHorseButtonsEnabled) {
    return
  }

  waitForElement("#widget--1").then((elem) => {
    const newDiv = `<div style="    
        display: block;
        position: absolute;
        right: 30px;
        top: 9px;
        width: 32px;
        height: 32px;
        z-index: 106;
        cursor: pointer;
        border-radius: 5px 5px 0 0;"><button type="button" style="color:white;" class="button button-style-14" data-anim="0" id="sell-button"><span>$</span></button></div>`
    $(elem)?.parent()?.parent()?.parent()?.prepend(newDiv)
    // console.log("Added newDiv.")
  })
  waitForElement("#sell-button").then((elem) => {
    $(elem).on("click", async () => {
      const horseId = await getHorseIdFromHorsePage()
      if (!horseId) return
      window.location.href = "/marche/vente/vendre?id=" + horseId
    })
  })
}
