export type DropdownData<Keys> = { key: Keys; value: string }[]
export type BoolData<Keys> = { key: Keys; value: boolean }[]
export type DisplayInfo<Keys extends string> = Record<
  Keys,
  { label: string; tooltip: string }
>
export type DropdownSettings<Keys extends string> = Record<Keys, string[]>

export const booleanAutoSellSettings = ["addSalesShortcuts"] as const
export const booleanAutoCompSettings = ["autoComp_autoParticipate"] as const

export const dropdownAutoSellSettingsKeys = [
  "autoSell_salesType",
  "autoSell_addToListingPage",
  "autoSell_priorityType",
  "autoSell_directPrefillType",
  "autoRefreshSalesPage"
] as const
export const dropdownAutoCompSettingsKeys = [
  "autoComp_checkCompsWinnability",
  "autoComp_competitionType",
  "autoComp_lowLevelComps",
  "autoComp_priorityType",
  "autoComp_batch"
] as const

export const dropdownAutoSellSettings: DropdownSettings<
  (typeof dropdownAutoSellSettingsKeys)[number]
> = {
  autoSell_salesType: ["Off", "Direct Sales", "Auction"],
  autoSell_addToListingPage: [
    "Off",
    "Always Search",
    "Search Once and Remember",
    "Button Only"
  ],
  autoSell_priorityType: ["Equus", "Passes"],
  autoSell_directPrefillType: [
    "Beat Lowest Price",
    "Beat Highest Price",
    "Average Price"
  ],
  autoRefreshSalesPage: ["Off", "Rapid-Stop", "Stop", "Constant"]
}
export const dropdownAutoCompSettings: DropdownSettings<
  (typeof dropdownAutoCompSettingsKeys)[number]
> = {
  autoComp_checkCompsWinnability: [
    "Off",
    "On; Return to Horse if None",
    "On; Stay on Comps Page if None",
    "On; Enter Best Chances"
  ],
  autoComp_competitionType: ["All Horses", "Breed Only"],
  autoComp_lowLevelComps: ["Any", "Only Low-Level", "NO Low-Level"],
  autoComp_priorityType: [
    "Least Participants",
    "Most Participants",
    "Lowest Difficulty",
    "Highest Difficulty",
    "Lowest Kitty",
    "Highest Kitty"
  ],
  autoComp_batch: ["1", "2", "3", "4"]
}

export const autoSellDisplayInfo: DisplayInfo<
  | (typeof dropdownAutoSellSettingsKeys)[number]
  | (typeof booleanAutoSellSettings)[number]
> = {
  addSalesShortcuts: {
    label: "Add Sales Shortcut Btns",
    tooltip:
      "Adds +1, +100, +1000 buttons to auctions. Re-list a single horse with ease.Inserts a $ Icon to left of the horse's name. Other tweaks to Sales page."
  },
  autoRefreshSalesPage: {
    label: "Auto Refresh Sales",
    tooltip:
      "When 'Stop': refresh the sales page every 300-800 ms, unless a buyable horse appears, you scroll or turn off this setting. When 'Constant', refresh every minute, and call cache updater."
  },
  autoSell_addToListingPage: {
    label: "Listing Price Search [ALPHA]",
    tooltip: `Controls whether price searches are used on the page of a horse that is already for sale. "Always Search" runs the search every time the Listing page is refreshed. "Search Once and Remember" will search only once and cache the results. "Button Only" runs the search only when clicked.`
  },
  autoSell_salesType: {
    label: "New Sale Price Search [ALPHA]",
    tooltip: `When "Direct Sales", run multiple different searches to provide guesses at a horse's worth, and will display these searches.
    When "Auction", click "Auction", and use "Minimum Equus" from onboarding.`
  },
  autoSell_priorityType: {
    label: "Priority",
    tooltip:
      "Sets whether to auto-click passes or equus when opening the Direct Sales section of the sales page for a horse"
  },
  autoSell_directPrefillType: {
    label: "Prefill",
    tooltip:
      'Once all queries have ran, this determines how the pre-filled sell price is set. "Beat Lowest Price" takes the lowest query price and beats it by 100 equus or 1 pass. "Average Price" will take the average of all queries.'
  }
}
export const autoCompSettings: DisplayInfo<
  | (typeof dropdownAutoCompSettingsKeys)[number]
  | (typeof booleanAutoCompSettings)[number]
