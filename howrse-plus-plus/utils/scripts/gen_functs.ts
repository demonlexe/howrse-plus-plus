/* eslint-disable @typescript-eslint/no-explicit-any */

import { Translate } from "utils/scripts/scrapeTranslations"

import { getData, setData } from "~chrome_store"
import { type SpecialtyContext, getSetting } from "~settingsObtainer"
import { getCoatRarity } from "~utils/scripts/pages/coat_section"

export const competitions = {
  barrel: ["sp", "st", "ga"],
  cutting: ["st", "dr", "sp"],
  trailClass: ["dr", "tr", "ju"],
  reining: ["ga", "dr", "st"],
  westernPleasure: ["tr", "st", "dr"],
  trot: ["tr", "sp", "dr"],
  galop: ["ga", "sp", "dr"],
  gallop: ["ga", "sp", "dr"],
  dressage: ["dr", "tr", "ga"],
  cross: ["st", "dr", "ju"],
  cso: ["ju", "dr", "sp"]
}
export const classificationsOfComps = {
  barrel: "western",
  cutting: "western",
  trailClass: "western",
  reining: "western",
  westernPleasure: "western",
  trot: "classical",
  galop: "classical",
  gallop: "classical",
  dressage: "classical",
  cross: "classical",
  cso: "classical"
}

export async function fetchHorsePage(id: string) {
  if (!id) return undefined
  const inputHref = "elevage/chevaux/cheval?id=" + id
  const response = await fetch(inputHref)
  if (response) {
    const text = await response.text()
    const textParsedAsJQ = await $(text)
    return textParsedAsJQ
  }
  return undefined
}

export function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function waitForElement(
  selector,
  customDom?: Document
): Promise<HTMLElement> {
  if (customDom) {
    return new Promise((resolve) => {
      if (customDom.querySelector(selector)) {
        return resolve(customDom.querySelector(selector))
      }

      const observer = new MutationObserver(() => {
        if (customDom.querySelector(selector)) {
          resolve(customDom.querySelector(selector))
          observer.disconnect()
        }
      })

      observer.observe(customDom.body, {
        childList: true,
        subtree: true
      })
    })
  }
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector))
    }

    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector))
        observer.disconnect()
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true
    })
  })
}

export function checkForAscOrDesc(aElement) {
  const firstA_img = $(aElement).find("img")
  if (firstA_img && firstA_img[0]) {
    const firstA_img_src = $(firstA_img).attr("src")
    if (firstA_img_src && firstA_img_src.includes("desc")) {
      return true
    } else if (firstA_img_src && firstA_img_src.includes("asc")) {
      return false
    }
  }
  return null
}

export function getPlayerUsername() {
  const profSpan = $(`#header a[href*="/joueur/fiche/"] span`)
  return profSpan?.text()
}

export function getHorseBreed(optDom?) {
  const selector = "#characteristics-body-content a[href*='/dossiers/race?']"
  if (optDom) {
    return $(optDom).find(selector)?.html()?.replace(/ /g, "") ?? null
  }
  return $(selector)?.html()?.replace(/ /g, "") ?? null
}

const companionOverride = {
  "compagnon-chevre-off": "compagnon-chevre"
}
export function getCompanion(optDom?: Document | JQuery<Document>): string {
  let companionBlock = optDom
    ? $(optDom).find("#compagnonBoite")
    : $("#compagnonBoite")
  if (!companionBlock || companionBlock.length <= 0) {
    companionBlock = optDom ? $(optDom).find("#compagnon") : $("#compagnon")
  }
  if (companionBlock && companionBlock.length > 0) {
    const src = companionBlock.find(`img[src*='produits']`).first().attr("src")
    const regex = /.+\/(.+)_(.+).png/gi.exec(src)
    if (regex && regex[1] && regex[1].length > 0) {
      return companionOverride[regex[1]] ?? regex[1].replace(/-off$/, "")
    }
  }
  return ""
}

export function getBMIAliases() {
  return {
    // achilles: "talon-achille", // NOT WORKING RIGHT NOW
    apollos: "lyre-apollon",
    arms: "bras-morphee",
    artemis: "fleche-artemis",
    bookMonsters: "livre-monstres",
    stone: "pierre-philosophale",
    // croesus: "pactole-cresus", // NOT WORKING RIGHT NOW
    fifth: "5th-element",
    "vintage apple": "pomme-vintage",
    "gold apple": "pomme-or_",
    "retired apple": "pomme-or-hidden",
    helios: "rayon-helios",
    // heliosow: "rayon-helios-ow", // NOT WORKING RIGHT NOW
    hera: "pack-hera",
    hestia: "don-hestia",
    // hypnos: "couverture-hypnos",  // NOT WORKING RIGHT NOW
    magichat: "chapeau-magique",
    medallion: "double-face",
    // medusa: "sang-meduse", // NOT WORKING RIGHT NOW
    nyx: "pack-nyx",
    // parchment: "parchemin-ploutos",  // NOT WORKING RIGHT NOW
    poseidon: "pack-poseidon",
    witchPotion: "coats-bundle-witch",
    philotes: "caresse-philotes",
    pumpkin: "citrouille-ensorcelee",
    poc: "fragment",
    sota: "sceau-apocalypse",
    timer: "sablier-chronos",
    woy: "eau-jouvence",
    elves: "pack-xmas-gear-2",
    trailDiary: "trail-riding-diary",
    hauntedDiary: "haunted-trail-riding-diary",
    greekDiary: "greek-trail-riding-diary",
    catBrooch: "catrina-brooch",
    wanderers: "esprit-nomade",
    diaApple: "diamond-apple",
    iris: "iris-coat",
    buttonBraid: "button-braided-mane",
    tailBraid1: "tail-braid-1",
    tailBraid2: "tail-braid-2",
    customClip: "clipping",
    paradeApple: "parade-apple",
    ink: "alexandre-dumas-inkwell"
  }
}

export function getAllBMIs(page?: Document | JQuery<Document>) {
  const names = getBMIAliases()
  const content = page
    ? $(page).find("#objects-body-content")
    : $("#objects-body-content")
  for (const item in names) {
    names[item] =
      content.find("img[src*='" + names[item] + "']").length > 0 ? 1 : 2
  }
  return names
}

