// ─── ZIP-level patching (openpyxl-equivalent surgical edit) ──────────────────
//
// Philosophy: use ExcelJS only for READING (cell values, column widths, merges).
// All writes go directly into the original ZIP via JSZip + DOMParser, touching
// only styles.xml and worksheet XMLs. Everything else — charts, pivot tables,
// drawings, named ranges — is preserved byte-for-byte from the original file.

const _SS_NS  = 'http://schemas.openxmlformats.org/spreadsheetml/2006/main';
const _REL_NS = 'http://schemas.openxmlformats.org/package/2006/relationships';
const _CT_NS  = 'http://schemas.openxmlformats.org/package/2006/content-types';
const _R_NS   = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';

function _parseXml(str) {
  return new DOMParser().parseFromString(str, 'application/xml');
}
function _serializeXml(doc) {
  return new XMLSerializer().serializeToString(doc);
}

// 1-based column index → Excel letter notation  (1→A, 26→Z, 27→AA …)
function colIndexToLetter(n) {
  let s = '';
  for (; n > 0; n = Math.floor((n - 1) / 26))
    s = String.fromCharCode(65 + ((n - 1) % 26)) + s;
  return s;
}

// Build Map: sheet display name → "xl/worksheets/sheetN.xml" path in the ZIP.
async function _buildSheetPathMap(zip) {
  const wbXml   = await zip.files['xl/workbook.xml'].async('text');
  const relsXml = await zip.files['xl/_rels/workbook.xml.rels'].async('text');
  const wbDoc   = _parseXml(wbXml);
  const rDoc    = _parseXml(relsXml);

  const ridToTarget = new Map();
  for (const r of Array.from(rDoc.getElementsByTagNameNS(_REL_NS, 'Relationship'))) {
    if ((r.getAttribute('Type') || '').endsWith('/worksheet'))
      ridToTarget.set(r.getAttribute('Id'), r.getAttribute('Target'));
  }

  const map = new Map();
  for (const s of Array.from(wbDoc.getElementsByTagNameNS(_SS_NS, 'sheet'))) {
    const name = s.getAttribute('name');
    const rid  = s.getAttributeNS(_R_NS, 'id');
    const tgt  = rid && ridToTarget.get(rid);
    if (!name || !tgt) continue;
    const path = tgt.startsWith('/') ? tgt.slice(1)
               : `xl/${tgt.replace(/^\.\.\//, '').replace(/^xl\//, '')}`;
    map.set(name, path);
  }
  return map;
}

// ─── StylePatcher ─────────────────────────────────────────────────────────────
// Direct patcher for xl/styles.xml.
// Only APPENDS new <font> and <xf> entries — never modifies existing ones,
// so every original cell style remains valid and unchanged.
class StylePatcher {
  constructor(stylesXml) {
    this.doc     = _parseXml(stylesXml);
    this.fontsEl = this.doc.getElementsByTagNameNS(_SS_NS, 'fonts')[0];
    this.xfsEl   = this.doc.getElementsByTagNameNS(_SS_NS, 'cellXfs')[0];
    this._fMap   = new Map(); // fontKey → fontId
    this._xMap   = new Map(); // xfKey  → xfIdx
    this._indexFonts();
    this._indexXfs();
  }

  _fKey(el) {
    const g = tag => {
      const n = el.getElementsByTagNameNS(_SS_NS, tag);
      return n.length ? (n[0].getAttribute('val') || '') : '';
    };
    const colorEl = el.getElementsByTagNameNS(_SS_NS, 'color')[0];
    let ck = '';
    if (colorEl) {
      const rgb     = colorEl.getAttribute('rgb');
      const theme   = colorEl.getAttribute('theme');
      const indexed = colorEl.getAttribute('indexed');
      if (rgb)     ck = `argb:${rgb}`;
      else if (theme   != null) ck = `theme:${theme}`;
      else if (indexed != null) ck = `idx:${indexed}`;
    }
    return `${g('name')}|${g('sz')}` +
           `|${el.getElementsByTagNameNS(_SS_NS, 'b').length ? '1' : '0'}` +
           `|${el.getElementsByTagNameNS(_SS_NS, 'i').length ? '1' : '0'}` +
           `|${ck}`;
  }

