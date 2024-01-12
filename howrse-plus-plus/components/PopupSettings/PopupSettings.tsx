import { useEffect, useState } from "react"
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap"

import { getData, setData } from "~chrome_store"
import { type BooleanSettings, booleanSettings } from "~settingsObtainer"

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
        res.map((val, index) => {
          newCurrSettings[allKeys[index]] = val
        })
        setCurrentSettings(newCurrSettings)
      })
      .catch((err) => {
        console.error(`[ERR] ${err} getting Setting data.`)
      })
  }, [])
  return (
    <Form>
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
            <OverlayTrigger placement="top" overlay={tooltip}>
              <div className={styles.infoHoverLbl}>?</div>
            </OverlayTrigger>
          </div>
        )
      })}
    </Form>
  )
}
