import {
  getHorseCoat,
  insertImgIntoHorseName,
  isPurebred,
  waitForElement
} from "utils/scripts/gen_functs"
import { Translate } from "utils/scripts/scrapeTranslations"

import { getData, setData } from "~chrome_store"
import { type CoatRarityCache, getSetting } from "~settingsObtainer"

export async function getCoatRarity() {
  const charDiv = await waitForElement("#characteristics-body-content")
  let coat = getHorseCoat(document)
  const raceLink = $(charDiv).find(`a[href*="dossiers/race"]`).first()
  let horsePageHref = ""
  if (raceLink && raceLink.length > 0) {
    horsePageHref = raceLink.attr("href")
  }

  const coatTable = await fetchCoatRarity(horsePageHref)
  // Start at the table of coat colors
  coat = coat?.trim()
  return coatTable[coat]
}

export async function insertCoatRarity() {
  const isDisplayItemsAtTopEnabled = await getSetting("horseNameIconsEnabled")
  if (!isDisplayItemsAtTopEnabled) {
    return
  }

  const coatRarity = await getCoatRarity()
  const charDiv = await waitForElement("#characteristics-body-content")
  if (coatRarity && coatRarity !== 0) {
    addCoatRarityNextToCoat(coatRarity, charDiv)
    makeSpanForName(coatRarity)
  }
}

export async function fetchCoatRarity(href) {
  if (!href) {
    return {}
  }
  const cache: CoatRarityCache = await getCoatRarityCache()
  if (
    cache &&
    cache[href] &&
    typeof cache[href] === "object" &&
    Object.keys(cache[href]).length > 0
  ) {
    // Do something?
  } else {
    let page: Response | string = await fetch(href)
    page = await page.text()

    const jqPage = await $(page)
    const table = $(jqPage).find("#table-0")
    let prevCoat = undefined
    const coatTab = {}
    const tdData = table.find("td")
    for (const dat of tdData.children()) {
      let text = dat.innerText
      if (text) {
        text = text.replace(/%/gm, "")
        text = text.trim()
        const textAsNum = parseInt(text)
        if (textAsNum && textAsNum > 0) {
          coatTab[prevCoat] = textAsNum
        } else {
          prevCoat = text
        }
      }
    }
    cache[href] = coatTab
    setCoatRarityCache(cache)
  }

  return cache[href]
}

export async function getCoatRarityCache() {
  let coatRarityCache = await getData("coatRarityCache", "local")
  if (!coatRarityCache || typeof coatRarityCache !== "object") {
    coatRarityCache = {}
  }
  return coatRarityCache
}

export async function setCoatRarityCache(coatRarityCache) {
  if (!coatRarityCache || typeof coatRarityCache !== "object") {
    return
  }
  await setData("coatRarityCache", coatRarityCache, "local")
}

export async function makeSpanForName(rarity) {
  const isP = await isPurebred()
  if (rarity >= 10 || !isP) {
    return
  }
  const newSpan = document.createElement("span")
  newSpan.style.fontWeight = "bold"
  newSpan.style.fontStyle = "italic"
  newSpan.style.color = "#118434"
  newSpan.style.fontFamily = "Comic Sans MS"
  newSpan.style.padding = "0px"
  newSpan.innerHTML = rarity + "%"
  insertImgIntoHorseName(newSpan)
}

export function addCoatRarityNextToCoat(coatRarity, charDiv) {
  const coatLbl = $(charDiv).find(
    `td:contains('${Translate("Coat", window.location.host)}')`
  )
  if (coatLbl && coatLbl.length > 0) {
    const prevText = $(coatLbl[0]).html()
    $(coatLbl[0]).html(prevText + (", " + coatRarity + "%"))
  }
}
