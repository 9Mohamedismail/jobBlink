/* Handles URL job input for Lever */

import axios from "axios";

export const handleLeverURL = async (companyName, jobId) => {
  try {
    const { data } = await axios.get(
      `https://api.lever.co/v0/postings/${companyName}/${jobId}`
    );
    return {
      company: companyName,
      position: data.text,
      location: data.categories.location,
      jobType: data.categories.commitment,
    };
  } catch (error) {
    throw error;
  }
};
