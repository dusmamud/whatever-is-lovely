// v3 final-polish verification: overflow/overlap sweep across widths + pages,
// plus targeted checks for the four sweep fixes (home polaroids 768-933,
// book H1 at 320, back-to-top vs sticky bar, footer socials behind the bar).
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
  await page.evaluate(async () => {
    const h = document.body.scrollHeight;
    for (let y = 0; y <= h; y += 300) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
  });
  await page.waitForTimeout(1200);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(800);
  const broken = await page.evaluate(() =>
    [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.getAttribute('src')));
  const ov = await page.evaluate(() => ({
    doc: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    body: document.body.scrollWidth - document.documentElement.clientWidth,
  }));
  await page.screenshot({ path: path.join(root, '..', 'screenshots', out), fullPage: true });
  console.log(`${out} (${width}px) HTTP ${res?.status()} failed=${failed.length ? failed.join(' | ') : 'none'} consoleErrors=${errors.length ? errors.join(' | ') : 'none'} brokenImgs=${broken.length ? broken.join(', ') : 'none'} docOverflow=${ov.doc} bodyOverflow=${ov.body}`);
}

// Home at the key widths (v3 desktop + mobile deliverables)
for (const [name, width] of [['v3-desktop', 1280], ['v3-home-768', 768], ['v3-mobile', 390], ['v3-home-320', 320]]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await shot(page, base, `${name}.png`, width);
  await page.close();
}
// Other pages at 390 + 1280
for (const [slug, out] of [['book/', 'v3-book'], ['pricing/', 'v3-pricing'], ['weddings/', 'v3-weddings'], ['gallery/', 'v3-gallery'], ['blog/', 'v3-blog']]) {
  for (const [width, suffix] of [[390, '390'], [1280, '1280']]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await shot(page, base + slug, `${out}-${suffix}.png`, width);
    await page.close();
  }
}
// Targeted probes
// 1. Home polaroids at 800px (middle of the old 768-933 broken range)
{
  const page = await browser.newPage({ viewport: { width: 800, height: 900 } });
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const r = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll('img')].filter((i) => (i.alt || '').includes('string lights') || (i.alt || '').includes('confetti'));
    const vw = document.documentElement.clientWidth;
    return {
      bodyOverflow: document.body.scrollWidth - vw,
      polaroids: imgs.map((i) => { const b = i.getBoundingClientRect(); return { alt: i.alt.slice(0, 20), right: Math.round(b.right), visible: b.right <= vw }; }),
    };
  });
  console.log('probe home-800 polaroids:', JSON.stringify(r));
  await page.close();
}
// 2. Book H1 at 320px — full word visible?
{
  const page = await browser.newPage({ viewport: { width: 320, height: 700 } });
  await page.goto(base + 'book/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const r = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    const b = h1.getBoundingClientRect();
    return { h1Right: Math.round(b.right), vw: document.documentElement.clientWidth, bodyOverflow: document.body.scrollWidth - document.documentElement.clientWidth, text: h1.textContent };
  });
  console.log('probe book-320 h1:', JSON.stringify(r));
  await page.close();
}
// 3. Mobile bottom: back-to-top vs sticky bar + footer socials at 390px
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.evaluate(async () => { window.scrollTo(0, document.body.scrollHeight); });
  await page.waitForTimeout(1500);
  const r = await page.evaluate(() => {
    const bar = document.querySelector('.fixed.inset-x-0.bottom-0');
    const top = document.querySelector('#back-to-top');
    const socials = [...document.querySelectorAll('footer a[aria-label], footer a[href*="instagram"], footer a[href*="pinterest"], footer a[href*="facebook"], footer a[href*="tiktok"]')];
    const barRect = bar ? bar.getBoundingClientRect() : null;
    const topRect = top ? top.getBoundingClientRect() : null;
    const overlaps = (a, b) => a && b && !(a.right <= b.left || a.left >= b.right || a.bottom <= b.top || a.top >= b.bottom);
    return {
      barHeight: barRect ? Math.round(barRect.height) : null,
      backToTopBottom: topRect ? Math.round(topRect.bottom) : null,
      backToTopOverlapsBar: overlaps(topRect, barRect),
      socialsHiddenBehindBar: socials.map((s) => { const b = s.getBoundingClientRect(); return overlaps(b, barRect); }),
      socialCount: socials.length,
    };
  });
  console.log('probe mobile-bottom 390:', JSON.stringify(r));
  await page.close();
}
await browser.close();
console.log('v3 screenshots saved.');
