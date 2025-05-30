export const AddLocalStorage = (jobData) => {
  const jobDataStorage = JSON.parse(localStorage.getItem("jobData") || "[]");

  const updatedStorage = [...jobDataStorage, jobData];

  try {
    localStorage.setItem("jobData", JSON.stringify(updatedStorage));
  } catch (error) {
    console.error("Failed to save job data to localStorage.", error);
  }
};

export const RetrieveLocalStorage = (key) => {
  const data = localStorage.getItem(key);

  if (key === "settingsData") {
    if (!data) {
      const defaultSettings = {
        showRejectedJobs: true,
        sortJobsBy: "descend",
      };
      localStorage.setItem("settingsData", JSON.stringify(defaultSettings));
      return defaultSettings;
    }
  }

  return data ? JSON.parse(data) : [];
};

export const UpdateLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
