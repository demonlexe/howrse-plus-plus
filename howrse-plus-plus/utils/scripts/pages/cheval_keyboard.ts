function isTypingContext(target: EventTarget | null): boolean {
  if (!target || !(target instanceof HTMLElement)) return false
  return Boolean(target.closest("input, textarea, select, [contenteditable]"))
}
