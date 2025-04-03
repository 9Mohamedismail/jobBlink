export const AddLocalStorage = (jobData) => {
  const jobDataStorage = JSON.parse(localStorage.getItem("jobData") || "[]");

  const updatedStorage = [...jobDataStorage, jobData];

  try {
    localStorage.setItem("jobData", JSON.stringify(updatedStorage));
    console.log("Success!");
  } catch (error) {
    console.log("Failure!", error);
  }
};

export const RetrieveLocalStorage = () => {
  return JSON.parse(localStorage.getItem("jobData") || "[]");
};

export const UpdateLocalStorage = (updatedJobData) => {
  localStorage.setItem("jobData", JSON.stringify(updatedJobData));
};
