import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

await page.goto('https://www.asgrezieutennis.com/sponsoring', { waitUntil: 'domcontentloaded', timeout: 30000 });
await page.waitForTimeout(8000);

const images = await page.evaluate(() => {
  const imgs = document.querySelectorAll('img');
  return Array.from(imgs).map(img => ({
    src: img.src || img.dataset.src || '',
    alt: img.alt || '',
    width: img.naturalWidth,
    height: img.naturalHeight,
  })).filter(i => i.src && i.src.includes('wixstatic') && i.width > 50);
});

const texts = await page.evaluate(() => {
  const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span');
  return Array.from(elements)
    .map(el => ({ tag: el.tagName, text: el.textContent?.trim() }))
    .filter(t => t.text && t.text.length > 2 && t.text.length < 300);
});

console.log('=== IMAGES ===');
images.forEach(img => console.log(JSON.stringify(img)));
console.log('\n=== TEXTS ===');
// Deduplicate
const seen = new Set();
texts.forEach(t => {
  const key = t.tag + ':' + t.text;
  if (!seen.has(key)) {
    seen.add(key);
    console.log(JSON.stringify(t));
  }
});

await browser.close();