> = {
  autoComp_lowLevelComps: {
    label: "Low-Level Comps",
    tooltip: `Enable, Disable, or Ignore for the box that says "Exclude low-level competitions" when searching for competitions.`
  },
  autoComp_autoParticipate: {
    label: "Auto-Participate",
    tooltip: `Automatically participate in competitions that meet the selected criteria.`
  },
  autoComp_checkCompsWinnability: {
    label: "Check Winnability of Comps",
    tooltip: `Check if a competition is winnable before participating. Horse text will turn red/green depending on if the competition is winnable or not.`
  },
  autoComp_competitionType: {
    label: "Competition Type",
    tooltip: `Sets the desired competition type. For non-divines, this will be either "Breed Only", or "Open to all horses"`
  },
  autoComp_priorityType: {
    label: "Priority",
    tooltip: "This sets the sort filter for competitions."
  },
  autoComp_batch: {
    label: "# Competitions to Enter",
    tooltip:
      "This sets the maximum number of competitions to enter on each visit to the competitions page. This should be safely protected by a horse's energy values, such that it does not go below 20%."
  }
}

export const booleanRegularSettings = [
  "autoDisplayItemsEnabled",
  "autoFeedEnabled",
  "autoMissionEnabled",
  "autoGroomSleepEnabled"
]

export const dropdownRegularSettingsKeys = [
  "autoNavToNext",
  "useCoversSetting",
  "autoRideSetting",
  "autoTrainingSetting",
  "autoECSetting"
] as const
export const dropdownRegularSettings: DropdownSettings<
  (typeof dropdownRegularSettingsKeys)[number]
> = {
  autoNavToNext: ["Off", "Always", "Protected"],
  autoRideSetting: [
    "Off",
    "Enabled - Ignore Beach",
    "Enabled - ONLY Beach",
    "Enabled - ONLY EC",
    "Enabled - ONLY Forest",
    "Enabled - ONLY Mountain",
    "Enabled"
  ],
  autoTrainingSetting: [
    "Off",
    "Enabled - Top Three",
    "Enabled - BLUP (2nd, 3rd)",
    "Enabled - All",
    "Enabled - All - Mission First"
  ],
  autoECSetting: [
    "Off",
    "My EC",
    "Equip",
    "Location = Rides",
    "Location = BEACH",
    "Shower + Trough",
    "Shower Only",
    "Shower + Trough, Equip",
    "Shower Only, Equip",
    "Shower + Trough, Location = Rides",
    "Shower Only, Location = Rides",
    "Shower + Trough, Equip, Location = Rides",
    "Shower Only, Equip, Location = Rides",
    "Shower + Trough, Location = BEACH",
    "Shower Only, Location = BEACH",
    "Shower + Trough, Equip, Location = BEACH",
    "Shower Only, Equip, Location = BEACH",
    "Any"
  ],
  useCoversSetting: ["Off", "My Horses", "BLUP 100"]
}

export const regularSettings: DisplayInfo<
  BooleanRegularSettings | (typeof dropdownRegularSettingsKeys)[number]
> = {
  autoDisplayItemsEnabled: {
    label: "Add Extra Icons",
    tooltip:
      "Adds extra icons to a horse's page to provide more information without having the scroll. Currently, this entails BMIs, coat rarity, purebred status, and an indicator for if a mare is ready to be covered."
  },
  autoFeedEnabled: {
    label: "Pre-Fill Food Meters",
    tooltip: "Pre-fills the fodder and oats meters when feeding a horse."
  },
  autoMissionEnabled: {
    label: "Mission After Feed",
    tooltip: `Automatically clicks the "mission" button after feeding a horse.`
  },
  autoGroomSleepEnabled: {
    label: "Sleep After Groom",
    tooltip:
      "Similar to the VIP perk, this automatically clicks the sleep button after grooming a horse."
  },
  autoRideSetting: {
    label: "Smart Rides",
    tooltip:
      "Automatically selects the best ride for a horse and pre-fills the meter."
  },
  autoTrainingSetting: {
    label: "Smart Training",
    tooltip:
      "Automatically selects the best training for a horse and pre-fills the meter."
  },
  autoNavToNext: {
    label: "Next Horse after Sleep",
    tooltip: `Automatically navigates to the next horse after groom+sleeping. Requires that "Sleep After Groom" be enabled. `
  },
  autoECSetting: {
    label: "Auto-Enroll Cheapest EC",
    tooltip:
      "Automatically enrolls a horse in the cheapest EC, provided that it is under 500 equus for a 10-day period."
  },
  useCoversSetting: {
    label: "Covers Sort",
    tooltip: `When covering your mare, it will automatically sort coverings for the correct breed and your choice of stud males. Also controls whether the "Create Cover" button is added.`
  }
}

export type BooleanRegularSettings = (typeof booleanRegularSettings)[number]
