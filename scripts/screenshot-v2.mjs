// v2 verification screenshots: home desktop 1280 + mobile 390 full-page,
// plus book / gallery / pricing desktop captures. Also reports failed
// requests, console errors, broken images and 320px horizontal overflow.
import { chromium } from 'playwright-core';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const base = process.argv[2] ?? 'http://localhost:4321/';
const root = path.dirname(fileURLToPath(import.meta.url));
const exe = path.join(process.env.HOME ?? '', '.cache/ms-playwright/chromium-1255/chrome-linux64/chrome');

const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });

async function shot(page, url, out, width) {
  const failed = [];
  const errors = [];
  page.on('requestfailed', (r) => failed.push(r.url()));
  page.on('response', (r) => { if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`); });
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));
  const res = await page.goto(url, { waitUntil: 'networkidle' });
  // Slow scroll so lazy images + reveals all trigger.
  await page.evaluate(async () => {
    const h = document.body.scrollHeight;
    for (let y = 0; y <= h; y += 300) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
  });
  await page.waitForTimeout(1200);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(800);
  const broken = await page.evaluate(() =>
    [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.getAttribute('src')));
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  await page.screenshot({ path: path.join(root, '..', 'screenshots', out), fullPage: true });
  console.log(`${out} (${width}px) HTTP ${res?.status()} failed=${failed.length ? failed.join(' | ') : 'none'} consoleErrors=${errors.length ? errors.join(' | ') : 'none'} brokenImgs=${broken.length ? broken.join(', ') : 'none'} hOverflowPx=${overflow}`);
}

// Home
for (const [name, width] of [['v2-desktop', 1280], ['v2-mobile', 390]]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await shot(page, base, `${name}.png`, width);
  await page.close();
}
// Extra pages (desktop)
for (const [slug, out] of [['book/', 'v2-book.png'], ['gallery/', 'v2-gallery.png'], ['pricing/', 'v2-pricing.png'], ['weddings/', 'v2-weddings.png']]) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await shot(page, base + slug, out, 1280);
  await page.close();
}
// 320px overflow check (home + book)
for (const slug of ['', 'book/']) {
  const page = await browser.newPage({ viewport: { width: 320, height: 700 } });
  await page.goto(base + slug, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  console.log(`320px ${slug || 'home'} hOverflowPx=${overflow}`);
  await page.close();
}
await browser.close();
console.log('v2 screenshots saved.');
