import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

// Page Entrainements
await page.goto('https://www.asgrezieutennis.com/copie-de-entrainements', { waitUntil: 'domcontentloaded', timeout: 20000 });
await page.waitForTimeout(6000);
let texts = await page.evaluate(() => {
  const seen = new Set();
  return Array.from(document.querySelectorAll('h1, h2, h3, p')).map(el => ({ tag: el.tagName, text: el.textContent?.trim() })).filter(t => t.text && t.text.length > 2 && t.text.length < 300 && !seen.has(t.text) && (seen.add(t.text), true));
});
console.log('=== PAGE: ENTRAINEMENTS ===');
texts.forEach(t => console.log(JSON.stringify(t)));

// Page Actualités (copie-de-galerie-photo)
await page.goto('https://www.asgrezieutennis.com/copie-de-galerie-photo', { waitUntil: 'domcontentloaded', timeout: 20000 });
await page.waitForTimeout(6000);
texts = await page.evaluate(() => {
  const seen = new Set();
  return Array.from(document.querySelectorAll('h1, h2, h3, p')).map(el => ({ tag: el.tagName, text: el.textContent?.trim() })).filter(t => t.text && t.text.length > 2 && t.text.length < 300 && !seen.has(t.text) && (seen.add(t.text), true));
});
console.log('\n=== PAGE: GALERIE PHOTO / ACTUALITES ===');
texts.forEach(t => console.log(JSON.stringify(t)));

// Page Infos & Contacts
await page.goto('https://www.asgrezieutennis.com/copie-de-conseil-d-administration', { waitUntil: 'domcontentloaded', timeout: 20000 });
await page.waitForTimeout(6000);
texts = await page.evaluate(() => {
  const seen = new Set();
  return Array.from(document.querySelectorAll('h1, h2, h3, p')).map(el => ({ tag: el.tagName, text: el.textContent?.trim() })).filter(t => t.text && t.text.length > 2 && t.text.length < 300 && !seen.has(t.text) && (seen.add(t.text), true));
});
console.log('\n=== PAGE: INFOS & CONTACTS ===');
texts.forEach(t => console.log(JSON.stringify(t)));

await browser.close();
