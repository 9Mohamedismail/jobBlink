import { mkConfig, generateCsv, download } from "export-to-csv";

export const handleExport = (jobData) => {
  const removeKey = jobData.map(({ key, ...rest }) => rest);

  const csvConfig = mkConfig({
    filename: "my_jobs",
    useBom: true,
    showColumnHeaders: true,
    columnHeaders: [
      { key: "company", displayLabel: "company" },
      { key: "position", displayLabel: "position" },
      { key: "url", displayLabel: "job description link" },
      { key: "location", displayLabel: "location" },
      { key: "jobType", displayLabel: "job type" },
      { key: "date", displayLabel: "apply date" },
      { key: "tag", displayLabel: "tag" },
    ],
  });

  const csv = generateCsv(csvConfig)(removeKey);
  download(csvConfig)(csv);
};
