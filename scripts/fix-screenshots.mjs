import puppeteer from 'puppeteer';
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

const PROJECT_DIR = 'c:\\Users\\Admin\\OneDrive\\Desktop\\Devuron';
const PUBLIC_DIR = join(PROJECT_DIR, 'public');
const PROJECTS_DIR = join(PUBLIC_DIR, 'projects');

const sites = [
  { slug: 'js-junk-car-buyer', url: 'https://jsjunkcarbuyer.com/', filename: 'jsjunkcarbuyer.webp' },
  { slug: 'vida-steakhouse', url: 'https://vidasteakhouse.com/', filename: 'vidasteakhouse.webp' },
  { slug: 'glutaskinwhite', url: 'https://www.glutaskinwhite.com/', filename: 'glutaskinwhite.webp' },
  { slug: '2axis-creative-agency', url: 'https://2axis.org/', filename: '2axis.webp' },
  { slug: 'albarre-health', url: 'https://albarrehealth.com/', filename: 'albarrehealth.webp' },
  { slug: 'prius-future', url: 'https://priusfuture.com/', filename: 'priusfuture.webp' },
  { slug: 'dr-talbeena', url: 'http://dr-talbeena.com/', filename: 'drtalbeena.webp' },
  { slug: 'vantage-productions', url: 'https://vantage-productions.com/', filename: 'vantage-productions.webp' },
  { slug: 'daral-asala', url: 'https://daral-asala-app.zalvant.com/', filename: 'daralasala.webp' },
  { slug: 'atlas-medical-billing', url: 'https://atlasmedicalbilling.us/', filename: 'atlasmedicalbilling.webp' },
  { slug: 'atlas-healthcare-group', url: 'https://atlashealthcare.com/', filename: 'atlashealthcare.webp' },
  { slug: 'surgical-solutions-international', url: 'https://surgicalsol.com/', filename: 'surgicalsol.webp' },
  { slug: 'shark-carpet-floor-cleaning', url: 'https://sharkcarpetandfloorcleaning.com/', filename: 'sharkcarpetflooring.webp' },
  { slug: 'sell-any-car-cash', url: 'https://sellanycarcash.com/', filename: 'sellanycarcash.webp' },
  { slug: 'independent-garage-door-repair', url: 'https://independentgaragedoorrepair.com/', filename: 'independentgaragedoor.webp' },
  { slug: 'msp-keys-and-remotes', url: 'https://mspkeysandremotes.com/', filename: 'mspkeysandremotes.webp' },
  { slug: 'east-bay-motorcycle-tow', url: 'https://eastbaymotorcycletow.com/', filename: 'eastbaymotorcycletow.webp' },
  { slug: 'hawk-towing-and-auto', url: 'https://hawktowingandauto.com/', filename: 'hawktowingauto.webp' }
];

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  for (const site of sites) {
    console.log(`Checking site: ${site.slug}...`);
    const galleryDir = join(PROJECTS_DIR, site.slug);
    if (!existsSync(galleryDir)) {
      mkdirSync(galleryDir, { recursive: true });
    }

    let isLive = false;
    try {
      const res = await page.goto(site.url, { waitUntil: 'domcontentloaded', timeout: 8000 });
      const status = res ? res.status() : 0;
      const title = await page.title();
      if (status >= 200 && status < 400 && !title.includes('Just a moment') && !title.includes('Attention Required') && !title.includes('Security Verification')) {
        isLive = true;
        console.log(`  Live! Title: "${title}"`);
      } else {
        console.log(`  Not live or Cloudflare protected. Status: ${status}, Title: "${title}"`);
      }
    } catch (e) {
      console.log(`  Failed to connect: ${e.message}`);
    }

    if (isLive) {
      try {
        await page.setViewport({ width: 1440, height: 900 });
        await new Promise(r => setTimeout(r, 2000));

        // Full page main screenshot
        const mainPath = join(PROJECTS_DIR, site.filename);
        await page.screenshot({ path: mainPath, fullPage: true, type: 'webp', quality: 85 });
        console.log(`  -> Captured fresh main cover: ${site.filename}`);

        // Gallery - Home view
        await page.screenshot({ path: join(galleryDir, 'home.webp'), fullPage: false, type: 'webp', quality: 85 });
        console.log(`  -> Captured gallery home.webp`);

        // Gallery - Mobile view
        await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
        await new Promise(r => setTimeout(r, 1000));
        await page.screenshot({ path: join(galleryDir, 'mobile.webp'), fullPage: false, type: 'webp', quality: 85 });
        console.log(`  -> Captured gallery mobile.webp`);

        // Reset viewport for section/page captures
        await page.setViewport({ width: 1440, height: 900 });

        // Scroll down to services/features section for section screenshot
        await page.evaluate(() => window.scrollTo(0, 800));
        await new Promise(r => setTimeout(r, 800));
        await page.screenshot({ path: join(galleryDir, 'services.webp'), fullPage: false, type: 'webp', quality: 85 });
        console.log(`  -> Captured gallery services.webp`);

        // Scroll further down for details/contact section
        await page.evaluate(() => window.scrollTo(0, 1800));
        await new Promise(r => setTimeout(r, 800));
        await page.screenshot({ path: join(galleryDir, 'details.webp'), fullPage: false, type: 'webp', quality: 85 });
        console.log(`  -> Captured gallery details.webp`);

      } catch (err) {
        console.log(`  Error taking fresh live screenshots: ${err.message}`);
        isLive = false;
      }
    }

    if (!isLive) {
      // Check if local cover image exists and is valid (not cloudflare screen)
      const localCover = join(PROJECTS_DIR, site.filename);
      if (existsSync(localCover)) {
        console.log(`  Processing local screenshot asset for segment cropping: ${site.filename}`);
        await page.goto('about:blank');
        const imgBuffer = readFileSync(localCover);
        const b64 = Buffer.from(imgBuffer).toString('base64');

        await page.evaluate(async (data) => {
          const img = new Image();
          img.src = `data:image/webp;base64,${data}`;
          await new Promise(r => img.onload = r);

          const crop = (startY, h) => {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth;
            canvas.height = Math.min(h, img.naturalHeight - startY);
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, startY, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
            return canvas.toDataURL('image/webp', 0.85);
          };

          window.cHome = crop(0, Math.min(img.naturalHeight, 800));
          window.cServices = crop(Math.min(img.naturalHeight * 0.25, img.naturalHeight - 10), Math.min(img.naturalHeight, 850));
          window.cDetails = crop(Math.min(img.naturalHeight * 0.5, img.naturalHeight - 10), Math.min(img.naturalHeight, 850));

          const mCanvas = document.createElement('canvas');
          mCanvas.width = 375;
          mCanvas.height = 812;
          const mCtx = mCanvas.getContext('2d');
          const srcW = Math.min(img.naturalWidth, 600);
          const srcX = (img.naturalWidth - srcW) / 2;
          mCtx.drawImage(img, srcX, 0, srcW, Math.min(img.naturalHeight, srcW * 2.16), 0, 0, 375, 812);
          window.cMobile = mCanvas.toDataURL('image/webp', 0.85);
        }, b64);

        const saveVar = async (varName, fileName) => {
          const dataUrl = await page.evaluate((v) => window[v], varName);
          if (dataUrl) {
            const base64Data = dataUrl.replace(/^data:image\/webp;base64,/, '');
            writeFileSync(join(galleryDir, fileName), Buffer.from(base64Data, 'base64'));
          }
        };

        await saveVar('cHome', 'home.webp');
        await saveVar('cServices', 'services.webp');
        await saveVar('cDetails', 'details.webp');
        await saveVar('cMobile', 'mobile.webp');
        console.log(`  -> Generated clean gallery segments for ${site.slug}`);
      }
    }
  }

  await browser.close();
  console.log('Finished image processing!');
}

main().catch(console.error);
