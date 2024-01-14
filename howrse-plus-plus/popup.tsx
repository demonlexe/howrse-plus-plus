import PopupSettings from "~components/PopupSettings"
import { getCurrentYear } from "~utils/scripts/gen_functs"

import "bootstrap/dist/css/bootstrap.min.css"

function IndexPopup() {
  const manifestData = chrome.runtime.getManifest()
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "16px",
        gap: "16px",
        width: "400px",
        minHeight: "300px"
      }}>
      <PopupSettings />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>{`HowrseAdvisor ${getCurrentYear()}`}</div>
        <div>v{manifestData.version}</div>
      </div>
    </div>
  )
}

export default IndexPopup
