// ─── i18n ────────────────────────────────────────────────────────────────────
// All user-visible strings keyed by language code.
// String values are plain text; keys ending in a function accept parameters.
const I18N = {
  vi: {
    title: 'Sửa file xlsx<br>khi export từ <span class="em">Google Sheets</span><br><span class="strike">bị lệch font</span>',
    subtitle: 'Kéo thả file xlsx vào ô bên dưới. Tool thống nhất font, bật wrap text thông minh và tự co giãn chiều cao hàng để KHÔNG ô nào bị che text — giữ nguyên độ rộng cột.',
    issues: [
      { n: '01', t: 'Đảm bảo không có text bị che', f: '→ No clipping' },
      { n: '02', t: 'Wrap thông minh khi cần', f: '→ Smart wrap' },
      { n: '03', t: 'Vị trí chữ trong ô lộn xộn', f: '→ Align unified' },
      { n: '04', t: 'Font Nhật & Latin khác nhau', f: '→ One font for all' },
    ],
    dropText: 'Thả các file <span class="em">.xlsx</span> vào đây',
    dropHint: 'hoặc click để chọn nhiều file',
    settingFont: 'Font',
    settingAlign: 'Căn lề',
    helpFont: 'Chọn font chữ áp dụng cho toàn bộ file. Yu Gothic hỗ trợ đầy đủ ký tự tiếng Nhật và Latin, được khuyến nghị cho file xuất từ Google Sheets.',
    helpAlign: 'Cài đặt căn chỉnh ngang và dọc cho tất cả ô. "Tự động" căn trái cho ô chứa chữ, căn phải cho ô chứa số. "Giữ nguyên" giữ nguyên căn chỉnh hiện tại của từng ô.',
    fontKeep: 'Giữ nguyên font gốc',
    fontRecommended: 'Yu Gothic (khuyến nghị)',
    alignKeep: 'Giữ nguyên',
    alignLeftMiddle: 'Trái + Giữa',
    alignCenterMiddle: 'Giữa + Giữa',
    alignRightMiddle: 'Phải + Giữa',
    alignAuto: 'Tự động (text=trái, số=phải)',
    btnProcess: 'Xử lý & tải xuống',
    btnProcessMulti: (n) => `Xử lý ${n} file & tải xuống`,
    clearAll: 'Xoá tất cả',
    fileBad: 'Chỉ chấp nhận .xlsx',
    fileMeta: (kb) => `${kb} KB · SẴN SÀNG`,
    fileSummary: (count, kb) => `${count} file · ${kb} KB`,
    logStart: (font, align) => `Bắt đầu · font="${font}" · align=${align}`,
    logBatchStart: (n) => `Xử lý hàng loạt · ${n} file`,
    logFileStart: (idx, total, name) => `[${idx}/${total}] ${name}`,
    logRead: (kb) => `  Đã đọc file (${kb} KB)`,
    logLoaded: (n) => `  Workbook loaded · ${n} sheet(s)`,
    logSheet: (name, cells, wrapped, changed) => `    · ${name} → ${cells} ô · ${wrapped} ô wrap · ${changed} hàng tăng chiều cao`,
    logDownloaded: (name) => `  ✓ Đã tải xuống: ${name}`,
    logDone: 'Hoàn tất.',
    logBatchDone: (ok, fail) => fail > 0 ? `Hoàn tất · ${ok} thành công, ${fail} lỗi` : `Hoàn tất · ${ok} file`,
    logError: (m) => `  Lỗi: ${m}`,
  },
  ja: {
    title: 'Google Sheets から<br>書き出した <span class="em">xlsx</span> の<br><span class="strike">フォント崩れ</span>を修正',
    subtitle: 'xlsx ファイルを下の枠にドラッグ&ドロップしてください。フォント統一、スマート折り返し、行高さ自動調整で、テキストが切れるセルがないように処理します。列幅は維持されます。',
    issues: [
      { n: '01', t: 'テキストが切れないことを保証', f: '→ クリップなし' },
      { n: '02', t: '必要な時のみスマート折り返し', f: '→ スマート折返し' },
      { n: '03', t: 'セル内の文字位置がバラバラ', f: '→ 配置の統一' },
      { n: '04', t: '英数と日本語のフォントが違う', f: '→ フォント統一' },
    ],
    dropText: '<span class="em">.xlsx</span> ファイルをここへ',
    dropHint: 'またはクリックして複数選択',
    settingFont: 'フォント',
    settingAlign: 'データの配置',
    helpFont: 'ファイル全体に適用するフォントを選択します。Yu Gothic は日本語・英数字の両方を正しく表示でき、Google Sheets からの書き出しに推奨されます。',
    helpAlign: 'すべてのセルの横揃え・縦揃えを一括設定します。「自動」はテキストセルを左揃え・数値セルを右揃えにします。「そのまま維持」は既存の配置を保持します。',
    fontKeep: '元のフォントを維持',
    fontRecommended: 'Yu Gothic (推奨)',
    alignKeep: 'そのまま維持',
    alignLeftMiddle: '左揃え + 中央',
    alignCenterMiddle: '中央揃え + 中央',
    alignRightMiddle: '右揃え + 中央',
    alignAuto: '自動 (文字=左 / 数値=右)',
    btnProcess: '処理してダウンロード',
    btnProcessMulti: (n) => `${n} 件を処理してダウンロード`,
    clearAll: 'すべてクリア',
    fileBad: '.xlsx ファイルのみ対応',
    fileMeta: (kb) => `${kb} KB · 準備完了`,
    fileSummary: (count, kb) => `${count} 件 · ${kb} KB`,
    logStart: (font, align) => `処理開始 · フォント="${font}" · 配置=${align}`,
    logBatchStart: (n) => `バッチ処理開始 · ${n} 件`,
    logFileStart: (idx, total, name) => `[${idx}/${total}] ${name}`,
    logRead: (kb) => `  読み込み完了 (${kb} KB)`,
    logLoaded: (n) => `  ワークブック読込済 · ${n} シート`,
    logSheet: (name, cells, wrapped, changed) => `    · ${name} → ${cells} セル · ${wrapped} 折返し · ${changed} 行の高さ調整`,
    logDownloaded: (name) => `  ✓ ダウンロード完了: ${name}`,
    logDone: '完了。',
    logBatchDone: (ok, fail) => fail > 0 ? `完了 · 成功 ${ok} 件 / 失敗 ${fail} 件` : `完了 · ${ok} 件`,
    logError: (m) => `  エラー: ${m}`,
  },
};

