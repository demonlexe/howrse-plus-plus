import { getData, setData } from "~chrome_store"

export type SpecialtyContext = {
  specialty: "western" | "classical" | "not-found"
}

export type CoatRarityCache = Record<string, Record<string, number>>

export type BooleanSettings = Record<string, { label: string; tooltip: string }>
export const booleanSettings: BooleanSettings = {
  horseNameIconsEnabled: {
    label: "Add Info Icons to Horse Name",
    tooltip:
      "Adds extra icons to a horse's page by the Name field to provide more information without having the scroll. Currently, this entails BMIs, coat rarity, purebred status, and an indicator for if a mare is ready to be covered."
  },
  extraHorseButtonsEnabled: {
    label: "Add Extra Buttons to Horse Page",
    tooltip:
      "Adds extra buttons to a horse's page to provide shortcuts to menus like Sell or Edit."
  },
  useCustomHorseName: {
    label: "Preset New Foal Name",
    tooltip:
      "Changes a new foal's name to be M/F followed by the Genetic Potential."
  },
  newFoalSuggestionsEnabled: {
    label: "Preset New Foal Breeding Farm",
    tooltip:
      "Puts the foal in the same breeding farm as its parent when it is born."
  }
}

export type MiscData = {
  coatRarityCache: CoatRarityCache
}

export const settingsDefaults: Record<keyof BooleanSettings, boolean> = {
  horseNameIconsEnabled: true,
  extraHorseButtonsEnabled: true,
  useCustomHorseName: true,
  newFoalSuggestionsEnabled: true
}
