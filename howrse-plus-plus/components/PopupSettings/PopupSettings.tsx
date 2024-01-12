import { useEffect, useState } from "react"
import { Form, InputGroup, OverlayTrigger, Tooltip } from "react-bootstrap"

import { getData, setData } from "~chrome_store"
import { type BooleanSettings, booleanSettings } from "~settingsObtainer"

import styles from "./PopupSettings.module.css"

export default function PopupSettings() {
  const [currentSettings, setCurrentSettings] = useState<
    Record<keyof BooleanSettings, boolean>
  >({})
  useEffect(() => {
    const newCurrSettings: Record<keyof BooleanSettings, boolean> = {}
    Object.keys(booleanSettings).map((key) => {
      getData(key)
        .then((dat) => {
          newCurrSettings[key] = dat
        })
        .catch((err) => {
          console.error(`[ERR] ${err} getting data: `, key)
        })
    })
    setCurrentSettings(newCurrSettings)
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
