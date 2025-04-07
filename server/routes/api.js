import express from "express";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

const router = express.Router();
puppeteer.use(StealthPlugin());

function detectPlatform(url) {
  if (url.includes("greenhouse.io")) return "Greenhouse";
  if (url.includes("myworkdayjobs.com")) return "Workday";
  return "Unknown";
}

async function isInvalidPage(page, platform) {
  if (platform === "Greenhouse") {
    return await page
      .$eval('link[rel="canonical"]', (el) => el.href.includes("error=true"))
      .catch(() => false);
  }
  if (platform === "Workday") {
    return !!(await page.$('[data-automation-id="errorMessage"]'));
  }
  return false;
}
async function scrapeJobData(url) {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

    const platform = detectPlatform(url);

    if (await isInvalidPage(page, platform)) {
      throw new Error(`${platform.toUpperCase()}_DELETED`);
    }

    const jobData = await page.evaluate(() => {
      const script = document.querySelector(
        'script[type="application/ld+json"]'
      );
      return script ? JSON.parse(script.innerText) : null;
    });

    return {
      company: jobData?.hiringOrganization?.name ?? "",
      position: jobData?.title ?? jobData?.identifier?.name ?? "",
      location: jobData?.jobLocation?.address?.addressLocality ?? "",
      jobType: jobData?.employmentType ?? "",
    };
  } finally {
    if (browser) await browser.close();
  }
}

router.get("/job", async (req, res) => {
  const url = decodeURI(req.query.url);
  try {
    const data = await scrapeJobData(url);
    res.json(data);
  } catch (err) {
    console.error("Error fetching job data:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