let currentLang = 'ja';
const t = () => I18N[currentLang];

// Apply a language: update all data-i18n elements, rebuild the issues grid,
// and refresh the file list (button label changes per language).
function applyLang(lang) {
  currentLang = lang;
  document.body.setAttribute('data-lang', lang);
  document.documentElement.setAttribute('lang', lang);
  const dict = I18N[lang];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) el.textContent = dict[key];
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });

  document.getElementById('issues').innerHTML = dict.issues.map(i => `
    <div class="issue">
      <div class="issue-num">${i.n}</div>
      <div class="issue-text">${i.t}</div>
      <div class="issue-fix">${i.f}</div>
    </div>
  `).join('');

  document.querySelectorAll('.lang-switch button').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-lang') === lang);
  });

  renderFileList();
}

document.querySelectorAll('.lang-switch button').forEach(b => {
  b.addEventListener('click', () => applyLang(b.getAttribute('data-lang')));
});

// ─── DOM references ───────────────────────────────────────────────────────────
const $ = (id) => document.getElementById(id);
const fileInput      = $('fileInput');
const uploader       = $('uploader');
const fileList       = $('fileList');
const fileSummary    = $('fileSummary');
const fileSummaryText = $('fileSummaryText');
const fileClearAll   = $('fileClearAll');
const btnLabel       = $('btnLabel');
const processBtn     = $('processBtn');
const logEl          = $('log');

// ─── File state ───────────────────────────────────────────────────────────────
let selectedFiles = []; // Array of { file: File, bad: boolean }

// Append a timestamped line to the log panel.
function log(msg, type = '') {
  logEl.classList.add('active');
  const ts = new Date().toLocaleTimeString('en-GB');
  const line = document.createElement('div');
  line.className = 'line';
  line.innerHTML = `<span class="ts">${ts}</span><span class="msg ${type}">${msg}</span>`;
  logEl.appendChild(line);
  logEl.scrollTop = logEl.scrollHeight;
}

function isValidXlsx(file) {
  return file.name.toLowerCase().endsWith('.xlsx');
}

