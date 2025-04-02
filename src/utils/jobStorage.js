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
  return (jobDataStorage = JSON.parse(localStorage.getItem("jobData") || "[]"));
};
