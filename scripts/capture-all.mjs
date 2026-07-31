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
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  for (const site of sites) {
    const galleryDir = join(PROJECTS_DIR, site.slug);
    if (!existsSync(galleryDir)) {
      mkdirSync(galleryDir, { recursive: true });
    }

    console.log(`\n----------------------------------------\nProcessing: ${site.slug} (${site.url})`);
    let live = false;

    try {
      // Check if URL responds
      const response = await page.goto(site.url, { waitUntil: 'networkidle2', timeout: 8000 });
      if (response && response.status() < 400) {
        live = true;
        console.log(`✓ Site is LIVE (${response.status()})`);
      } else {
        console.log(`✗ Site status code: ${response ? response.status() : 'No response'}`);
      }
    } catch (e) {
      console.log(`✗ Site connection failed: ${e.message}`);
    }

    if (live) {
      // 1. Capture Desktop Home (Fresh full-page screenshot)
      try {
        await page.setViewport({ width: 1440, height: 900 });
        await new Promise(r => setTimeout(r, 2000)); // allow layouts to settle

        // Scroll to load lazy items
        await page.evaluate(async () => {
          window.scrollTo(0, document.body.scrollHeight / 2);
          await new Promise(r => setTimeout(r, 500));
          window.scrollTo(0, document.body.scrollHeight);
          await new Promise(r => setTimeout(r, 500));
          window.scrollTo(0, 0);
        });

        // Save main image
        const mainPath = join(PROJECTS_DIR, site.filename);
        await page.screenshot({ path: mainPath, fullPage: true, type: 'webp', quality: 80 });
        console.log(`  ✓ Updated main cover: ${site.filename}`);

        // Save to gallery: Home Page
        await page.screenshot({ path: join(galleryDir, 'home.webp'), fullPage: false, type: 'webp', quality: 80 });
        console.log(`  ✓ Saved gallery: home.webp`);

        // 2. Capture Mobile Responsive View (Viewport 375x812)
        await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
        await new Promise(r => setTimeout(r, 1000));
        await page.screenshot({ path: join(galleryDir, 'mobile.webp'), fullPage: false, type: 'webp', quality: 80 });
        console.log(`  ✓ Saved gallery: mobile.webp`);

        // 3. Try to capture About Page
        await page.setViewport({ width: 1440, height: 900 });
        try {
          await page.goto(`${site.url.replace(/\/$/, '')}/about`, { waitUntil: 'networkidle2', timeout: 5000 });
          await page.screenshot({ path: join(galleryDir, 'about.webp'), fullPage: false, type: 'webp', quality: 80 });
          console.log(`  ✓ Saved gallery: about.webp`);
        } catch (err) {
          console.log(`  - No explicit /about page found or loading failed`);
        }

        // 4. Try to capture Contact Page
        try {
          await page.goto(`${site.url.replace(/\/$/, '')}/contact`, { waitUntil: 'networkidle2', timeout: 5000 });
          await page.screenshot({ path: join(galleryDir, 'contact.webp'), fullPage: false, type: 'webp', quality: 80 });
          console.log(`  ✓ Saved gallery: contact.webp`);
        } catch (err) {
          console.log(`  - No explicit /contact page found or loading failed`);
        }

      } catch (err) {
        console.log(`  ✗ Failed capturing live details: ${err.message}`);
        live = false; // Fallback
      }
    }

    if (!live) {
      console.log(`  → Using local image segment fallback for offline site...`);
      // Since site is not live, let's load the existing local screenshot file using a headless canvas page
      const localImageFile = join(PROJECTS_DIR, site.filename);
      if (existsSync(localImageFile)) {
        try {
          // Let's open a blank local page and use Canvas to segment the image!
          await page.goto('about:blank');
          
          // Inject canvas code to crop the local image
          const fileBuffer = readFileSync(localImageFile);
          const imageBase64 = Buffer.from(fileBuffer).toString('base64');

          if (imageBase64) {
            await page.evaluate(async (b64) => {
              const img = new Image();
              img.src = `data:image/webp;base64,${b64}`;
              await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
              });

              // Create crops
              const crop = (startY, height) => {
                const canvas = document.createElement('canvas');
                canvas.width = img.naturalWidth;
                canvas.height = Math.min(height, img.naturalHeight - startY);
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, startY, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
                return canvas.toDataURL('image/webp', 0.85);
              };

              // Crop top (Hero / Home view)
              window.cropHome = crop(0, Math.min(img.naturalHeight, 800));
              // Crop middle (Services / About view)
              window.cropServices = crop(Math.min(img.naturalHeight * 0.25, img.naturalHeight - 10), Math.min(img.naturalHeight, 850));
              // Crop lower middle (Portfolio / Details)
              window.cropDetails = crop(Math.min(img.naturalHeight * 0.5, img.naturalHeight - 10), Math.min(img.naturalHeight, 850));
              
              // Crop mobile simulator view (narrow crop)
              const mobileCanvas = document.createElement('canvas');
              mobileCanvas.width = 375;
              mobileCanvas.height = 812;
              const mobileCtx = mobileCanvas.getContext('2d');
              const srcWidth = Math.min(img.naturalWidth, 600);
              const srcX = (img.naturalWidth - srcWidth) / 2;
              mobileCtx.drawImage(img, srcX, 0, srcWidth, Math.min(img.naturalHeight, srcWidth * 2.16), 0, 0, 375, 812);
              window.cropMobile = mobileCanvas.toDataURL('image/webp', 0.85);

            }, imageBase64);

            // Save the crops back to disk
            const saveCrop = async (windowVar, name) => {
              const dataUrl = await page.evaluate((v) => window[v], windowVar);
              if (dataUrl) {
                const base64Data = dataUrl.replace(/^data:image\/webp;base64,/, '');
                writeFileSync(join(galleryDir, name), Buffer.from(base64Data, 'base64'));
              }
            };

            await saveCrop('cropHome', 'home.webp');
            await saveCrop('cropServices', 'services.webp');
            await saveCrop('cropDetails', 'details.webp');
            await saveCrop('cropMobile', 'mobile.webp');
            console.log(`  ✓ Generated 4 custom page segments (home, services, details, mobile) from local asset`);
          } else {
            console.log(`  ✗ Local asset base64 loading failed`);
          }
        } catch (cropErr) {
          console.log(`  ✗ Canvas segment failed: ${cropErr.message}`);
        }
      } else {
        console.log(`  ✗ Local asset does not exist at ${localImageFile}`);
      }
    }
  }

  await browser.close();
  console.log('\nAll sites processed successfully!');
}

main().catch(console.error);
