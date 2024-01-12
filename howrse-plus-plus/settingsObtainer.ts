import { getData, setData } from "~chrome_store";

export type SpecialtyContext = {
  specialty: "western" | "classical" | "not-found";
};

export type Preset = {
  horseNameIconsEnabled: boolean;
};

export const settingsDefaults: Preset = {
  horseNameIconsEnabled: false,
};
