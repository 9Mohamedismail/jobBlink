import { AddLocalStorage, RetrieveLocalStorage } from "../utils/localStorage";
import { handleLeverURL } from "../utils/handleLeverURL";
import { handleURL } from "../utils/handleURL";

const supportedJobs = {
  "boards.greenhouse.io": "GREENHOUSE",
  "myworkdayjobs.com": "WORKDAY",
  "jobs.lever.co": "LEVER",
  "jobs.ashbyhq.com": "ASHBY",
};

export const parseAndSaveJob = async (
  inputUrl,
  setUrlErrorType,
  setConfirmLoading,
  setVisible,
  setInputUrl,
) => {
  setConfirmLoading(true);
  const formattedDate = new Date().toLocaleDateString();
  let urlType = "INVALID_URL";

  try {
    const urlObj = new URL(inputUrl);
    const host = urlObj.host;

    for (const domain in supportedJobs) {
      if (host.includes(domain)) {
        urlType = supportedJobs[domain];
        break;
      }
    }

    if (urlType === "INVALID_URL") {
      setUrlErrorType(urlType);
      setConfirmLoading(false);
      return;
    }

    let jobData = "";
    if (urlType === "LEVER") {
      const splitURL = inputUrl.split("/");
      jobData = await handleLeverURL(splitURL[3], splitURL[4]);
    } else {
      const encodedUrl = encodeURIComponent(inputUrl);
      jobData = await handleURL(encodedUrl);
    }

    AddLocalStorage({
      ...jobData,
      key: RetrieveLocalStorage("jobData").length,
      date: formattedDate,
      url: inputUrl,
    });
    setVisible(true);
    setInputUrl("");
  } catch (error) {
    console.error(error);
    setUrlErrorType(urlType);
  } finally {
    setConfirmLoading(false);
  }
};
