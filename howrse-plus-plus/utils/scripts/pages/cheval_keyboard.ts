function isTypingContext(target: EventTarget | null): boolean {
  if (!target || !(target instanceof HTMLElement)) return false
  return Boolean(target.closest("input, textarea, select, [contenteditable]"))
}

/** A/D and ArrowLeft/ArrowRight trigger the same navigation as #nav-previous / #nav-next. */
export function installChevalPrevNextKeyboardShortcuts(): void {
  document.addEventListener(
    "keydown",
    (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      if (isTypingContext(e.target)) return

      let navId: string | null = null
      if (e.key === "ArrowLeft") navId = "nav-previous"
      else if (e.key === "ArrowRight") navId = "nav-next"
      else {
        const k = e.key.length === 1 ? e.key.toLowerCase() : ""
        if (k === "a") navId = "nav-previous"
        else if (k === "d") navId = "nav-next"
        else return
      }

      const el = document.getElementById(navId)
      if (!el) return

      e.preventDefault()
      el.click()
    },
    true
  )
}
