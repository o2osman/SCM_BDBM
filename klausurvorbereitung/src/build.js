// Rendert die HTML-Quellen mit Chromium (Playwright) zu PDF.
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const name of ['lehrplan', 'uebungsaufgaben']) {
    await page.goto('file://' + path.join(__dirname, name + '.html'));
    await page.pdf({
      path: path.join(__dirname, '..', name + '.pdf'),
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: '<span></span>',
      footerTemplate: '<div style="font-size:7pt;width:100%;text-align:center;color:#888;">Seite <span class="pageNumber"></span> / <span class="totalPages"></span></div>',
      margin: { top: '16mm', bottom: '16mm', left: '15mm', right: '15mm' },
    });
  }
  await browser.close();
})();
