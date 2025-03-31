import express from "express";
import puppeteer from "puppeteer";
import cors from "cors";

const app = express();
app.use(cors()); // Enable CORS for development

app.get("/api/jobdata", async (req, res) => {
  const url =
    "https://disney.wd5.myworkdayjobs.com/en-US/disneycareer/job/Burbank-CA-USA/Associate-Software-Engineer_10114443?utm_source=Simplify";
  try {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });/
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle0" });

    // Wait for the job title element to appear
    await page.waitForSelector('h2[data-automation-id="jobPostingHeader"]', {
      timeout: 5000,
    });
    const jobTitle = await page.$eval(
      'h2[data-automation-id="jobPostingHeader"]',
      (el) => el.innerText
    );

    // Retrieve structured data from JSON-LD if available
    const jobData = await page.evaluate(() => {
      const script = document.querySelector(
        'script[type="application/ld+json"]'
      );
      return script ? JSON.parse(script.innerText) : null;
    });
    let location = "";
    let company = "";
    if (jobData) {
      location =
        jobData.jobLocation &&
        jobData.jobLocation.address &&
        jobData.jobLocation.address.addressLocality
          ? jobData.jobLocation.address.addressLocality
          : "";
      company =
        jobData.hiringOrganization && jobData.hiringOrganization.name
          ? jobData.hiringOrganization.name
          : "";
    }
    await browser.close();

    res.json({ jobTitle, location, company });
  } catch (err) {
    console.error("Error fetching job data with Puppeteer:", err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
