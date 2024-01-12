import { getData, setData } from "~chrome_store"

export type SpecialtyContext = {
  specialty: "western" | "classical" | "not-found"
}

export type CoatRarityCache = Record<string, Record<string, number>>

export type BooleanSettings = Record<string, { label: string; tooltip: string }>
export const booleanSettings: BooleanSettings = {
  horseNameIconsEnabled: {
    label: "Add Extra Icons",
    tooltip:
      "Adds extra icons to a horse's page to provide more information without having the scroll. Currently, this entails BMIs, coat rarity, purebred status, and an indicator for if a mare is ready to be covered."
  },
  extraHorseButtonsEnabled: {
    label: "Add Extra Icons",
    tooltip:
      "Adds extra icons to a horse's page to provide more information without having the scroll. Currently, this entails BMIs, coat rarity, purebred status, and an indicator for if a mare is ready to be covered."
  },
  useCustomHorseName: {
    label: "Add Extra Icons",
    tooltip:
      "Adds extra icons to a horse's page to provide more information without having the scroll. Currently, this entails BMIs, coat rarity, purebred status, and an indicator for if a mare is ready to be covered."
  },
  newFoalSuggestionsEnabled: {
    label: "Add Extra Icons",
    tooltip:
      "Adds extra icons to a horse's page to provide more information without having the scroll. Currently, this entails BMIs, coat rarity, purebred status, and an indicator for if a mare is ready to be covered."
  }
}

export type MiscData = {
  coatRarityCache: CoatRarityCache
}

export const settingsDefaults: Record<keyof BooleanSettings, boolean> = {
  horseNameIconsEnabled: false,
  extraHorseButtonsEnabled: false,
  useCustomHorseName: false,
  newFoalSuggestionsEnabled: false
}
