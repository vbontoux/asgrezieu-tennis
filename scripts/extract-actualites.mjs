import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto('https://www.asgrezieutennis.com/copie-de-%C3%A9venements', { waitUntil: 'domcontentloaded', timeout: 20000 });
await page.waitForTimeout(8000);

const texts = await page.evaluate(() => {
  const elements = document.querySelectorAll('h1, h2, h3, h4, p, span, td, th');
  const seen = new Set();
  const results = [];
  elements.forEach(el => {
    const text = el.textContent?.trim();
    if (text && text.length > 1 && text.length < 300 && !seen.has(text)) {
      seen.add(text);
      results.push({ tag: el.tagName, text });
    }
  });
  return results;
});

console.log('=== TEXTS ===');
texts.forEach(t => console.log(JSON.stringify(t)));
await browser.close();
