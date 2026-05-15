// ─── i18n ───
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

// ─── Refs ───
const $ = (id) => document.getElementById(id);
const fileInput = $('fileInput');
const uploader = $('uploader');
const fileList = $('fileList');
const fileSummary = $('fileSummary');
const fileSummaryText = $('fileSummaryText');
const fileClearAll = $('fileClearAll');
const btnLabel = $('btnLabel');
const processBtn = $('processBtn');
const logEl = $('log');

let selectedFiles = [];

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

fileList.addEventListener('click', (e) => {
  const btn = e.target.closest('.file-clear');
  if (!btn) return;
  e.preventDefault(); e.stopPropagation();
  const idx = parseInt(btn.getAttribute('data-idx'), 10);
  if (!Number.isNaN(idx)) removeFileAt(idx);
});

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
  fileInput.value = '';
});

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

// ─── Helpers ───

const CJK_RE = /[\u3000-\u9fff\uff00-\uffef]/g;
function visualWidth(text) {
  if (!text) return 0;
  const s = String(text);
  const cjk = (s.match(CJK_RE) || []).length;
  return cjk * 2 + (s.length - cjk);
}

function estimateLines(text, colW) {
  if (text === null || text === undefined) return 1;
  const s = String(text);
  if (!s) return 1;
  const parts = s.split('\n');
  let total = 0;
  for (const part of parts) {
    if (!part) { total += 1; continue; }
    const w = visualWidth(part);
    total += Math.max(1, Math.ceil(w / Math.max(1, colW)));
  }
  return total;
}

function maxLineWidth(text) {
  if (!text) return 0;
  const parts = String(text).split('\n');
  let max = 0;
  for (const p of parts) {
    const w = visualWidth(p);
    if (w > max) max = w;
  }
  return max;
}

function resolveDisplayValue(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'object') {
    if ('result' in value) return value.result === null || value.result === undefined ? '' : value.result;
    if ('richText' in value) return value.richText.map(r => r.text).join('');
    if ('formula' in value) return '';
    if ('text' in value) return value.text;
    return '';
  }
  return value;
}

const lineHeightForSize = (fs) => Math.max(15, fs * 1.5);

