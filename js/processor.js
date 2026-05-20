// ─── Core xlsx processing ─────────────────────────────────────────────────────
//
// PASS 1+2: ExcelJS reads the file — cell values, column widths, merge ranges,
//           font/alignment — and builds a per-cell plan.
// PASS 3:   patchXlsxZip() applies the plan directly into the original ZIP.
//           ExcelJS never writes anything; it is used read-only throughout.

async function processSingleFile(file, targetFont, alignMode) {
  const buf = await file.arrayBuffer();
  log(t().logRead((buf.byteLength / 1024).toFixed(1)));

  const wb = new ExcelJS.Workbook();
  await wb.xlsx.load(buf);
  log(t().logLoaded(wb.worksheets.length), 'ok');

  // sheetPatches: Map<sheetName, { cellStyleMap, rowHeightMap }>
  const sheetPatches = new Map();

  for (const ws of wb.worksheets) {

    // ── PASS 1: ANALYSE ───────────────────────────────────────────────────────
    // Collect merge ranges and original horizontal alignment. No mutations.

    const merges = [];
    try {
      const list = (ws.model && ws.model.merges) ? ws.model.merges : [];
      for (const m of list) {
        const [tl, br] = m.split(':');
        const tlCell = ws.getCell(tl);
        const brCell = br ? ws.getCell(br) : tlCell;
        merges.push({ minRow: tlCell.row, maxRow: brCell.row,
                      minCol: tlCell.col, maxCol: brCell.col });
      }
    } catch (e) {}

    const insideMerged = new Set(); // keys of slave cells (not the top-left master)
    const masterOf     = new Map(); // master cell key → merge descriptor

    for (const m of merges) {
      masterOf.set(`${m.minRow},${m.minCol}`, m);
      for (let r = m.minRow; r <= m.maxRow; r++)
        for (let c = m.minCol; c <= m.maxCol; c++)
          if (!(r === m.minRow && c === m.minCol)) insideMerged.add(`${r},${c}`);
    }

    const originalAlign = new Map(); // key → original horizontal alignment
    ws.eachRow({ includeEmpty: false }, (row, rowNum) => {
      row.eachCell({ includeEmpty: false }, (cell, colNum) => {
        if (cell.value !== null && cell.value !== undefined && cell.value !== '')
          originalAlign.set(`${rowNum},${colNum}`, (cell.alignment || {}).horizontal || 'general');
      });
    });

    // ── PASS 2: PLAN ──────────────────────────────────────────────────────────
    // For every master cell with content, compute target font + alignment and
    // estimate the number of wrapped lines for row-height calculation.

    const cellPlan = new Map();

    ws.eachRow({ includeEmpty: false }, (row, rowNum) => {
      row.eachCell({ includeEmpty: false }, (cell, colNum) => {
        if (cell.value === null || cell.value === undefined || cell.value === '') return;
        const key = `${rowNum},${colNum}`;
        if (insideMerged.has(key)) return; // slave cells share master's height

        // Resolve target alignment
        let plannedH, plannedV;
        if (alignMode === 'keep') {
          plannedH = originalAlign.get(key) || 'general';
          // ExcelJS maps OOXML 'center' → 'middle' internally; normalize back to OOXML
          const rawV = (cell.alignment || {}).vertical || 'center';
          plannedV = rawV === 'middle' ? 'center' : rawV;
        } else if (alignMode === 'left-center')  { plannedH = 'left';   plannedV = 'center'; }
        else if (alignMode === 'center-center')   { plannedH = 'center'; plannedV = 'center'; }
        else if (alignMode === 'right-center')    { plannedH = 'right';  plannedV = 'center'; }
        else { // auto: numbers → right, text → left
          plannedV = 'center';
          const isNum = typeof cell.value === 'number' || cell.value instanceof Date ||
            (cell.value && typeof cell.value === 'object' && typeof cell.value.result === 'number');
          plannedH = isNum ? 'right' : 'left';
        }

        const fs       = cell.font?.size || 11;
        const fontName = targetFont === 'keep' ? (cell.font?.name || 'Yu Gothic') : targetFont;
        const bold     = !!cell.font?.bold;
        const italic   = !!cell.font?.italic;
        const color    = _validColor(cell.font?.color) ? cell.font.color : null;
        const oldA     = cell.alignment || {};
        const tr       = oldA.textRotation != null ? oldA.textRotation : null;
        const indent   = oldA.indent       != null ? oldA.indent       : null;

        const displayVal = resolveDisplayValue(cell.value);
        if (!displayVal) {
          cellPlan.set(key, { neededLines: 1, rowSpan: 1, fontSize: fs,
            fontName, bold, italic, color, plannedH, plannedV, tr, indent });
          return;
        }

        // Sum column widths across the merged span (or just this column)
        const merge = masterOf.get(key);
        let baseW = 0, rowSpan = 1;
        if (merge) {
          for (let c = merge.minCol; c <= merge.maxCol; c++) baseW += (ws.getColumn(c).width || 8.43);
          rowSpan = merge.maxRow - merge.minRow + 1;
        } else {
          baseW = ws.getColumn(colNum).width || 8.43;
        }

        const neededLines = measureTextLines(displayVal, Math.max(2, baseW), fs, fontName);
        cellPlan.set(key, { neededLines, rowSpan, fontSize: fs,
          fontName, bold, italic, color, plannedH, plannedV, tr, indent });
      });
    });

    // ── PASS 3: BUILD PATCH MAPS ──────────────────────────────────────────────
    // Translate cellPlan into two flat maps that patchXlsxZip() applies
    // directly to the worksheet XML and styles.xml.

    const cellStyleMap = new Map(); // "B3" → style spec
    const rowHeightMap = new Map(); // rowNum → height (pt)
    let cellsInSheet = 0, wrappedCount = 0;

    ws.eachRow({ includeEmpty: false }, (row, rowNum) => {
      row.eachCell({ includeEmpty: false }, (cell, colNum) => {
        if (cell.value === null || cell.value === undefined || cell.value === '') return;
        const key  = `${rowNum},${colNum}`;
        if (insideMerged.has(key)) return; // slave cells don't need independent styles
        const plan = cellPlan.get(key);
        if (!plan) return;

        cellsInSheet++;
        if (plan.neededLines > 1) wrappedCount++;

        cellStyleMap.set(colIndexToLetter(colNum) + rowNum, {
          fontName: plan.fontName,
          fontSize: plan.fontSize,
          bold:     plan.bold,
          italic:   plan.italic,
          color:    plan.color,
          h:        plan.plannedH,
          v:        plan.plannedV, // 'center' (OOXML) not 'middle' (ExcelJS)
          wrap:     true,
          tr:       plan.tr,
          indent:   plan.indent,
        });

        const linesPerRow = Math.ceil(plan.neededLines / plan.rowSpan);
        const neededH     = linesPerRow * lineHeightForSize(plan.fontSize) + 2;
        for (let r = rowNum; r < rowNum + plan.rowSpan; r++) {
          const cur = rowHeightMap.get(r) || 0;
          if (cur < neededH) rowHeightMap.set(r, Math.min(neededH, 409));
        }
      });
    });

    sheetPatches.set(ws.name, { cellStyleMap, rowHeightMap });
    log(t().logSheet(ws.name, cellsInSheet, wrappedCount, rowHeightMap.size));
  }

  // Apply all patches directly into the original ZIP — no ExcelJS write phase.
  const outBuf  = await patchXlsxZip(buf, sheetPatches);
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

// Process all valid selected files sequentially to avoid download manager limits.
async function processWorkbooks() {
  const validFiles = selectedFiles.filter(e => !e.bad).map(e => e.file);
  if (validFiles.length === 0) return;

  logEl.innerHTML = '';
  processBtn.disabled = true;

  const targetFont = $('fontSelect').value;
  const alignMode  = $('alignSelect').value;

  log(t().logStart(targetFont, alignMode), 'ok');
  if (validFiles.length > 1) log(t().logBatchStart(validFiles.length), 'ok');

  let okCount = 0, failCount = 0;

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
