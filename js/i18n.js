// ─── i18n ────────────────────────────────────────────────────────────────────
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

  renderFileList(); // defined in ui.js
}

document.querySelectorAll('.lang-switch button').forEach(b => {
  b.addEventListener('click', () => applyLang(b.getAttribute('data-lang')));
});