export function hasBMI(alias) {
  const names = getBMIAliases()
  const nameToFind =
    names[alias] !== undefined && names[alias] !== null ? names[alias] : alias
  return (
    $("#objects-body-content").find("img[src*='" + nameToFind.trim() + "']")
      .length > 0
  )
}

export function checkIfHasHypnos() {
  return hasBMI("hypnos")
}

export function checkIfGroomed(dom: Document | JQuery<Document>) {
  const btn = $(dom).find(
    "#boutonPanser.action.action-style-4.panser.action-disabled"
  )
  return btn.length > 0
}

export function checkIfHasHeel() {
  return hasBMI("/talon-achille_") // RAW
}

export function legacy_HorseEnergy() {
  const currentEnergy = document.getElementById("energie").innerText
  return currentEnergy ? currentEnergy : 0
}

export function getHorseBestSpecialty() {
  const genetics = legacy_HorseGenetics()
  const tops = getTopThreeSkills(genetics)
  const bestComp = pickBestComp(tops)
  const classification: "western" | "classical" | undefined | null =
    classificationsOfComps[bestComp]
  return classification !== undefined && classification !== null
    ? classification
    : "not-found"
}

export async function distribute_skill_markers() {
  const genetics = legacy_HorseGenetics()
  const tops = getTopThreeSkills(genetics)
  let bestComp = pickBestComp(tops)
  const classification = classificationsOfComps[bestComp]
  // console.log("All beginning vars are ", genetics, tops, bestComp, classification)

  let mode = null
  if ($("#competition-body-content h3:contains('specialty')").length > 0) {
    // console.log("On speciality page. ", $("#competition-body-content h3:contains('specialty')"));
    mode = "speciality"
  }

  switch (mode) {
    case "speciality":
      if (classification?.match(/class/gi)) {
        const div = $(
          `#competition-body-content span:contains('${Translate(
            "Classical",
            window.location.host
          )}')`
        ).first()
        const divAsHtml = div.html() ?? ""
        if (!divAsHtml.match("<strong>")) {
          div?.wrapInner("<strong />")
        }
      } else {
        const div = $(
          `#competition-body-content span:contains('${Translate(
            "Western",
            window.location.host
          )}')`
        ).first()
        const divAsHtml = div.html() ?? ""
        if (!divAsHtml.match("<strong>")) {
          div?.wrapInner("<strong />")
        }
      }
      break
    default:
      if (bestComp) {
        $("#competition-body-content a.action.action-style-4").each(
          (index, element) => {
            const ref = $(element).attr("href")
            let compType =
              ref && ref.match(/competition=([^&]*)/)?.length > 1
                ? ref.match(/competition=([^&]*)/)[1]
                : $(element).find("span").first().text()
            compType = compType.replace(/\s|-|_/g, "").toLowerCase()
            bestComp = bestComp.replace(/\s|-|_/g, "").toLowerCase()
            console.log("compType is ", compType, "and bestComp is ", bestComp)
            let matches = false
            if (compType && bestComp && compType.match(bestComp)?.length > 0) {
              matches = true
            } else if (compType === "gallop" && bestComp === "galop") {
              matches = true
            } else if (compType === "crosscountry" && bestComp === "cso") {
              matches = true
            }

            if (matches) {
              const divAsHtml = $(element).find("span").html() ?? ""
              if (!divAsHtml.match("<strong>")) {
                $(element).find("span").wrapInner("<strong />")
              }
            }
          }
        )
      }
  }

  const trainingTable = await waitForElement("#training-wrapper")
  const topSkillRow = $(trainingTable)
    ?.find(`td.first.cursor.align-left:contains("${tops[0]["name"]}")`)
    .first()
  // topSkillRow.css('color', '#118434') // to color it green
  topSkillRow?.wrapInner("<strong />")
}

//

// Function logic thanks to CrimsonVex

//
export function legacy_HorseGenetics(customDom?) {
  let table
  if (customDom) {
    table = $(customDom).find("#genetic")
  } else {
    table = $("#genetic")
  }
  if (!table || table.length === 0) {
    return {}
  }

  let prevSkill = undefined
  const geneticsTable = {}
  $(table)
    .find("td")
    .each(function () {
      // console.log("This is ", $(this).text())
      let text = $(this).text()

      if (text) {
        text = text.trim()
        const textAsNum = parseInt(text)
        if (textAsNum && textAsNum > 0) {
          geneticsTable[prevSkill] = textAsNum
        } else {
          prevSkill = text
        }
      }
    })
  return geneticsTable
}

export function getTopThreeSkills(geneticsObj?) {
  if (!geneticsObj) {
    geneticsObj = legacy_HorseGenetics(document)
  }
  const topThreeSkills = [
    { name: null, value: 0 },
    { name: null, value: 0 },
    { name: null, value: 0 }
  ]
  for (const key in geneticsObj) {
    if (Object.hasOwnProperty.call(geneticsObj, key)) {
      const element = geneticsObj[key]
      if (element > topThreeSkills[0].value) {
        topThreeSkills[2] = topThreeSkills[1]
        topThreeSkills[1] = topThreeSkills[0]
        topThreeSkills[0] = { name: key, value: element }
      } else if (element > topThreeSkills[1].value) {
        topThreeSkills[2] = topThreeSkills[1]
        topThreeSkills[1] = { name: key, value: element }
      } else if (element > topThreeSkills[2].value) {
        topThreeSkills[2] = { name: key, value: element }
      }
    }
  }
  return topThreeSkills
}

export function legacy_characteristic(char, optionalDocument?) {
  const div = optionalDocument
    ? $(optionalDocument.find("#characteristics-body-content"))
    : $("#characteristics-body-content")
  const lbl = div.find("td:contains('" + char + "')")
  const txt = lbl[0].innerText
  const final = txt.match(/(?<=:\s).+/gm)[0]
  return final
}

