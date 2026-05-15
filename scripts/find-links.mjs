import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto('https://www.asgrezieutennis.com/', { waitUntil: 'domcontentloaded', timeout: 20000 });
await page.waitForTimeout(6000);
const links = await page.evaluate(() => {
  const all = Array.from(document.querySelectorAll('a[href]')).map(a => a.href);
  return [...new Set(all)].filter(h => h.includes('asgrezieutennis') && !h.includes('#'));
});
links.forEach(l => console.log(l));
await browser.close();
