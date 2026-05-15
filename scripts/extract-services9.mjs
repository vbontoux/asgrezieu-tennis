import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto('https://www.asgrezieutennis.com/services-9', { waitUntil: 'domcontentloaded', timeout: 20000 });
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
  const elements = document.querySelectorAll('h1, h2, h3, p');
  const seen = new Set();
  const results = [];
  elements.forEach(el => {
    const text = el.textContent?.trim();
    if (text && text.length > 2 && text.length < 500 && !seen.has(text)) {
      seen.add(text);
      results.push({ tag: el.tagName, text });
    }
  });
  return results;
});

console.log('=== IMAGES ===');
images.forEach(img => console.log(JSON.stringify(img)));
console.log('\n=== TEXTS ===');
texts.forEach(t => console.log(JSON.stringify(t)));
await browser.close();