  _indexFonts() {
    Array.from(this.fontsEl.children).forEach((el, i) => this._fMap.set(this._fKey(el), i));
  }

  _xKey(el) {
    const al = el.getElementsByTagNameNS(_SS_NS, 'alignment')[0];
    return [
      el.getAttribute('fontId')   || '0', el.getAttribute('fillId')   || '0',
      el.getAttribute('borderId') || '0', el.getAttribute('numFmtId') || '0',
      el.getAttribute('xfId')     || '0',
      al ? (al.getAttribute('horizontal')   || '') : '',
      al ? (al.getAttribute('vertical')     || '') : '',
      al ? (al.getAttribute('wrapText')     || '') : '',
      al ? (al.getAttribute('textRotation') || '') : '',
      al ? (al.getAttribute('indent')       || '') : '',
    ].join('|');
  }

  _indexXfs() {
    Array.from(this.xfsEl.children).forEach((el, i) => this._xMap.set(this._xKey(el), i));
  }

  _colorKey(c) {
    if (!c) return '';
    if (c.argb)           return `argb:${c.argb}`;
    if (c.theme  != null) return `theme:${c.theme}`;
    if (c.indexed != null) return `idx:${c.indexed}`;
    return '';
  }

  _getOrCreateFont(name, size, bold, italic, color) {
    const ck  = this._colorKey(color);
    const key = `${name}|${size}|${bold ? '1' : '0'}|${italic ? '1' : '0'}|${ck}`;
    if (this._fMap.has(key)) return this._fMap.get(key);

    const f  = this.doc.createElementNS(_SS_NS, 'font');
    const sz = this.doc.createElementNS(_SS_NS, 'sz');
    sz.setAttribute('val', String(size));
    f.appendChild(sz);
    if (bold)   f.appendChild(this.doc.createElementNS(_SS_NS, 'b'));
    if (italic) f.appendChild(this.doc.createElementNS(_SS_NS, 'i'));
    if (color) {
      const colorEl = this.doc.createElementNS(_SS_NS, 'color');
      if (color.argb)            colorEl.setAttribute('rgb',     color.argb);
      else if (color.theme  != null) colorEl.setAttribute('theme',   String(color.theme));
      else if (color.indexed != null) colorEl.setAttribute('indexed', String(color.indexed));
      f.appendChild(colorEl);
    }
    const nm = this.doc.createElementNS(_SS_NS, 'name');
    nm.setAttribute('val', name);
    f.appendChild(nm);

    this.fontsEl.appendChild(f);
    const idx = this.fontsEl.children.length - 1;
    this.fontsEl.setAttribute('count', String(idx + 1));
    this._fMap.set(key, idx);
    return idx;
  }

  // Return (or create) a cellXfs index.
  // Preserves the original cell's fill/border/numFmt; replaces only font + alignment.
  getOrCreateXf(origIdx, fontName, fontSize, bold, italic, color, h, v, wrap, tr, indent) {
    const orig     = this.xfsEl.children[origIdx] || this.xfsEl.children[0];
    const fillId   = orig?.getAttribute('fillId')   || '0';
    const borderId = orig?.getAttribute('borderId') || '0';
    const numFmtId = orig?.getAttribute('numFmtId') || '0';
    const xfId     = orig?.getAttribute('xfId')     || '0';

    const applyFill   = orig?.getAttribute('applyFill')         || '';
    const applyBorder = orig?.getAttribute('applyBorder')       || '';
    const applyNumFmt = orig?.getAttribute('applyNumberFormat') || '';

    const fontId = this._getOrCreateFont(fontName, fontSize, !!bold, !!italic, color);
    const h_  = h || '', v_ = v || '', w_ = wrap ? '1' : '';
    const tr_ = tr     != null ? String(tr)     : '';
    const in_ = indent != null ? String(indent) : '';

    const key = `${fontId}|${fillId}|${borderId}|${numFmtId}|${xfId}|${h_}|${v_}|${w_}|${tr_}|${in_}`;
    if (this._xMap.has(key)) return this._xMap.get(key);

    const xf = this.doc.createElementNS(_SS_NS, 'xf');
    xf.setAttribute('numFmtId', numFmtId);
    xf.setAttribute('fontId',   String(fontId));
    xf.setAttribute('fillId',   fillId);
    xf.setAttribute('borderId', borderId);
    xf.setAttribute('xfId',     xfId);
    xf.setAttribute('applyFont',      '1');
    xf.setAttribute('applyAlignment', '1');
    if (applyFill)   xf.setAttribute('applyFill',         applyFill);
    if (applyBorder) xf.setAttribute('applyBorder',       applyBorder);
    if (applyNumFmt) xf.setAttribute('applyNumberFormat', applyNumFmt);

    const al = this.doc.createElementNS(_SS_NS, 'alignment');
    if (h_)  al.setAttribute('horizontal',   h_);
    if (v_)  al.setAttribute('vertical',     v_);
    if (w_)  al.setAttribute('wrapText',     '1');
    if (tr_) al.setAttribute('textRotation', tr_);
    if (in_) al.setAttribute('indent',       in_);
    xf.appendChild(al);

    this.xfsEl.appendChild(xf);
    const idx = this.xfsEl.children.length - 1;
    this.xfsEl.setAttribute('count', String(idx + 1));
    this._xMap.set(key, idx);
    return idx;
  }

