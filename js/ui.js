// ─── DOM references ───────────────────────────────────────────────────────────
const $ = (id) => document.getElementById(id);
const fileInput       = $('fileInput');
const uploader        = $('uploader');
const fileList        = $('fileList');
const fileSummary     = $('fileSummary');
const fileSummaryText = $('fileSummaryText');
const fileClearAll    = $('fileClearAll');
const btnLabel        = $('btnLabel');
const processBtn      = $('processBtn');
const logEl           = $('log');

// ─── Log panel ────────────────────────────────────────────────────────────────
function log(msg, type = '') {
  logEl.classList.add('active');
  const ts = new Date().toLocaleTimeString('en-GB');
  const line = document.createElement('div');
  line.className = 'line';
  line.innerHTML = `<span class="ts">${ts}</span><span class="msg ${type}">${msg}</span>`;
  logEl.appendChild(line);
  logEl.scrollTop = logEl.scrollHeight;
}

// ─── File state ───────────────────────────────────────────────────────────────
let selectedFiles = []; // Array of { file: File, bad: boolean }

function isValidXlsx(file) {
  return file.name.toLowerCase().endsWith('.xlsx');
}

// Re-render the file list and update the process button state.
function renderFileList() {
  const dict = t(); // t() defined in i18n.js
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
  const totalKb    = selectedFiles.reduce((s, e) => s + e.file.size, 0) / 1024;

  fileSummary.classList.add('visible');
  fileSummaryText.textContent = dict.fileSummary(selectedFiles.length, totalKb.toFixed(1));
  btnLabel.textContent = validCount > 1 ? dict.btnProcessMulti(validCount) : dict.btnProcess;
  processBtn.disabled  = validCount === 0;
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

// Add files, skipping exact duplicates (name + size + mtime).
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

// ─── Event listeners ──────────────────────────────────────────────────────────
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
