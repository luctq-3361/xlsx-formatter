// ─── Text measurement helpers ─────────────────────────────────────────────────
//
// Used to estimate how many lines of text a cell will occupy after wrap,
// so we can set the correct row height without opening Excel.

// Reusable Canvas 2D context — used only for measureText(), never rendered.
const _measCtx = document.createElement('canvas').getContext('2d');

// Max-digit width (MDW) for Excel's Normal style font (Calibri 11pt at 96 DPI).
// Defined in the OOXML spec as ~7 px. Hardcoded to avoid the font-fallback error
// on macOS (where Calibri is absent and Canvas falls back to Arial at ~8 px).
const _EXCEL_MDW = 7;

// Count wrapped lines for a single text segment (no newlines).
// • Has spaces  → word-boundary wrap (Latin)
// • No spaces   → character-boundary wrap (CJK)
function _wrapSegment(segment, colPx) {
  const totalW = _measCtx.measureText(segment).width;
  if (totalW <= colPx) return 1;

  if (!segment.includes(' ')) return Math.max(1, Math.ceil(totalW / colPx));

  const spaceW = _measCtx.measureText(' ').width;
  let lines = 1, lineW = 0;
  for (const word of segment.split(' ')) {
    const wW = _measCtx.measureText(word).width;
    if (lineW === 0) {
      if (wW > colPx) { lines += Math.ceil(wW / colPx) - 1; lineW = wW % colPx || colPx; }
      else lineW = wW;
    } else if (lineW + spaceW + wW > colPx) {
      lines++;
      if (wW > colPx) { lines += Math.ceil(wW / colPx) - 1; lineW = wW % colPx || colPx; }
      else lineW = wW;
    } else {
      lineW += spaceW + wW;
    }
  }
  return lines;
}

// Estimate the total number of display lines for a cell value.
// colWidthChars is Excel's column width in Normal-font character units.
function measureTextLines(text, colWidthChars, fontSize, fontFamily) {
  if (text === null || text === undefined) return 1;
  const s = String(text);
  if (!s) return 1;

  // OOXML: contentPx = numChars × MDW − 5  (5 px grid/border padding each side)
  const colPx = Math.max(1, colWidthChars * _EXCEL_MDW - 5);
  _measCtx.font = `${fontSize}pt ${fontFamily}`;

  let total = 0;
  for (const segment of s.split('\n')) {
    if (!segment) { total += 1; continue; }
    total += _wrapSegment(segment, colPx);
  }
  return total;
}

// Extract plain-text display value from any ExcelJS cell value type.
function resolveDisplayValue(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'object') {
    if ('result'  in value) return value.result ?? '';
    if ('richText' in value) return value.richText.map(r => r.text).join('');
    if ('formula' in value) return '';
    if ('text'    in value) return value.text;
    return '';
  }
  return value;
}

// Row height (pt) required for one line at the given font size.
// Factor 1.35 matches Excel AutoFit for CJK fonts; minimum 15pt.
const lineHeightForSize = (fs) => Math.max(15, fs * 1.35);

// Guard against invalid color objects (e.g. {} or { argb: '' }) that would
// produce an empty <color/> element Excel rejects.
function _validColor(c) {
  if (c == null || typeof c !== 'object') return false;
  if (c.argb && typeof c.argb === 'string' && c.argb.length >= 6) return true;
  if (typeof c.theme   === 'number') return true;
  if (typeof c.indexed === 'number') return true;
  return false;
}
