import { useEffect, useState } from "react"
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap"

import { getData, setData } from "~chrome_store"
import {
  type BooleanSettings,
  booleanSettings,
  settingsDefaults
} from "~settingsObtainer"

import styles from "./PopupSettings.module.css"

export default function PopupSettings() {
  const [currentSettings, setCurrentSettings] = useState<
    Record<keyof BooleanSettings, boolean>
  >({})
  useEffect(() => {
    const newCurrSettings: Record<keyof BooleanSettings, boolean> = {}

    const allKeys = Object.keys(booleanSettings)
    Promise.all(allKeys.map((key) => getData(key)))
      .then((res) => {
        const dataUpdatePromises = []
        res.map(async (val, index) => {
          if (val === null || val === undefined) {
            // override null settings with defaults
            dataUpdatePromises.push(() => {
              setData(allKeys[index], settingsDefaults[allKeys[index]])
            })
            val = settingsDefaults[allKeys[index]]
          }
          newCurrSettings[allKeys[index]] = val
        })
        // done mapping, now check defaults

        Promise.all(dataUpdatePromises)
          .then(() => {
            setCurrentSettings(newCurrSettings)
          })
          .catch((err) => {
            console.error(`[ERR] ${err} updating Setting data.`)
          })
      })
      .catch((err) => {
        console.error(`[ERR] ${err} getting Setting data.`)
      })
  }, [])
  return (
    <Form className={styles.settingsContainer}>
      {Object.keys(booleanSettings)?.map((settingKey, index) => {
        const tooltip = (
          <Tooltip>{booleanSettings[settingKey]?.tooltip ?? "err"}</Tooltip>
        )
        return (
          <div className={styles.flexRowSpaceBtwn} key={settingKey}>
            <Form.Check
              checked={currentSettings[settingKey] ?? false}
              onChange={async (e) => {
                setCurrentSettings((prevSettings) => {
                  return { ...prevSettings, [settingKey]: e.target.checked }
                })
                await setData(settingKey, e.target.checked)
              }}
              type="switch"
              id={settingKey}
              label={booleanSettings[settingKey]?.label ?? "err"}
            />
            <OverlayTrigger placement="bottom" overlay={tooltip}>
              <div className={styles.infoHoverLbl}>?</div>
            </OverlayTrigger>
          </div>
        )
      })}
    </Form>
  )
}