  toXml() { return _serializeXml(this.doc); }
}

// Apply cell-style + row-height patches to one worksheet XML entry in the ZIP.
async function _patchWorksheet(zip, wsPath, cellStyleMap, rowHeightMap, patcher) {
  const wsXml = await zip.files[wsPath].async('text');
  const wsDoc = _parseXml(wsXml);

  // Index <c> and <row> elements for O(1) lookup by address / row number.
  const cellMap = new Map();
  for (const c of Array.from(wsDoc.getElementsByTagNameNS(_SS_NS, 'c')))
    cellMap.set(c.getAttribute('r'), c);

  const rowMap = new Map();
  for (const row of Array.from(wsDoc.getElementsByTagNameNS(_SS_NS, 'row')))
    rowMap.set(parseInt(row.getAttribute('r') || '0', 10), row);

  for (const [addr, spec] of cellStyleMap) {
    const cell = cellMap.get(addr);
    if (!cell) continue;
    const origIdx = parseInt(cell.getAttribute('s') || '0', 10);
    const newIdx  = patcher.getOrCreateXf(
      origIdx, spec.fontName, spec.fontSize, spec.bold, spec.italic, spec.color,
      spec.h, spec.v, spec.wrap, spec.tr, spec.indent
    );
    cell.setAttribute('s', String(newIdx));
  }

  for (const [rowNum, height] of rowHeightMap) {
    const row = rowMap.get(rowNum);
    if (row) { row.setAttribute('ht', height.toFixed(2)); row.setAttribute('customHeight', '1'); }
  }

  zip.file(wsPath, _serializeXml(wsDoc));
}

// Main entry: open the original ZIP and apply only the necessary patches.
// Everything not in cellStyleMap / rowHeightMap is preserved untouched.
async function patchXlsxZip(originalBuf, sheetPatches) {
  const zip          = await JSZip.loadAsync(originalBuf);
  const sheetPathMap = await _buildSheetPathMap(zip);
  const stylesXml    = await zip.files['xl/styles.xml'].async('text');
  const patcher      = new StylePatcher(stylesXml);

  for (const [name, { cellStyleMap, rowHeightMap }] of sheetPatches) {
    const path = sheetPathMap.get(name);
    if (path && zip.files[path])
      await _patchWorksheet(zip, path, cellStyleMap, rowHeightMap, patcher);
  }

  zip.file('xl/styles.xml', patcher.toXml());

  // Remove calcChain.xml — ExcelJS often generates stale formula-order data
  // that triggers "We found a problem" in Excel. Excel recalculates on first open.
  if (zip.files['xl/calcChain.xml']) {
    zip.remove('xl/calcChain.xml');
    const ctXml  = await zip.files['[Content_Types].xml'].async('text');
    const ctDoc  = _parseXml(ctXml);
    for (const el of Array.from(ctDoc.documentElement.getElementsByTagNameNS(_CT_NS, 'Override'))) {
      if (el.getAttribute('PartName') === '/xl/calcChain.xml')
        ctDoc.documentElement.removeChild(el);
    }
    zip.file('[Content_Types].xml', _serializeXml(ctDoc));
  }

  return zip.generateAsync({ type: 'arraybuffer', compression: 'DEFLATE' });
}
