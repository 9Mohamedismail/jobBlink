import express from "express";
import puppeteer from "puppeteer";

const router = express.Router();

router.get("/job", async (req, res) => {
  const url = decodeURI(req.query.url);
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0" });
  try {
    const jobData = await page.evaluate(() => {
      const script = document.querySelector(
        'script[type="application/ld+json"]'
      );
      return script ? JSON.parse(script.innerText) : null;
    });
    let company = "";
    let position = "";
    let location = "";
    let jobType = "";
    if (jobData) {
      company = jobData.hiringOrganization?.name ?? "";
      position = jobData.identifier?.name ?? "";
      location = jobData.jobLocation?.address?.addressLocality ?? "";
      jobType = jobData.employmentType ?? "";
    }

    await browser.close();

    res.json({ company, position, location, jobType });
  } catch (err) {
    console.error("Error fetching job data with Puppeteer:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