// Re-render the file list and update the process button state.
// Called whenever selectedFiles changes or the language switches.
function renderFileList() {
  const dict = t();
  fileList.innerHTML = '';

  if (selectedFiles.length === 0) {
    fileSummary.classList.remove('visible');
    btnLabel.textContent = dict.btnProcess;
    processBtn.disabled = true;
    return;
  }

  selectedFiles.forEach((entry, idx) => {
    const card = document.createElement('div');
    card.className = 'file-card' + (entry.bad ? ' bad' : '');
    const sizeKb = (entry.file.size / 1024).toFixed(1);
    const metaHtml = entry.bad
      ? dict.fileBad
      : `<span class="ok">●</span> ${dict.fileMeta(sizeKb)}`;
    card.innerHTML = `
      <div class="file-icon">XLSX</div>
      <div class="file-info">
        <div class="file-name"></div>
        <div class="file-meta">${metaHtml}</div>
      </div>
      <button class="file-clear" type="button" title="Clear" data-idx="${idx}">×</button>
    `;
    // Set file name via textContent to avoid XSS
    card.querySelector('.file-name').textContent = entry.file.name;
    fileList.appendChild(card);
  });

  const validCount = selectedFiles.filter(e => !e.bad).length;
  const totalKb = selectedFiles.reduce((s, e) => s + e.file.size, 0) / 1024;

  fileSummary.classList.add('visible');
  fileSummaryText.textContent = dict.fileSummary(selectedFiles.length, totalKb.toFixed(1));

  btnLabel.textContent = validCount > 1 ? dict.btnProcessMulti(validCount) : dict.btnProcess;
  processBtn.disabled = validCount === 0;
}

function clearAllFiles() {
  selectedFiles = [];
  fileInput.value = '';
  renderFileList();
}

function removeFileAt(idx) {
  selectedFiles.splice(idx, 1);
  renderFileList();
}

fileClearAll.addEventListener('click', (e) => {
  e.preventDefault(); e.stopPropagation();
  clearAllFiles();
});

// Delegate remove-button clicks inside the file list
fileList.addEventListener('click', (e) => {
  const btn = e.target.closest('.file-clear');
  if (!btn) return;
  e.preventDefault(); e.stopPropagation();
  const idx = parseInt(btn.getAttribute('data-idx'), 10);
  if (!Number.isNaN(idx)) removeFileAt(idx);
});

// ─── Drag-and-drop ────────────────────────────────────────────────────────────
['dragenter', 'dragover'].forEach(evt => {
  uploader.addEventListener(evt, (e) => { e.preventDefault(); uploader.classList.add('dragover'); });
});
['dragleave', 'drop'].forEach(evt => {
  uploader.addEventListener(evt, (e) => { e.preventDefault(); uploader.classList.remove('dragover'); });
});
uploader.addEventListener('drop', (e) => {
  const files = Array.from(e.dataTransfer.files || []);
  if (files.length) handleFiles(files);
});
fileInput.addEventListener('change', (e) => {
  const files = Array.from(e.target.files || []);
  if (files.length) handleFiles(files);
  fileInput.value = ''; // reset so the same file can be re-selected
});

// Add files to selectedFiles, skipping exact duplicates (name + size + mtime).
function handleFiles(files) {
  for (const file of files) {
    const dup = selectedFiles.some(e =>
      e.file.name === file.name &&
      e.file.size === file.size &&
      e.file.lastModified === file.lastModified
    );
    if (dup) continue;
    selectedFiles.push({ file, bad: !isValidXlsx(file) });
  }
  renderFileList();
}

// ─── Text measurement helpers ─────────────────────────────────────────────────

// Reusable Canvas 2D context — used only for measureText(), never rendered.
const _measCtx = document.createElement('canvas').getContext('2d');

// Max-digit width (MDW): pixel width of '0' in Excel's Normal font (Calibri 11pt).
// Excel column width is expressed in units of this character width, so MDW is
// the conversion factor from Excel char units → CSS pixels.
const _normalMDW = (() => {
  _measCtx.font = '11pt Calibri, Arial, sans-serif';
  return _measCtx.measureText('0').width;
})();

