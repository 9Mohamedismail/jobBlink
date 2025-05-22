import express from "express";
import { getBrowser } from "../utils/browser.js";

const router = express.Router();

async function scrapeJobData(url, tag) {
  const browser = await getBrowser();
  const page = await browser.newPage();

  try {
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

    const isGreenhouse = url.includes("greenhouse.io");

    if (isGreenhouse) {
      const currentUrl = page.url();
      if (currentUrl !== url) {
        const redirectedPathParts = new URL(currentUrl).pathname.split("/");
        if (
          redirectedPathParts.length < 4 ||
          !redirectedPathParts[3] ||
          redirectedPathParts[3] === ""
        ) {
          throw new Error("KNOWN_URL_NO_JOB_DATA");
        }
      }

      const pathnameParts = new URL(url).pathname.split("/");
      const company = pathnameParts[1] || "N/A";

      const job = await page.evaluate(
        (companyFromUrl, tagValue) => {
          const position =
            document.querySelector('meta[property="og:title"]')?.content ||
            "N/A";
          const location =
            document.querySelector('meta[property="og:description"]')
              ?.content || "N/A";

          return {
            company: companyFromUrl,
            position,
            location,
            jobType: "N/A",
            tag: tagValue,
            key: `${companyFromUrl}-${Date.now()}-${Math.random()}`,
          };
        },
        company,
        tag
      );

      return job;
    } else {
      const jobData = await page.evaluate(() => {
        const script = document.querySelector(
          'script[type="application/ld+json"]'
        );
        if (!script) throw new Error("KNOWN_URL_NO_JOB_DATA");

        try {
          return JSON.parse(script.innerText);
        } catch {
          throw new Error("FAILED_TO_PARSE_LD_JSON");
        }
      });

      const parsedCompany = jobData?.hiringOrganization?.name || "N/A";

      return {
        company: parsedCompany,
        position: jobData?.title || jobData?.identifier?.name || "N/A",
        location: jobData?.jobLocation?.address?.addressLocality || "N/A",
        jobType: jobData?.employmentType?.replace(/_/g, " ") || "N/A",
        tag,
        key: `${parsedCompany}-${Date.now()}-${Math.random()}`,
      };
    }
  } finally {
    await page.close(); // Close the tab, but NOT the browser
  }
}

router.get("/job", async (req, res) => {
  const url = decodeURI(req.query.url);
  const tag = req.query.tag || "applied";

  if (!url || !/^https?:\/\/.+/.test(url)) {
    return res.status(400).json({ error: "Invalid or missing URL." });
  }

  try {
    const data = await scrapeJobData(url, tag);
    res.json(data);
  } catch (err) {
    console.error("Error fetching job data:", err.message);

    if (err.message === "KNOWN_URL_NO_JOB_DATA") {
      return res.status(400).json({ error: "No job data found on page." });
    }

    if (err.message === "FAILED_TO_PARSE_LD_JSON") {
      return res
        .status(400)
        .json({ error: "Job data format could not be parsed." });
    }

    res.status(500).json({ error: "Internal server error." });
  }
});

export default router;
