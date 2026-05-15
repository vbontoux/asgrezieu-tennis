import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

// Try different possible URLs for the sponsoring page
const urls = [
  'https://www.asgrezieutennis.com/projects-4',
  'https://www.asgrezieutennis.com/projects-5',
  'https://www.asgrezieutennis.com/blank-1',
  'https://www.asgrezieutennis.com/blank-2',
  'https://www.asgrezieutennis.com/blank',
];

for (const url of urls) {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(5000);
  
  const title = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    return h1?.textContent?.trim() || '';
  });
  
  if (title && !title.includes('404')) {
    console.log(`Found page at: ${url}`);
    console.log(`Title: ${title}`);
    
    const images = await page.evaluate(() => {
      const imgs = document.querySelectorAll('img');
      return Array.from(imgs).map(img => ({
        src: img.src || img.dataset.src || '',
        alt: img.alt || '',
        width: img.naturalWidth,
        height: img.naturalHeight,
      })).filter(i => i.src && i.src.includes('wixstatic') && i.width > 50);
    });
    
    console.log('\n=== IMAGES ===');
    images.forEach(img => console.log(JSON.stringify(img)));
    break;
  } else {
    console.log(`${url} -> ${title || '404/empty'}`);
  }
}

await browser.close();