// Count the number of wrapped lines for a single text segment (no newlines).
// Mimics Excel's word-wrap rules:
//   • Segments containing spaces  → break on word boundaries (Latin style)
//   • Segments with no spaces     → break at any character boundary (CJK style)
// If a single word is wider than colPx, it is further split at character boundaries.
function _wrapSegment(segment, colPx) {
  const totalW = _measCtx.measureText(segment).width;
  if (totalW <= colPx) return 1; // fits on one line — fast path

  // No spaces: pure CJK or single long token — divide by column width
  if (!segment.includes(' ')) return Math.max(1, Math.ceil(totalW / colPx));

  // Word-wrap simulation
  const spaceW = _measCtx.measureText(' ').width;
  let lines = 1;
  let lineW = 0;
  for (const word of segment.split(' ')) {
    const wW = _measCtx.measureText(word).width;
    if (lineW === 0) {
      if (wW > colPx) {
        // Word itself overflows — split it at character boundaries
        const extra = Math.ceil(wW / colPx) - 1;
        lines += extra;
        lineW = wW % colPx || colPx; // remaining width on the last overflow line
      } else {
        lineW = wW;
      }
    } else if (lineW + spaceW + wW > colPx) {
      // Word does not fit on current line — start a new one
      lines++;
      if (wW > colPx) {
        const extra = Math.ceil(wW / colPx) - 1;
        lines += extra;
        lineW = wW % colPx || colPx;
      } else {
        lineW = wW;
      }
    } else {
      lineW += spaceW + wW;
    }
  }
  return lines;
}

// Estimate the total number of display lines for a cell value,
// using the cell's actual font family and size for accurate measurement.
// colWidthChars is Excel's column width in Normal-font character units.
function measureTextLines(text, colWidthChars, fontSize, fontFamily) {
  if (text === null || text === undefined) return 1;
  const s = String(text);
  if (!s) return 1;

  // Convert column width to pixels; subtract 1 char unit for Excel's cell padding
  const colPx = Math.max(1, (colWidthChars - 1) * _normalMDW);
  _measCtx.font = `${fontSize}pt ${fontFamily}`;

  let total = 0;
  for (const segment of s.split('\n')) {
    // Explicit line breaks (Alt+Enter in Excel) always count as a new line
    if (!segment) { total += 1; continue; }
    total += _wrapSegment(segment, colPx);
  }
  return total;
}

// Extract the plain-text display value from any ExcelJS cell value type.
// Handles formulas (use result), rich text (join runs), hyperlinks, and primitives.
function resolveDisplayValue(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'object') {
    if ('result' in value) return value.result === null || value.result === undefined ? '' : value.result;
    if ('richText' in value) return value.richText.map(r => r.text).join('');
    if ('formula' in value) return ''; // formula with no cached result
    if ('text' in value) return value.text;
    return '';
  }
  return value;
}

// Row height (in points) required for N lines of a given font size.
// Factor 1.35 matches Excel's AutoFit behaviour for CJK fonts (Yu Gothic ~15pt/line at 11pt).
// Minimum 15pt prevents excessively short rows for small font sizes.
const lineHeightForSize = (fs) => Math.max(15, fs * 1.35);

// ─── Core xlsx processing ─────────────────────────────────────────────────────

