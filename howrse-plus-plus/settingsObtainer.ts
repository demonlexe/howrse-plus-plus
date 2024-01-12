import { getData, setData } from "~chrome_store"

export type SpecialtyContext = {
  specialty: "western" | "classical" | "not-found"
}

export type CoatRarityCache = Record<string, Record<string, number>>

export type Preset = {
  horseNameIconsEnabled: boolean
  extraHorseButtonsEnabled: boolean
  useCustomHorseName: boolean
  newFoalSuggestionsEnabled: boolean
}

export type MiscData = {
  coatRarityCache: CoatRarityCache
}

export const settingsDefaults: Preset = {
  horseNameIconsEnabled: false,
  extraHorseButtonsEnabled: false,
  useCustomHorseName: false,
  newFoalSuggestionsEnabled: false
}
