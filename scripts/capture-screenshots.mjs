import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.resolve(__dirname, "../public/projects");

// Ensure output dir exists
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const SITES = [
  { url: "https://surgicalsol.com/", filename: "surgicalsol.webp" },
  { url: "https://atlashealthcare.com/", filename: "atlashealthcare.webp" },
  { url: "https://atlasmedicalbilling.us/", filename: "atlasmedicalbilling.webp" },
  { url: "https://2axis.org/", filename: "2axis.webp" },
  { url: "https://albarrehealth.com/", filename: "albarrehealth.webp" },
];

async function captureFullPage(browser, site) {
  const page = await browser.newPage();

  try {
    // Set a standard 1440px wide viewport – tall enough to avoid lazy-load cut-offs
    await page.setViewport({ width: 1440, height: 900 });

    // Extra headers to avoid bot-detection
    await page.setExtraHTTPHeaders({
      "Accept-Language": "en-US,en;q=0.9",
    });
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    );

    console.log(`\n📸 Capturing: ${site.url}`);

    await page.goto(site.url, {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    // Dismiss any cookie banners / popups
    await page.evaluate(() => {
      document
        .querySelectorAll(
          '[class*="cookie"], [class*="popup"], [class*="modal"], [id*="cookie"], [id*="popup"], [id*="overlay"]'
        )
        .forEach((el) => el.remove());
    });

    // Auto-scroll to trigger lazy-loaded images / animations
    await autoScroll(page);

    // Scroll back to top before screenshot
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise((r) => setTimeout(r, 1000));

    const outPath = path.join(OUTPUT_DIR, site.filename);

    await page.screenshot({
      path: outPath,
      fullPage: true,
      type: "webp",
      quality: 85,
    });

    const stats = fs.statSync(outPath);
    const sizeKB = (stats.size / 1024).toFixed(1);
    console.log(`  ✅ Saved → ${outPath}  (${sizeKB} KB)`);
  } catch (err) {
    console.error(`  ❌ Failed: ${site.url}\n     ${err.message}`);
  } finally {
    await page.close();
  }
}

// Gradually scrolls the page to trigger lazy-loaded content
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 300;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= document.body.scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
  // Extra wait for any deferred animations / images
  await new Promise((r) => setTimeout(r, 2000));
}

(async () => {
  console.log("🚀 Launching browser...");
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
  });

  for (const site of SITES) {
    await captureFullPage(browser, site);
  }

  await browser.close();
  console.log("\n🎉 All screenshots captured!");
})();
