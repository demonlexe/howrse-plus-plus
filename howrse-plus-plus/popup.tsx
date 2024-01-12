import PopupSettings from "~components/PopupSettings"
import { getCurrentYear } from "~utils/scripts/gen_functs"

function IndexPopup() {
  const manifestData = chrome.runtime.getManifest()
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "16px",
        gap: "16px",
        width: "400px"
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