export function legacy_coverings_left(optionalDocument) {
  const age = age_in_months(legacy_characteristic("Age", optionalDocument))
  if (age < 30) {
    return true // The horse is too young to have coverings.
  }
  let div = optionalDocument
    ? $(optionalDocument.find("#reproduction-body-content"))
    : $("#reproduction-body-content")
  if (!div || div.length <= 0) {
    div = optionalDocument
      ? $(optionalDocument.find("#reproductionBoite"))
      : $("#reproductionBoite")
  }
  const lbl = div.find("td:contains('Coverings:')").last()
  const trimmedCovers = lbl?.text()?.replace(new RegExp(/\s+/gm), "")
  let covers: any = trimmedCovers?.match(/(\d+)\/(\d+)/gi)
  if (covers && covers.length > 0 && covers[0]) {
    covers = covers[0].split("/")
    if (covers.length > 1) {
      // We have 2 values to compare.
      if (covers[0] < covers[1]) {
        return true //There are coverings remaining.
      } else {
        return false //There are no coverings left.
      }
    }
  }

  return true
}

export function age_in_months(age) {
  let ageInMonths = 0
  const check = (variable) => {
    if (variable && variable.length > 0 && variable[0]) {
      return true
    }
    return false
  }
  if (age) {
    const trimmedAge = age.replace(new RegExp(/\s+/gm), "")
    let months = trimmedAge.match(/(\d+)months/gi)
    months = check(months) ? months[0].match(/\d+/gi) : 0
    let years = trimmedAge.match(/(\d+)years/gi)
    years = check(years) ? years[0].match(/\d+/gi) : 0

    if (check(months)) {
      months = months[0]
    }
    if (check(years)) {
      years = years[0]
    }
    ageInMonths = parseInt(months) + parseInt(years) * 12
  }
  return ageInMonths
}

