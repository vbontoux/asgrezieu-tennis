import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

await page.goto('https://www.asgrezieutennis.com/', { waitUntil: 'domcontentloaded', timeout: 30000 });

// Wait for images to load
await page.waitForTimeout(8000);

// Get all image sources
const images = await page.evaluate(() => {
  const imgs = document.querySelectorAll('img');
  return Array.from(imgs).map(img => ({
    src: img.src || img.dataset.src || '',
    alt: img.alt || '',
    width: img.naturalWidth,
    height: img.naturalHeight,
  })).filter(i => i.src && i.src.includes('wixstatic'));
});

// Also get background images from CSS
const bgImages = await page.evaluate(() => {
  const elements = document.querySelectorAll('*');
  const bgs = [];
  elements.forEach(el => {
    const style = window.getComputedStyle(el);
    const bg = style.backgroundImage;
    if (bg && bg !== 'none' && bg.includes('wixstatic')) {
      const match = bg.match(/url\("?([^"]+)"?\)/);
      if (match) bgs.push(match[1]);
    }
  });
  return bgs;
});

console.log('=== IMAGES ===');
images.forEach(img => console.log(JSON.stringify(img)));
console.log('\n=== BACKGROUND IMAGES ===');
bgImages.forEach(url => console.log(url));

await browser.close();
