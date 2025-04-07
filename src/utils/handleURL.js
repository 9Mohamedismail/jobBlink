/* Handles URL job input for Workday and Greenhous */

import axios from "axios";

export const handleURL = async (encodedUrl) => {
  try {
    const { data } = await axios.get(
      `http://localhost:5000/api/job?url=${encodedUrl}`
    );
    return {
      ...data,
    };
  } catch (error) {
    throw error;
  }
};
