import puppeteer from 'puppeteer';
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

const PROJECT_DIR = 'c:\\Users\\Admin\\OneDrive\\Desktop\\Devuron';
const PUBLIC_DIR = join(PROJECT_DIR, 'public');
const PROJECTS_DIR = join(PUBLIC_DIR, 'projects');

// Source paths for generated mockups
const drMockSource = 'C:/Users/Admin/.gemini/antigravity-ide/brain/7759fa79-a62e-4965-a556-4629d08be4f3/drtalbeena_mockup_1785457688077.png';
const vantageMockSource = 'C:/Users/Admin/.gemini/antigravity-ide/brain/7759fa79-a62e-4965-a556-4629d08be4f3/vantage_productions_mockup_1785457701562.png';

async function processMock(browser, srcPath, targetBaseName, slug) {
  if (!existsSync(srcPath)) {
    console.log(`✗ Source does not exist: ${srcPath}`);
    return;
  }

  const galleryDir = join(PROJECTS_DIR, slug);
  if (!existsSync(galleryDir)) {
    mkdirSync(galleryDir, { recursive: true });
  }

  const page = await browser.newPage();
  try {
    await page.goto('about:blank');
    const imageBase64 = Buffer.from(readFileSync(srcPath)).toString('base64');

    await page.evaluate(async (b64) => {
      const img = new Image();
      img.src = `data:image/png;base64,${b64}`;
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

      window.cropMain = crop(0, img.naturalHeight);
      window.cropHome = crop(0, Math.min(img.naturalHeight, 800));
      window.cropServices = crop(Math.min(img.naturalHeight * 0.25, img.naturalHeight - 10), Math.min(img.naturalHeight, 850));
      window.cropDetails = crop(Math.min(img.naturalHeight * 0.5, img.naturalHeight - 10), Math.min(img.naturalHeight, 850));
      
      const mobileCanvas = document.createElement('canvas');
      mobileCanvas.width = 375;
      mobileCanvas.height = 812;
      const mobileCtx = mobileCanvas.getContext('2d');
      const srcWidth = Math.min(img.naturalWidth, 600);
      const srcX = (img.naturalWidth - srcWidth) / 2;
      mobileCtx.drawImage(img, srcX, 0, srcWidth, Math.min(img.naturalHeight, srcWidth * 2.16), 0, 0, 375, 812);
      window.cropMobile = mobileCanvas.toDataURL('image/webp', 0.85);
    }, imageBase64);

    const saveCrop = async (windowVar, outPath) => {
      const dataUrl = await page.evaluate((v) => window[v], windowVar);
      if (dataUrl) {
        const base64Data = dataUrl.replace(/^data:image\/webp;base64,/, '');
        writeFileSync(outPath, Buffer.from(base64Data, 'base64'));
      }
    };

    // Save main asset
    const mainPath = join(PROJECTS_DIR, targetBaseName);
    await saveCrop('cropMain', mainPath);
    console.log(`✓ Saved main cover: ${targetBaseName}`);

    // Save gallery crops
    await saveCrop('cropHome', join(galleryDir, 'home.webp'));
    await saveCrop('cropServices', join(galleryDir, 'services.webp'));
    await saveCrop('cropDetails', join(galleryDir, 'details.webp'));
    await saveCrop('cropMobile', join(galleryDir, 'mobile.webp'));
    console.log(`✓ Saved gallery crops for: ${slug}`);

  } catch (err) {
    console.log(`✗ Error processing mock for ${slug}: ${err.message}`);
  } finally {
    await page.close();
  }
}

async function main() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  await processMock(browser, drMockSource, 'drtalbeena.webp', 'dr-talbeena');
  await processMock(browser, vantageMockSource, 'vantage-productions.webp', 'vantage-productions');

  await browser.close();
  console.log('Done!');
}

main().catch(console.error);
