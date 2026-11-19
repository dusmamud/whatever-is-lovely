// Full-page screenshots (desktop 1280 + mobile 390) against a running
// `astro preview` server. Run: node scripts/screenshot.mjs [baseUrl]
// Playwright quirk: headless-shell download fails; use the full chromium
// executable from ~/.cache/ms-playwright/chromium-1255/chrome-linux64/chrome.
// /opt/meta-chromium/chrome gives a policy error — do not use it.
import { chromium } from 'playwright-core';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const base = process.argv[2] ?? 'http://localhost:4321/';
const root = path.dirname(fileURLToPath(import.meta.url));
const exe = path.join(process.env.HOME ?? '', '.cache/ms-playwright/chromium-1255/chrome-linux64/chrome');

const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
for (const [name, width] of [['desktop', 1280], ['mobile', 390]]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  const failed = [];
  page.on('requestfailed', (r) => failed.push(r.url()));
  page.on('response', (r) => { if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`); });
  const res = await page.goto(base, { waitUntil: 'networkidle' });
  console.log(name, 'HTTP', res?.status());
  await page.evaluate(async () => { await window.scrollTo(0, document.body.scrollHeight); });
  await page.waitForTimeout(1500);
  await page.evaluate(async () => { await window.scrollTo(0, 0); });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(root, '..', 'screenshots', `${name}.png`), fullPage: true });
  console.log(name, 'failed requests:', failed.length ? failed : 'none');
  await page.close();
}
await browser.close();
console.log('Screenshots saved to screenshots/.');
