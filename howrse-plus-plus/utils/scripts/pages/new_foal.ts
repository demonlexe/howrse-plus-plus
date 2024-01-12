import { waitForElement } from "utils/scripts/gen_functs"
import { Translate } from "utils/scripts/scrapeTranslations"

import { getData } from "~chrome_store"

export async function chooseSampleName() {
  const [useCustomHorseName] = await Promise.all([
    getData("useCustomHorseName")
  ])

  waitForElement("#page-contents").then((val) => {
    let genPot = ""
    let gender = "M"
    const strongGenPotText = $(val)
      .find(
        `strong:contains("${Translate(
          "Genetic potential",
          window.location.host
        )}")`
      )
      .first()
    if (strongGenPotText) {
      const holder = $(strongGenPotText).parent()
      if (holder) {
        genPot = $(holder).find("span").first()?.text()
      }
    }
    let findFemaleImg = $(val).find(
      '[src|="/media/equideo/image/fonctionnels/20/femelle.png"]'
    ) //Legacy
    findFemaleImg =
      findFemaleImg && findFemaleImg[0]
        ? findFemaleImg
        : $(val).find('[alt="femelle"]') //New
    // console.log("Image is ", findFemaleImg)
    if (findFemaleImg && findFemaleImg[0]) {
      gender = "F"
    }

    const newName = gender + " " + genPot
    const nameInput = $("#poulain-1")
    const nameInputTwin = $("#poulain-2")
    if (nameInput) {
      nameInput.val(newName)
    }
    if (nameInputTwin) {
      nameInputTwin.val(newName)
    }
    chooseBreedingFarm(val)
  })
}

export async function chooseBreedingFarm(parent) {
  const newFoalSuggestionsEnabled = await getData("newFoalSuggestionsEnabled")
  if (!newFoalSuggestionsEnabled) {
    return
  }
  const profileRef = $(parent).find("a:contains('profile')")
  if (!profileRef || !profileRef[0]) {
    return
  }

  profileRef[0].onclick = () => {
    // console.log("Clicked, pre-setting inptus")
    let valueSelected = false
    $("#elevage-1 option").each((_index, option) => {
      if (valueSelected === false) {
        const breadcrumbs = $("#page-contents").find(
          `nav[class*="content__breadcrumb js-content__breadcrumb"] a`
        )
        if (breadcrumbs && breadcrumbs[breadcrumbs.length - 2]) {
          const farmName = $(breadcrumbs[breadcrumbs.length - 2])
            .text()
            .replace(/[\t\r\n\s]/gi, "")
          const farmNameOption = $(option)
            .text()
            .replace(/[\t\r\n\s]/gi, "")
          if (farmNameOption && farmNameOption === farmName) {
            $(option).attr("selected", "selected")
            valueSelected = true
          }
        }
      }
    })
  }
  if (profileRef && profileRef[0]) {
    setTimeout(() => {
      profileRef[0].click()
    }, 100)
  }
}
