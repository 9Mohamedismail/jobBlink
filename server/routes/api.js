import express from "express";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

const router = express.Router();
puppeteer.use(StealthPlugin());

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

    try {
      await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
    } catch (navError) {
      console.error("Navigation error:", navError);
      throw new Error(
        "Failed to navigate to URL. Website might be blocking scraping."
      );
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
