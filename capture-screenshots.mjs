import puppeteer from 'puppeteer';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const OUTPUT_DIR = 'C:\\Users\\Admin\\OneDrive\\Desktop\\Devuron\\public\\projects';

const sites = [
  { url: 'https://priusfuture.com/', filename: 'priusfuture.webp' },
  { url: 'http://dr-talbeena.com/', filename: 'drtalbeena.webp' },
  { url: 'https://vantage-productions.com/', filename: 'vantage-productions.webp' },
  { url: 'https://daral-asala-app.zalvant.com/', filename: 'daralasala.webp' },
  { url: 'https://www.glutaskinwhite.com/', filename: 'glutaskinwhite.webp' },
  { url: 'https://vidasteakhouse.com/', filename: 'vidasteakhouse.webp' },
  { url: 'https://jsjunkcarbuyer.com/', filename: 'jsjunkcarbuyer.webp' },
  { url: 'https://sharkcarpetandfloorcleaning.com/', filename: 'sharkcarpetflooring.webp' },
  { url: 'https://sellanycarcash.com/', filename: 'sellanycarcash.webp' },
  { url: 'https://independentgaragedoorrepair.com/', filename: 'independentgaragedoor.webp' },
  { url: 'https://mspkeysandremotes.com/', filename: 'mspkeysandremotes.webp' },
  { url: 'https://eastbaymotorcycletow.com/', filename: 'eastbaymotorcycletow.webp' },
  { url: 'https://hawktowingandauto.com/', filename: 'hawktowingauto.webp' },
];

async function captureFullPage(browser, { url, filename }) {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1440, height: 900 });
    console.log(`\n→ Loading: ${url}`);
    
    await page.goto(url, { 
      waitUntil: 'networkidle2', 
      timeout: 30000 
    });
    
    // Wait extra time for animations/lazy loading
    await new Promise(r => setTimeout(r, 2000));
    
    // Scroll to trigger lazy-loaded images
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 300;
        const timer = setInterval(() => {
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= document.body.scrollHeight) {
            clearInterval(timer);
            window.scrollTo(0, 0);
            resolve();
          }
        }, 100);
      });
    });
    
    await new Promise(r => setTimeout(r, 1500));
    
    const outputPath = join(OUTPUT_DIR, filename);
    await page.screenshot({
      path: outputPath,
      fullPage: true,
      type: 'webp',
      quality: 85,
    });
    
    console.log(`✓ Saved: ${filename}`);
    return { success: true, filename };
  } catch (err) {
    console.log(`✗ Failed: ${filename} — ${err.message}`);
    return { success: false, filename, error: err.message };
  } finally {
    await page.close();
  }
}

async function main() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const results = [];
  for (const site of sites) {
    const result = await captureFullPage(browser, site);
    results.push(result);
  }

  await browser.close();

  console.log('\n\n=== RESULTS ===');
  const succeeded = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  console.log(`Succeeded: ${succeeded.length}/${sites.length}`);
  succeeded.forEach(r => console.log(`  ✓ ${r.filename}`));
  if (failed.length > 0) {
    console.log(`Failed: ${failed.length}`);
    failed.forEach(r => console.log(`  ✗ ${r.filename}: ${r.error}`));
  }
}

main().catch(console.error);