// Process a single .xlsx file through three read-only → plan → write passes,
// then trigger a browser download of the fixed file.
async function processSingleFile(file, targetFont, alignMode) {
  const buf = await file.arrayBuffer();
  log(t().logRead((buf.byteLength / 1024).toFixed(1)));

  const wb = new ExcelJS.Workbook();
  await wb.xlsx.load(buf);
  log(t().logLoaded(wb.worksheets.length), 'ok');

  for (const ws of wb.worksheets) {

    // ── PASS 1: ANALYSE ───────────────────────────────────────────────────────
    // Read merge ranges, record original alignment and row heights.
    // No mutations happen here — data is collected for the planning pass.

    // Parse merge ranges from the worksheet model into structured objects
    const merges = [];
    try {
      const list = (ws.model && ws.model.merges) ? ws.model.merges : [];
      for (const m of list) {
        const [tl, br] = m.split(':');
        const tlCell = ws.getCell(tl);
        const brCell = br ? ws.getCell(br) : tlCell;
        merges.push({
          minRow: tlCell.row, maxRow: brCell.row,
          minCol: tlCell.col, maxCol: brCell.col,
        });
      }
    } catch (e) {}

    // insideMerged: keys of slave cells (all cells except the top-left master)
    // masterOf: maps a master cell key → its merge descriptor
    const insideMerged = new Set();
    const masterOf = new Map();
    for (const m of merges) {
      masterOf.set(`${m.minRow},${m.minCol}`, m);
      for (let r = m.minRow; r <= m.maxRow; r++) {
        for (let c = m.minCol; c <= m.maxCol; c++) {
          if (!(r === m.minRow && c === m.minCol)) insideMerged.add(`${r},${c}`);
        }
      }
    }

    const hasContent       = new Set();
    const originalAlign    = new Map(); // key → original horizontal alignment string
    const rowOriginalHeight = new Map(); // rowNum → original height in points

    ws.eachRow({ includeEmpty: false }, (row, rowNum) => {
      rowOriginalHeight.set(rowNum, row.height || 15);
      row.eachCell({ includeEmpty: false }, (cell, colNum) => {
        if (cell.value !== null && cell.value !== undefined && cell.value !== '') {
          hasContent.add(`${rowNum},${colNum}`);
          const a = cell.alignment || {};
          originalAlign.set(`${rowNum},${colNum}`, a.horizontal || 'general');
        }
      });
    });

    // ── PASS 2: PLAN ──────────────────────────────────────────────────────────
    // For every master cell with content, calculate:
    //   • target horizontal / vertical alignment
    //   • number of wrapped lines (using Canvas text measurement)
    // Results are stored in cellPlan; no worksheet mutations yet.

    const cellPlan = new Map(); // key → { wrap, neededLines, rowSpan, fontSize, plannedH, plannedV }

    ws.eachRow({ includeEmpty: false }, (row, rowNum) => {
      row.eachCell({ includeEmpty: false }, (cell, colNum) => {
        if (cell.value === null || cell.value === undefined || cell.value === '') return;
        const key = `${rowNum},${colNum}`;
        if (insideMerged.has(key)) return; // slave cells are handled in PASS 3

        // Resolve target alignment — independent of the cell's display value
        let plannedH, plannedV;
        if (alignMode === 'keep') {
          plannedH = originalAlign.get(key) || 'general';
          plannedV = (cell.alignment || {}).vertical || 'middle';
        } else if (alignMode === 'left-center') {
          plannedH = 'left'; plannedV = 'middle';
        } else if (alignMode === 'center-center') {
          plannedH = 'center'; plannedV = 'middle';
        } else if (alignMode === 'right-center') {
          plannedH = 'right'; plannedV = 'middle';
        } else { // auto: numbers → right, everything else → left
          plannedV = 'middle';
          const isNumber = typeof cell.value === 'number' ||
            cell.value instanceof Date ||
            (cell.value && typeof cell.value === 'object' && typeof cell.value.result === 'number');
          plannedH = isNumber ? 'right' : 'left';
        }

        const fs = (cell.font?.size) || 11;

        const displayVal = resolveDisplayValue(cell.value);
        if (displayVal === '' || displayVal === null) {
          // Cell has a value but renders empty (e.g. a formula returning '').
          // Still record alignment so PASS 3 can apply it correctly.
          cellPlan.set(key, { wrap: true, neededLines: 1, rowSpan: 1, fontSize: fs, plannedH, plannedV });
          return;
        }

        // For merged cells, sum the width of all spanned columns
        const merge = masterOf.get(key);
        let baseW = 0;
        let rowSpan = 1;
        if (merge) {
          for (let c = merge.minCol; c <= merge.maxCol; c++) {
            baseW += (ws.getColumn(c).width || 8.43);
          }
          rowSpan = merge.maxRow - merge.minRow + 1;
        } else {
          baseW = ws.getColumn(colNum).width || 8.43;
        }

        // Subtract 1 char unit to account for Excel's internal cell padding
        const usableBase = Math.max(2, baseW - 1);
        const fontName = targetFont === 'keep' ? (cell.font?.name || 'Yu Gothic') : targetFont;
        const neededLines = measureTextLines(displayVal, usableBase, fs, fontName);

        cellPlan.set(key, { wrap: true, neededLines, rowSpan, fontSize: fs, plannedH, plannedV });
      });
    });

    // ── PASS 3: APPLY ─────────────────────────────────────────────────────────
    // Write font, alignment (wrapText = true), and row heights to the workbook.
    // Row height is the maximum required height across all cells in that row.

    let cellsInSheet  = 0;
    let wrappedCount  = 0;
    const rowNeededHeight = new Map(); // rowNum → max required height in points

    ws.eachRow({ includeEmpty: false }, (row, rowNum) => {
      row.eachCell({ includeEmpty: false }, (cell, colNum) => {
        if (cell.value === null || cell.value === undefined || cell.value === '') return;
        cellsInSheet++;
        const key = `${rowNum},${colNum}`;

        // Apply font — preserve all decorative properties, only change the name
        const oldFont = cell.font || {};
        cell.font = {
          name:      targetFont === 'keep' ? (oldFont.name || 'Yu Gothic') : targetFont,
          size:      oldFont.size || 11,
          bold:      oldFont.bold || false,
          italic:    oldFont.italic || false,
          underline: oldFont.underline,
          strike:    oldFont.strike,
          color:     oldFont.color,
        };

        // Slave cells of a merge range: apply alignment option and force wrapText.
        // Height is driven by the master cell, so no height calculation here.
        if (insideMerged.has(key)) {
          const oldA = cell.alignment || {};
          let slaveH, slaveV;
          if (alignMode === 'keep') {
            slaveH = oldA.horizontal || 'general'; slaveV = oldA.vertical || 'middle';
          } else if (alignMode === 'left-center') {
            slaveH = 'left'; slaveV = 'middle';
          } else if (alignMode === 'center-center') {
            slaveH = 'center'; slaveV = 'middle';
          } else if (alignMode === 'right-center') {
            slaveH = 'right'; slaveV = 'middle';
          } else { // auto
            slaveH = oldA.horizontal || 'general'; slaveV = 'middle';
          }
          cell.alignment = {
            horizontal:   slaveH,
            vertical:     slaveV,
            wrapText:     true,
            textRotation: oldA.textRotation,
            indent:       oldA.indent,
            shrinkToFit:  false,
          };
          return;
        }

        const plan = cellPlan.get(key);
        if (!plan) return;

        // Apply alignment using values pre-computed in PASS 2
        const oldAlign = cell.alignment || {};
        cell.alignment = {
          horizontal:   plan.plannedH,
          vertical:     plan.plannedV,
          wrapText:     plan.wrap,
          textRotation: oldAlign.textRotation,
          indent:       oldAlign.indent,
          shrinkToFit:  false,
        };

        if (plan.wrap) wrappedCount++;

        // Compute the required row height for this cell and propagate it to
        // all rows spanned by the merge (rowSpan = 1 for non-merged cells).
        {
          const linesPerRow = Math.ceil(plan.neededLines / plan.rowSpan);
          const perLine     = lineHeightForSize(plan.fontSize);
          const neededH     = linesPerRow * perLine + 2; // +2pt for top/bottom cell padding

          for (let r = rowNum; r < rowNum + plan.rowSpan; r++) {
            const cur = rowNeededHeight.get(r) || 0;
            if (cur < neededH) rowNeededHeight.set(r, neededH);
          }
        }
      });
    });

    // Apply the computed heights; cap at Excel's maximum row height of 409pt
    let changedRowCount = 0;
    for (const [rowNum, needed] of rowNeededHeight.entries()) {
      ws.getRow(rowNum).height = Math.min(needed, 409);
      changedRowCount++;
    }

    log(t().logSheet(ws.name, cellsInSheet, wrappedCount, changedRowCount));
  }

  // Serialise the modified workbook and trigger a browser download
  const outBuf  = await wb.xlsx.writeBuffer();
  const outName = file.name.replace(/\.xlsx$/i, '') + '_fixed.xlsx';
  const blob    = new Blob([outBuf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url     = URL.createObjectURL(blob);
  const a       = document.createElement('a');
  a.href = url; a.download = outName;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);

  log(t().logDownloaded(outName), 'ok');
  return outName;
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// Entry point: collect valid files, process them sequentially, then re-enable the button.
// Sequential (not parallel) to avoid overwhelming the browser's download manager.
async function processWorkbooks() {
  const validFiles = selectedFiles.filter(e => !e.bad).map(e => e.file);
  if (validFiles.length === 0) return;

  logEl.innerHTML = '';
  processBtn.disabled = true;

  const targetFont = $('fontSelect').value;
  const alignMode  = $('alignSelect').value;

  log(t().logStart(targetFont, alignMode), 'ok');
  if (validFiles.length > 1) log(t().logBatchStart(validFiles.length), 'ok');

  let okCount   = 0;
  let failCount = 0;

  for (let i = 0; i < validFiles.length; i++) {
    const file = validFiles[i];
    log(t().logFileStart(i + 1, validFiles.length, file.name));
    try {
      await processSingleFile(file, targetFont, alignMode);
      okCount++;
    } catch (err) {
      console.error(err);
      log(t().logError(err.message), 'err');
      failCount++;
    }
    // Small delay between downloads so the browser does not block them
    if (i < validFiles.length - 1) await sleep(250);
  }

  if (validFiles.length > 1) {
    log(t().logBatchDone(okCount, failCount), failCount > 0 ? 'warn' : 'ok');
  } else {
    log(t().logDone, 'ok');
  }

  processBtn.disabled = false;
}

processBtn.addEventListener('click', processWorkbooks);

applyLang('ja');
