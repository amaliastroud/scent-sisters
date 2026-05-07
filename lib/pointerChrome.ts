/**
 * True when `(clientX, clientY)` is over a semantic app chrome region (<header>, <footer>),
 * based on actual hit-tested DOM (works with overlays that use `pointer-events: none`).
 */
export function pointerOverHeaderOrFooter(clientX: number, clientY: number): boolean {
  if (typeof document === "undefined") return false;
  const el = document.elementFromPoint(clientX, clientY);
  return Boolean(el?.closest("header, footer"));
}