// ─── Main: 3-pass processing ───
async function processSingleFile(file, targetFont, alignMode) {
  const buf = await file.arrayBuffer();
  log(t().logRead((buf.byteLength / 1024).toFixed(1)));

  const wb = new ExcelJS.Workbook();
  await wb.xlsx.load(buf);
  log(t().logLoaded(wb.worksheets.length), 'ok');

  for (const ws of wb.worksheets) {
      // ════════════════════════════════════════════════════
      // PASS 1: PHÂN TÍCH FILE (KHÔNG SỬA)
      // ════════════════════════════════════════════════════

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

      const hasContent = new Set();
      const originalAlign = new Map();
      const rowOriginalHeight = new Map();

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

      // ════════════════════════════════════════════════════
      // PASS 2: TÍNH wrap & chiều cao cần cho từng ô CÓ CONTENT
      //   Quy tắc: text vượt quá độ rộng cột gốc → BUỘC wrap
      //   (không cho tràn sang ô bên cạnh)
      // ════════════════════════════════════════════════════

      const cellPlan = new Map();

      ws.eachRow({ includeEmpty: false }, (row, rowNum) => {
        row.eachCell({ includeEmpty: false }, (cell, colNum) => {
          if (cell.value === null || cell.value === undefined || cell.value === '') return;
          const key = `${rowNum},${colNum}`;
          if (insideMerged.has(key)) return;

          // Tính alignment trước — không phụ thuộc vào displayVal
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
          } else { // auto
            plannedV = 'middle';
            const isNumber = typeof cell.value === 'number' ||
              cell.value instanceof Date ||
              (cell.value && typeof cell.value === 'object' && typeof cell.value.result === 'number');
            plannedH = isNumber ? 'right' : 'left';
          }

          const fs = (cell.font?.size) || 11;

          const displayVal = resolveDisplayValue(cell.value);
          if (displayVal === '' || displayVal === null) {
            // Ô có value nhưng display rỗng (vd: công thức trả về '') — vẫn lưu alignment
            cellPlan.set(key, { wrap: true, neededLines: 1, rowSpan: 1, fontSize: fs, plannedH, plannedV });
            return;
          }

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

          const usableBase = Math.max(2, baseW - 1);
          const wrap = true;
          const neededLines = estimateLines(displayVal, usableBase);

          cellPlan.set(key, { wrap, neededLines, rowSpan, fontSize: fs, plannedH, plannedV });
        });
      });

      // ════════════════════════════════════════════════════
      // PASS 3: ÁP DỤNG THAY ĐỔI
      // ════════════════════════════════════════════════════

      let cellsInSheet = 0;
      let wrappedCount = 0;
      const rowNeededHeight = new Map();

      ws.eachRow({ includeEmpty: false }, (row, rowNum) => {
        row.eachCell({ includeEmpty: false }, (cell, colNum) => {
          if (cell.value === null || cell.value === undefined || cell.value === '') return;
          cellsInSheet++;
          const key = `${rowNum},${colNum}`;

          // ─── Font ───
          const oldFont = cell.font || {};
          cell.font = {
            name: targetFont === 'keep' ? (oldFont.name || 'Yu Gothic') : targetFont,
            size: oldFont.size || 11,
            bold: oldFont.bold || false,
            italic: oldFont.italic || false,
            underline: oldFont.underline,
            strike: oldFont.strike,
            color: oldFont.color,
          };

          // ─── Cell bị merge che (slave) — áp dụng alignment theo option, wrapText luôn true ───
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
              horizontal: slaveH,
              vertical: slaveV,
              wrapText: true,
              textRotation: oldA.textRotation,
              indent: oldA.indent,
              shrinkToFit: false,
            };
            return;
          }

          const plan = cellPlan.get(key);
          if (!plan) return;

          // ─── Alignment — dùng plannedH/plannedV đã tính sẵn từ PASS 2 ───
          const oldAlign = cell.alignment || {};
          cell.alignment = {
            horizontal: plan.plannedH,
            vertical: plan.plannedV,
            wrapText: plan.wrap,
            textRotation: oldAlign.textRotation,
            indent: oldAlign.indent,
            shrinkToFit: false,
          };

          if (plan.wrap) wrappedCount++;

          // ─── Chiều cao cần — luôn tính để fit text (kể cả 1 dòng) ───
          {
            const linesPerRow = Math.ceil(plan.neededLines / plan.rowSpan);
            const perLine = lineHeightForSize(plan.fontSize);
            const neededH = linesPerRow * perLine + 2;

            for (let r = rowNum; r < rowNum + plan.rowSpan; r++) {
              const cur = rowNeededHeight.get(r) || 0;
              if (cur < neededH) rowNeededHeight.set(r, neededH);
            }
          }
        });
      });

      let changedRowCount = 0;
      for (const [rowNum, needed] of rowNeededHeight.entries()) {
        const h = Math.min(needed, 409);
        ws.getRow(rowNum).height = h;
        changedRowCount++;
      }

    log(t().logSheet(ws.name, cellsInSheet, wrappedCount, changedRowCount));
  }

  const outBuf = await wb.xlsx.writeBuffer();
  const outName = file.name.replace(/\.xlsx$/i, '') + '_fixed.xlsx';
  const blob = new Blob([outBuf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = outName;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);

  log(t().logDownloaded(outName), 'ok');
  return outName;
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function processWorkbooks() {
  const validFiles = selectedFiles.filter(e => !e.bad).map(e => e.file);
  if (validFiles.length === 0) return;

  logEl.innerHTML = '';
  processBtn.disabled = true;

  const targetFont = $('fontSelect').value;
  const alignMode = $('alignSelect').value;

  log(t().logStart(targetFont, alignMode), 'ok');
  if (validFiles.length > 1) log(t().logBatchStart(validFiles.length), 'ok');

  let okCount = 0;
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
    // Đệm nhỏ giữa các download để browser không chặn
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
