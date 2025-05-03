import axios from "axios";

export const handleLeverURL = async (companyName, jobId) => {
  const { data } = await axios.get(
    `https://api.lever.co/v0/postings/${companyName}/${jobId}`,
  );

  return {
    company: companyName,
    position: data.text,
    location: data.categories.location,
    jobType: data.categories.commitment,
    tag: "applied",
  };
};