export function getVarFromScriptTag(page, name) {
  if (typeof page !== "string") page = page?.html()

  const scriptRegex = /(<script[a-zA-Z0-9='"/ ]*?>)(.|\n)+?(<\/script>)/g
  const scripts = [...page.matchAll(scriptRegex)]
  const foundVar = scripts
    ?.map((x) => x[2]?.replace(/[\t\r\n]+/g, ""))
    ?.find((x) => x.includes(name))
  const varRegex = new RegExp("(" + name + ") ?= ?(.+?);", "g")
  const varValue = [...foundVar.matchAll(varRegex)]?.shift()[2]?.trim()

  if (!isNaN(parseFloat(varValue))) return parseFloat(varValue)
  return varValue
}

export function arrayEquals(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  )
}

export function pickBestComp(topThreeSkills) {
  let bestComp = null
  const keys = []
  topThreeSkills.forEach(function (elem) {
    if (elem && elem.name) {
      keys.push(elem.name)
    }
  })
  const topThreeSkillsNames = formatKeys(keys).sort()
  for (const key in competitions) {
    const compSet = formatKeys(competitions[key]).sort()
    if (arrayEquals(compSet, topThreeSkillsNames)) {
      bestComp = key
      break
    }
  }
  return bestComp
}

export function formatKeys(keys) {
  const formattedKeys = []
  for (const key of keys) {
    formattedKeys.push(key?.substring(0, 2).toLowerCase())
  }
  return formattedKeys
}

export function getHorseSkills(customDom) {
  const o = {
    st: parseFloat(
      customDom
        ? $(customDom).find("#enduranceValeur").text()
        : $("#enduranceValeur").text()
    ),
    sp: parseFloat(
      customDom
        ? $(customDom).find("#vitesseValeur").text()
        : $("#vitesseValeur").text()
    ),
    dr: parseFloat(
      customDom
        ? $(customDom).find("#dressageValeur").text()
        : $("#dressageValeur").text()
    ),
    ga: parseFloat(
      customDom
        ? $(customDom).find("#galopValeur").text()
        : $("#galopValeur").text()
    ),
    tr: parseFloat(
      customDom
        ? $(customDom).find("#trotValeur").text()
        : $("#trotValeur").text()
    ),
    ju: parseFloat(
      customDom
        ? $(customDom).find("#sautValeur").text()
        : $("#sautValeur").text()
    ),
    total: null
  }
  o.total = o.st + o.sp + o.dr + o.ga + o.tr + o.ju
  return o
}

export async function helperWait(time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

export async function legacy_equipHorseECSpeciality(
  customDom?: Document | JQuery<Document>
): Promise<SpecialtyContext> {
  const specialtyFromCompetition = getHorseCompetitionSpecialty(
    customDom !== undefined ? customDom : document,
    true
  )

  return {
    specialty:
      specialtyFromCompetition !== null
        ? specialtyFromCompetition
        : getHorseBestSpecialty()
  }
}

export async function legacy_getBlupValue(customDom) {
  const blupTableRow = $(customDom).find("td.first:contains('BLUP:')")?.parent()
  if (blupTableRow.length > 0) {
    return $(blupTableRow).find("td:last").text()
  }
  return null
}

export function get_HorseTime(customDom) {
  customDom = customDom ? customDom : document
  const timeDiv = $(customDom).find("#hour-body-content")
  const time = timeDiv?.find("span.hour")?.text()

  const hours = time?.replace(/:.+/gi, "") || 0
  const minutes = time?.replace(/.+:/gi, "") || 0
  return parseFloat(hours as string) + parseFloat(minutes as string) / 60
}

export async function getECLocation(customDom?) {
  if (!customDom) {
    customDom = document
  }

  const mountainMarker = $(customDom).find(
    "#center-tab-main a.centerLocalisation.centerLocalisationMontagne"
  )
  const forestMarker = $(customDom).find(
    "#center-tab-main a.centerLocalisation.centerLocalisationForet"
  )
  const beachMarker = $(customDom).find(
    "#center-tab-main a.centerLocalisation.centerLocalisationPlage"
  )
  if (mountainMarker.length > 0) {
    return "mountain"
  } else if (forestMarker.length > 0) {
    return "forest"
  } else if (beachMarker.length > 0) {
    return "beach"
  }
}

export function getSpendableEnergy(energy?: number | string) {
  const energyTot = energy ?? legacy_HorseEnergy()
  const hasHeel = checkIfHasHeel()
  if (!hasHeel) {
    return Number(energyTot) - 19.56
  }
  return Number(energyTot)
}

export function getHorseCoat(page) {
  let coatTxt = $(page)
    .find("#characteristics-body-content")
    .find(`td:contains('${Translate("Coat", window.location.host)}')`)
    .eq(0)
    .text()
  coatTxt = coatTxt.substring(
    0,
    coatTxt.indexOf(",") === -1 ? coatTxt.length : coatTxt.indexOf(",")
  )
  return coatTxt.match(/(?<=:\s).+/gm)?.shift() ?? null
}

export function getHorseCompetitionSpecialty(
  page: Document | JQuery<Document>,
  onlyUnequipped?: boolean
) {
  if (onlyUnequipped) {
    if (
      $(page)
        .find("#competition-body-content")
        .find("a.action.action-style-4.competition-barrel").length !== 0
    ) {
      return "not-found" // fake "not-found", so that we don't try to equip a horse that's already equipped
    } else if (
      $(page)
        .find("#competition-body-content")
        .find("div:contains('Western saddle')").length !== 0
    ) {
      return "western"
    } else if (
      $(page)
        .find("#competition-body-content")
        .find("a.action.action-style-4.competition-dressage").length !== 0
    ) {
      return "not-found" // fake "not-found", so that we don't try to equip a horse that's already equipped
    } else if (
      $(page)
        .find("#competition-body-content")
        .find("div:contains('Classical saddle')").length !== 0
    ) {
      return "classical"
    }
  } else {
    if (
      $(page)
        .find("#competition-body-content")
        .find("a[href*='competition=barrel']").length !== 0 ||
      $(page).find("#competition-body-content").find("div:contains('Western')")
        .length !== 0
    )
      return "western"
    if (
      $(page)
        .find("#competition-body-content")
        .find("a[href*='competition=dressage']").length !== 0 ||
      $(page)
        .find("#competition-body-content")
        .find("div:contains('Classical')")
    )
      return "classical"
  }

  return null
}

export function getHorseActivityMaxHrs(costPerHalfHr) {
  const hrCst = costPerHalfHr ? costPerHalfHr * 2 : 16.2
  const horseEnergy = getSpendableEnergy()
  // console.log("horseEnergy = ", horseEnergy)
  const x = (horseEnergy / hrCst) * 10
  const y = Math.floor(x / 5) * 5
  const walkHrs = y / 10
  return walkHrs
}

export function getHorseAge(page) {
  const pElement = page
    .find('#characteristics-body-content strong:contains("Age:")')
    .parent()
    .text()
  const pMatch = [...pElement.matchAll(/([0-9]+)[ a-zA-Z]+([0-9]*)/g)][0]
  let ageVar = 0
  if (!isNaN(parseInt(pMatch[1])))
    ageVar += (pElement.includes("year") ? 12 : 1) * (parseInt(pMatch[1]) ?? 0)
  if (!isNaN(parseInt(pMatch[2]))) ageVar += parseInt(pMatch[2]) ?? 0
  return ageVar || null
}

export function getHorseSexe(page) {
  const a =
    window.chevalSexe ??
    legacy_characteristic(Translate("Gender", window.location.host), page)
  const g =
    page
      .find("#reproduction-tab-0")
      .find("a.tab-action.saillir")
      .attr("onclick") === null && getHorseAge(page) >= 30
  return a === "feminin" || a === "female" ? "F" : g ? "G" : "M"
}

const renames = {
  // FIXME FOR OTHER TRANSLATIONS
  dr: ["Dressage"],
  sp: ["Speed"],
  st: ["Stamina"],
  ju: ["Jumping"],
  ga: ["Gallop"],
  tr: ["Trot"]
}
export function rename_legacy_HorseGenetics(geneticsTable) {
  const newTable = {}
  Object.keys(geneticsTable).forEach((genKey) => {
    Object.keys(renames).forEach((key) => {
      if (renames[key].includes(genKey)) {
        newTable[key] = geneticsTable[genKey]
      }
    })
  })
  let Total = 0
  Object.keys(newTable).forEach((key) => {
    Total = Total + parseInt(newTable[key])
  })
  return { ...newTable, total: Total }
}

export function getCompetitionWinnabilityScore(competitionKey, horseSkills) {
  // Array of skills should be in the order of: st, sp, dr, ga, tr, ju
  const competition = competitions[competitionKey]

  let score = 0
  if (competition) {
    competition.forEach((skill, index) => {
      if (index === 0) {
        score += horseSkills[skill] * 0.45
      } else if (index === 1) {
        score += horseSkills[skill] * 0.3
      } else if (index === 2) {
        score += horseSkills[skill] * 0.2
      }
    })
  } else {
    score += horseSkills[0] * 0.45

    score += horseSkills[1] * 0.3

    score += horseSkills[2] * 0.2
  }
  return Math.ceil(score)
}

export function getQueryVariable(query, variable) {
  const vars = query.split("&")
  for (const var_ of vars) {
    const pair = var_.split("=")
    if (decodeURIComponent(pair[0]) === variable) {
      return decodeURIComponent(pair[1])
    }
  }
}

export async function fetchCompTypeFromHREF(inputHref) {
  const query = inputHref.match(/(?<=\?).+/gm)[0]
  const type = getQueryVariable(query, "type")
  const competition = getQueryVariable(query, "competition")
  return competition ? competition : type
}

export function checkIfCacheExpired(cacheStruct) {
  if (!cacheStruct) {
    // console.error("Cache expired because cacheStruct did not exist.")
    return true
  }
  const cachedTime = cacheStruct.t
  if (cacheStruct && cachedTime) {
    const now = new Date()
    const diff = (now as any) - cachedTime
    // console.log("Diff is ", diff, " comapred to ", (diff < 1000 * 60 * 3))
    if (diff < 1000 * 60 * 10) {
      // Let timeout be 10 minutes
      // console.log("We have a cached value, using it.")
      return false
    }
  }
  return true
}

export async function fetchCompInfoFromHorseID(
  horseId: string,
  compType: string,
  cachedData
) {
  if (!horseId) {
    return { score: 0, ownedBySelf: false }
  }
  const id = parseInt(horseId)
  const expiredCache = checkIfCacheExpired(cachedData[id])
  // console.log("Returned from checkIfCacheExpired, ans is ", expiredCache, " for id ", id, " and compType ", compType, " and cachedData[id] is ", cachedData[id], " and cachedData[id].t is ", cachedData[id] ? cachedData[id].t : "undefined")
  if (!expiredCache) {
    // console.log("Cache not expired, using previous score for ", cachedData[id])
    return { score: cachedData[id].s, ownedBySelf: cachedData[id].o }
  }
  // Use Cached value if less than 3 minutes between last fetch!

  const inputHref = "elevage/chevaux/cheval?id=" + id
  const response = await fetch(inputHref)
  if (response) {
    const text = await response.text()
    const textParsedAsJQ = await $(text)
    // console.log("Response from fetch is ", text)
    const horseSkills = getHorseSkills(textParsedAsJQ)
    const score = getCompetitionWinnabilityScore(compType, horseSkills)
    const isWanderingHorse = Boolean(
      response.url?.match(/nomade?qName/)?.length
    )
    const isInHeaven = Boolean(
      textParsedAsJQ.find("h1:contains('is now in Heaven')").length
    )
    const horseOwnedBySelf =
      textParsedAsJQ?.length > 0 &&
      textParsedAsJQ.find(
        "a[href*='/elevage/fiche/proprie']:contains('History of Owners')"
      ).length === 0 &&
      !isWanderingHorse &&
      !isInHeaven
    return { score: score, ownedBySelf: horseOwnedBySelf }
  }
  return { score: 0, ownedBySelf: false }
}

export function getHorseGenetics() {
  const o = {
    st: parseFloat(window.enduranceGenetique),
    sp: parseFloat(window.vitesseGenetique),
    dr: parseFloat(window.dressageGenetique),
    ga: parseFloat(window.galopGenetique),
    tr: parseFloat(window.trotGenetique),
    ju: parseFloat(window.sautGenetique),
    total: null
  }
  o.total = o.st + o.sp + o.dr + o.ga + o.tr + o.ju
  return o
}
export function getHorseBoldedSkills() {
  const o = {
    st: window.enduranceComplet,
    sp: window.vitesseComplet,
    dr: window.dressageComplet,
    ga: window.galopComplet,
    tr: window.trotComplet,
    ju: window.sautComplet,
    total: null
  }
  o.total = parseInt(o.st && o.sp && o.dr && o.ga && o.tr && o.ju)
  return o
}

export function getHorseBLUP(page) {
  const blup = page
    .find("#genetic")
    .find("strong:contains('BLUP:')")
    .parents("tr")
    .first()
    .find("td")
    .last()
  return blup.length > 0
    ? parseFloat(blup.text()?.replace(/[^\d.-]+/g, "") || "-100")
    : -100
}

export async function cacheStructIsValid(prevStruct) {
  if (!prevStruct) {
    return false
  }
  const cachedTime = prevStruct.t
  const cachedScore = prevStruct.s
  if (!cachedTime || !cachedScore) {
    return false
  }
  return true
}

export async function getCachedCompHorses(compType) {
  const dataKey = "hrefs_cache_" + compType
  const prevData = await getData(dataKey as any, "local")
  if (!prevData) {
    return {}
  }
  if (Array.isArray(prevData)) {
    return {}
  }

  const parseAttempt =
    typeof prevData === "object" ? prevData : JSON.parse(prevData as any)
  const length = Object.keys(parseAttempt).length
  if (length > 500) {
    return {}
  } else {
    // Parse the data
    return parseAttempt
  }
}

export async function saveCachedCompHorses(compType, hrefs) {
  const dataKey = "hrefs_cache_" + compType
  if (Array.isArray(hrefs)) {
    hrefs = {}
  }
  let finalHash
  if (typeof hrefs === "object") {
    finalHash = hrefs
  } else {
    finalHash = JSON.stringify(hrefs)
  }
  await setData(dataKey as any, finalHash, "local")
  return 1
}

export function shouldDoMission(
  missionButton: JQuery<HTMLElement>,
  energy?: string
) {
  const currentEnergy = getSpendableEnergy(energy && Number(energy))
  const tooltip = $(missionButton).data("tooltip")
  const hasHeel = checkIfHasHeel()
  if (tooltip) {
    const capturedGroups =
      /Energy: <strong dir="ltr">-([.0-9]*)<\/strong>/gi.exec(tooltip)
    // console.log("Group captured", capturedGroups)
    const missionCost =
      capturedGroups && Number(capturedGroups[capturedGroups.length - 1] ?? 0)

    if (!missionCost) {
      return false
    }

    // console.log("Result: ", missionCost)
    const energyAfterMission = currentEnergy - missionCost
    // console.log("Estimated energy after mission is ", energyAfterMission)
    const timeAfterMission = get_HorseTime(document) + 2 // all missions take 2 hrs
    // console.log("Estimated time after mission is ", timeAfterMission)
    if (!hasHeel && (energyAfterMission < 0 || timeAfterMission >= 22)) {
      return false
    } else if (hasHeel && timeAfterMission >= 24 && !checkIfGroomed(document)) {
      // if not have time to groom
      return false
    } else {
      return true
    }
  }
  return false
}

export function waitForElementOtherWindow(otherDoc, selector) {
  return new Promise((resolve) => {
    if (otherDoc.querySelector(selector)) {
      return resolve(otherDoc.querySelector(selector))
    }

    const observer = new MutationObserver(() => {
      if (otherDoc.querySelector(selector)) {
        resolve(otherDoc.querySelector(selector))
        observer.disconnect()
      }
    })

    observer.observe(otherDoc.body, {
      childList: true,
      subtree: true
    })
  })
}

export function insertImgIntoHorseName(newImg) {
  waitForElement("#col-center").then(async (value) => {
    if (newImg) {
      const nameHdr = $(value).find("h1.horse-name")
      if (nameHdr && nameHdr[0]) {
        $(newImg).appendTo($(nameHdr[0]))
        nameHdr[0].style.display = "flex"
        nameHdr[0].style.justifyContent = "center"
        nameHdr[0].style.alignItems = "center"
        nameHdr[0].style.gap = "2px"
        nameHdr[0].style.flexWrap = "wrap"
      }
    }
  })
}

export async function isPurebred(optionalDom?) {
  let ret = false
  const originsDiv = optionalDom
    ? $(optionalDom).find("#origins-body-content")
    : await waitForElement("#origins-body-content")
  const tableRows = $(originsDiv).find("tr")
  if (tableRows && tableRows.length === 4) {
    ret = true
  }

  return ret
}

export async function hasNWins(expectedWins: number, optionalDom?: Document) {
  const winsDiv = optionalDom
    ? $(optionalDom).find("#achievements-0-content")
    : $("#achievements-0-content")
  let winCount = 0
  $(winsDiv)
    .find("tr")
    .each(function (idx, elem) {
      if (idx !== 0) {
        const win = $(elem).find("th")[1]?.innerText
        if (win) {
          winCount +=
            Number(win) && !Number.isNaN(Number(win)) ? Number(win) : 0
        }
      }
    })

  const winsDiv2 = optionalDom
    ? $(optionalDom).find("#achievements-1-content")
    : $("#achievements-1-content")
  if (winsDiv2) {
    $(winsDiv2)
      .find("tr")
      .each(function (idx, elem) {
        if (idx !== 0) {
          const win = $(elem).find("th")[1]?.innerText
          if (win) {
            winCount +=
              Number(win) && !Number.isNaN(Number(win)) ? Number(win) : 0
          }
        }
      })
  }
  return winCount >= expectedWins
}

export function getSpecies(html) {
  const s = html
    .find("#characteristics-body-content strong:contains('Species:')")
    .parent()
    .html()
  return {
    horse: s.includes("Horse"),
    pony: s.includes("Pony"),
    unicorn: s.includes("Unicorn"),
    pegasus: s.includes("Pegasus") || s.includes("Winged U"),
    divine: s.includes("Divine")
  }
}

export function isInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

export function getAllHorseStats(page: JQuery<Document>) {
  if (page === null) return
  return {
    name: (
      window.chevalNom ||
      page.find("#col-center h1.horse-name").find("a").text()
    )?.replace("/</?b>/g", ""),
    affix: (page.find("#affix-body-content a.affixe").html() ?? "").trim(),
    type: "",
    breed: (
      page
        .find("#characteristics-body-content a[href*='/dossiers/race?']")
        .text() ?? ""
    ).trim(),
    species: getSpecies(page),
    coat: getHorseCoat(page),
    race: {
      type: "",
      id: ""
    },
    stats: {
      gp: rename_legacy_HorseGenetics(legacy_HorseGenetics(page)),
      skills: getHorseSkills(page),
      stars: "",
      blup: getHorseBLUP(page),
      specialty: getHorseCompetitionSpecialty(page)
    },
    bmi: getAllBMIs(page),
    breeder: "",
    purebred: false,
    birth: {
      month: null,
      year: null
    },
    pregnant: legacy_horsePregnant(page)
  }
}

export function legacy_horsePregnant(page?: Document | JQuery<Document>) {
  return $(page)?.find("h3:contains('Gestation')").length > 0
}

export async function isOuranosGaia(
  page?: Document | JQuery<Document>
): Promise<boolean> {
  const block = $(page ?? document).find("#origins-body-content")
  if (!block || !block.length) return false // no origins block
  if ($(block).find("a[href*='elevage/fiche']").length > 0) return false // horse link found in origins block
  if ($(block).find("td:contains('Gaia')").length > 0) return true // horse is a gaia foal
  return false
}

export async function displayItemsAtTop() {
  const horseNameIconsEnabled = await getSetting("horseNameIconsEnabled")
  if (!horseNameIconsEnabled) {
    return
  }

  waitForElement("#objects-body-content").then(async (objectsDiv) => {
    let newImg
    waitForElement("#reproduction-wrapper").then((reproDiv) => {
      const findReproButt = $(reproDiv).find("a.saillir")

      if (findReproButt && findReproButt[0]) {
        const currBut = findReproButt[0]
        // const spot = $(missionDiv).find(".last");
        // if (spot && spot[0]) {
        //     const clone = $(currBut).clone().appendTo($(spot[0]));
        // }
        const butHref = $(currBut).attr("href")
        if (butHref && butHref.includes("rechercherMale")) {
          newImg = document.createElement("img")
          newImg.src =
            "media/equideo/image/components/actionconsole/saillir.png"
          // newImg.style.margin = "2px 3px 2px 0";
          newImg.style.width = "15%"
          newImg.style.height = "auto"
          // newImg.classList.add("float-right");
        }
      }

      insertImgIntoHorseName(newImg)
    })
    const isP = await isPurebred()
    if (isP) {
      // Then we have a pure-bred horse.
      newImg = document.createElement("div")
      newImg.style.width = "16px"
      const innerDiv = document.createElement("div")
      innerDiv.className = "width-100"
      innerDiv.innerText = "100"
      newImg.appendChild(innerDiv)
      newImg.className = "star star-style-4"

      insertImgIntoHorseName(newImg)
    }
    const hasWins = await hasNWins(20)
    if (hasWins) {
      // Then we have a horse with needed 20 wins.
      newImg = document.createElement("img")
      newImg.src =
        "/media/equideo/image//fonctionnels/32/trophee_v1417164050.png"
      newImg.style.width = "10%"
      newImg.style.height = "auto"

      insertImgIntoHorseName(newImg)
    }
    const isGaiaFoal = await isOuranosGaia(document)
    if (isGaiaFoal) {
      newImg = document.createElement("img")
      newImg.src = "/media/equideo/image//library/icon/divin_v1417164050.png"
      newImg.style.width = "10%"
      newImg.style.height = "auto"

      insertImgIntoHorseName(newImg)
    }
    waitForElement("#image-body-content").then(async (value: HTMLElement) => {
      // const tableClone = $(objectsDiv).clone().appendTo($(value));
      const objectElements = $(objectsDiv).find("a")
      // console.log("Object elements are ", objectElements);
      for (const objectElement of objectElements) {
        $(objectElement).clone().appendTo($(value))
      }
    })
  })
}

async function addEditNameOptionButtons() {
  const horseNameInput = $("#horseNameName")
  if (horseNameInput.length <= 0 || $("#ha-horse-name-edit-btns").length > 0) {
    return // do nothing if already added or doesnt exist
  }
  const sexe = getHorseSexe($(document))
  const genetics = rename_legacy_HorseGenetics(
    legacy_HorseGenetics($(document))
  )?.total
  const companion = $("#compagnon-head-title")
  const rarity = await getCoatRarity()
  const isGaia = await isOuranosGaia(document)
  const breed = getHorseBreed(document)
  const rowToInsertInto = horseNameInput.closest("tr")
  const newDat = document.createElement("td")
  newDat.id = "ha-horse-name-edit-btns"
  const innerDiv = document.createElement("div")
  innerDiv.style.display = "flex"
  innerDiv.style.flexDirection = "column"
  innerDiv.style.gap = "8px"
  innerDiv.style.alignItems = "center"
  innerDiv.innerHTML = ""
  // Add Gender, GP
  innerDiv.innerHTML += `<button type="button" style="color:white; padding:3px; padding-left:5px; padding-right:5px;" class="button button-style-0 ${
    sexe?.length > 0 && !Number.isNaN(genetics) ? "" : "disabled"
  }" data-anim="0" id="ha-horse-name-sexe-gp"><span>[SEXE] GP</span></button>`
  // TO-DO:Add Gender, Max Skills
  // Add Pet
  innerDiv.innerHTML += `<button type="button" style="color:white; padding:3px; padding-left:5px; padding-right:5px;" class="button button-style-0 ${
    companion?.length > 0 ? "" : "disabled"
  }" data-anim="0" id="ha-horse-name-pet"><span>[PET] PET</span></button>`
  // Add Foundie Button
  innerDiv.innerHTML += `<button type="button" style="color:white; padding:3px; padding-left:5px; padding-right:5px;" class="button button-style-0 ${
    isGaia ? "" : "disabled"
  }" data-anim="0" id="ha-horse-name-foundie"><span>FOUNDIE</span></button>`
  // Add Coat Percent
  innerDiv.innerHTML += `<button type="button" style="color:white; padding:3px; padding-left:5px; padding-right:5px;" class="button button-style-0 ${
    rarity && rarity > 0 ? "" : "disabled"
  }" data-anim="0" id="ha-horse-name-coat-rarity"><span>% COAT</span></button>`
  console.log("sex:" + sexe)
  // Add "COVER + SELL"
  innerDiv.innerHTML += `<button type="button" style="color:white; padding:3px; padding-left:5px; padding-right:5px;" class="button button-style-0 ${
    sexe && sexe.match("F")?.length > 0 ? "" : "disabled"
  }" data-anim="0" id="ha-horse-name-cover-and-sell"><span>C + S</span></button>`
  // Add "FILLER"
  innerDiv.innerHTML += `<button type="button" style="color:white; padding:3px; padding-left:5px; padding-right:5px;" class="button button-style-0" data-anim="0" id="ha-horse-name-filler"><span>FILLER</span></button>`
  newDat.appendChild(innerDiv)
  $(newDat).appendTo(rowToInsertInto)
  $("#ha-horse-name-sexe-gp").on("click", () => {
    if (sexe?.length > 0 && !Number.isNaN(genetics)) {
      horseNameInput.val(sexe + " " + genetics)
    }
  })
  $("#ha-horse-name-pet").on("click", () => {
    if (companion?.length > 0) {
      horseNameInput.val(companion.text().trim().substring(0, 16) + " " + "PET")
    }
  })
  $("#ha-horse-name-coat-rarity").on("click", () => {
    if (rarity && rarity > 0) {
      horseNameInput.val(rarity + "% COAT")
    }
  })
  $("#ha-horse-name-foundie").on("click", () => {
    if (isGaia) {
      horseNameInput.val(
        (breed?.length > 0 ? breed.trim().substring(0, 12) + " " : "") +
          "FOUNDIE"
      )
    }
  })
  $("#ha-horse-name-cover-and-sell").on("click", () => {
    if (sexe && sexe.match("F")?.length > 0) {
      horseNameInput.val("COVER + SELL")
    }
  })
  $("#ha-horse-name-filler").on("click", () => {
    horseNameInput.val("LEXE FILLER <3")
  })
}

export async function addQuickEditBtnToTop() {
  const [extraHorseButtonsEnabled] = await Promise.all([
    getSetting("extraHorseButtonsEnabled")
  ])
  if (!extraHorseButtonsEnabled || $("#ha-edit-horse-button").length > 0) {
    return
  }

  waitForElement("#widget--1").then((elem) => {
    const newDiv = `<div style="    
        display: block;
        position: absolute;
        right: 56px;
        top: 9px;
        width: 32px;
        height: 32px;
        z-index: 106;
        cursor: pointer;
        border-radius: 5px 5px 0 0;"><button type="button" style="color:white;" class="button button-style-14" data-anim="0" id="ha-edit-horse-button"><span>✎</span></button></div>`
    $(elem)?.parent()?.parent()?.parent()?.prepend(newDiv)
    // console.log("Added newDiv.")
  })
  waitForElement("#ha-edit-horse-button").then((elem) => {
    elem.onclick = () => {
      $("div.options-menu a:contains('Edit profile')")[0]?.click()
      addEditNameOptionButtons()
    }
  })
}

export function findSliderValue(parent, key) {
  const sliderVal = $(parent).find(key)
  if (sliderVal && sliderVal[0]) {
    return sliderVal[0]
  } else {
    return undefined
  }
}

export function validate_input_selection(
  value,
  intendedHours
): Promise<boolean> {
  return new Promise((resolve) => {
    if (intendedHours < 0) {
      resolve(false) // did nothing
    } // Avoid infinite loop
    if (!value) {
      resolve(false) // did nothing
    }
    const sliderVal = findSliderValue(
      value,
      'li[data-number="' + intendedHours + '"]'
    )
    if (sliderVal) {
      if ($(sliderVal).hasClass("disabled")) {
        resolve(validate_input_selection(value, intendedHours - 1))
        // console.log("Disabled...")
      } else {
        // console.log("Valid, clicking.")
        $(sliderVal).on("click", () => {
          setTimeout(() => {
            resolve(true)
          }, 100)
        })
        sliderVal.click()
      }
    } else {
      // console.log("Not found, trying again.")
      resolve(validate_input_selection(value, intendedHours - 1))
    }
  })
}

export async function is_vip() {
  const head = await waitForElement(`#header-hud a[href="/jeu/"]`)
  if (head.innerHTML.includes("/logo/vip/howrse-special_v1523004978.png")) {
    return true
  }
  return false
}

const trainingTypes = [
  "endurance",
  "vitesse",
  "dressage",
  "galop",
  "trot",
  "saut"
] as const
const rideTypes = ["mountain", "beach", "forest"] as const
const careTypes = ["play"] as const
export type PresetSliderTypes =
  | (typeof trainingTypes)[number]
  | (typeof rideTypes)[number]
  | (typeof careTypes)[number]
const presetSliderKeys: Record<PresetSliderTypes, string> = {
  mountain: "walkmontagneSlider",
  forest: "walkforetSlider",
  beach: "walkplageSlider",
  endurance: "trainingEnduranceSlider",
  vitesse: "trainingVitesseSlider",
  trot: "trainingTrotSlider",
  galop: "trainingGalopSlider",
  dressage: "trainingDressageSlider",
  saut: "trainingSautSlider",
  play: "centerPlaySlider"
}

// Old logic. Out of date for some pages.
export function legacy_getHorseIdFromReturnLink(DOM) {
  const returnToHorseSpan = $(DOM).find(
    `span[style*="/media/equideo/image/components/action/2/precedent.png"]`
  )
  if (returnToHorseSpan && returnToHorseSpan[0]) {
    const returnBut = $(returnToHorseSpan[0]).parent()
    if (returnBut) {
      const url = $(returnBut).attr("href")
      if (url) {
        const horseId = url.match(/id=([^&]*)/)[1]
        return horseId
      }
    }
  }
  return undefined
}

export function getHorseIdFromReturnLink(DOM) {
  const returnToHorseSpan = $(DOM).find(
    `nav.content__breadcrumb.js-content__breadcrumb`
  )
  if (returnToHorseSpan && returnToHorseSpan[0]) {
    const returnBut = $(returnToHorseSpan[0]).find(
      "a[href*='/elevage/chevaux/cheval?id=']"
    )
    if (returnBut) {
      const url = $(returnBut).attr("href")
      if (url) {
        const horseId = url.match(/id=([^&]*)/)[1]
        return horseId
      } else {
        return legacy_getHorseIdFromReturnLink(DOM)
      }
    }
  } else {
    return legacy_getHorseIdFromReturnLink(DOM)
  }
  return undefined
}

export async function legacy_scrapeHorseTypeFromIcon() {
  const tableZero = await waitForElement("#table-0")
  const wandererIcon = $(tableZero)
    ?.find("thead")
    ?.find("img[src*='bestiaire-grec_v1597159752.png']")
  const divineIcon = $(tableZero)
    ?.find("thead")
    ?.find("img[src*='soleil-divin_v1417164050.png']")
  const chimeraIcon = $(tableZero)
    ?.find("thead")
    ?.find("img[src*='patte-chimerique_v1523893010.png']")
  if (wandererIcon && wandererIcon.length > 0) {
    return "wanderer"
  } else if (divineIcon && divineIcon.length > 0) {
    return "divine"
  } else if (chimeraIcon && chimeraIcon.length > 0) {
    return "chimera"
  } else {
    return "normal"
  }
}

export async function getHorseIdFromHorsePage() {
  // First, try
  const horseName = await waitForElement("h1.horse-name")
  let horseLink = $(horseName).find("a[href*='/elevage/chevaux/cheval?id=']")[0]
  if (!horseLink) {
    horseLink = $(horseName).find("a[href*='/elevage/fiche/?id=']")[0]
  }
  if (horseLink && $(horseLink).attr("href")) {
    return getHorseIdFromUrl($(horseLink).attr("href"))
  } else {
    return getHorseIdFromUrl(window.location.href)
  }
}

export function isAuctionListing() {
  if (window.location.href.match(/type=enchere/gi)) {
    return true
  }
  return false
}
export function isAllAuctionPage() {
  const auctionTab = $("#tab-0.selected")
  if (
    window.location.href.match(/type=enchere/gi) ||
    (auctionTab.length > 0 &&
      auctionTab.find("a[href*='type=enchere'").length > 0)
  ) {
    return true
  }
  return false
}

export function isOnlyMySales(optDom?: Document) {
  const checkbox = optDom ? $(optDom).find("#mesVentes") : $("#mesVentes")
  if (
    $(checkbox).length > 0 &&
    $(checkbox).attr("checked")?.toString()?.match("checked")
  ) {
    return true
  }
  return false
}

export function isTeamOrReservedSales() {
  const reservedTab = $("#tab-2.selected")
  const teamTab = $("#tab-3.selected")
  if (
    window.location.href.match(/type=prive/gi) ||
    (reservedTab.length > 0 &&
      reservedTab.find("a[href*='type=prive'").length > 0)
  ) {
    return true
  } else if (
    window.location.href.match(/type=equipe/gi) ||
    (teamTab.length > 0 && teamTab.find("a[href*='type=equipe'").length > 0)
  ) {
    return true
  }
  return false
}
export function isAutomatedSales(optDom?: Document) {
  const tab = optDom ? $(optDom).find("#achatAuto") : $("#achatAuto")
  return tab.length > 0
}
// try not to use this directly
export function getHorseIdFromUrl(url) {
  const attempt1 = url.match(/id=([^&]*)/)
  const attempt2 = url.match(/cheval=([^&]*)/)
  return attempt1?.[1] ?? attempt2?.[1]
}

export function getCurrentHost() {
  return window.location.hostname || window.location.host
}

// From howrse website.
export function toggleBlocRecherche() {
  return (
    false === $("#blocRecherche").is(":visible") &&
      ($("#horseFilter").slideUp(),
      $("#blocRecherche").slideDown(),
      $("select[name=horseFilterFiltre]").attr("disabled", "disabled"),
      $("input[name=horseSearchNoFilter]").val("1"),
      $("input[name=horseSearchSearch]").val("1")),
    !1
  )
}

export function checkBoolData(
  data: { key: string; value: boolean }[],
  key: string
) {
  if (data.length === 0) return false
  return data.find((obj) => obj.key === key)?.value ?? false
}

export function getCurrentYear() {
  const currentYear = new Date().getFullYear()
  return currentYear || 2023
}

export function roundSkillsAndGeneticsForSearch(legacyStats: {
  gp: {
    total: number
  }
  skills: {
    st: number
    sp: number
    dr: number
    ga: number
    tr: number
    ju: number
    total: any
  }
}) {
  function roundFactor(n: number, factor: number) {
    return !n ? null : Math.floor(n / factor) * factor
  }
  return {
    gp: {
      total: roundFactor(legacyStats?.gp?.total, 5000)
    },
    skills: {
      st: roundFactor(legacyStats?.skills?.st, 500),
      sp: roundFactor(legacyStats?.skills?.sp, 500),
      dr: roundFactor(legacyStats?.skills?.dr, 500),
      ga: roundFactor(legacyStats?.skills?.ga, 500),
      ju: roundFactor(legacyStats?.skills?.ju, 500),
      total: roundFactor(legacyStats?.skills?.total, 5000)
    }
  }
}
