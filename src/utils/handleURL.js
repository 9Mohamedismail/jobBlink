import axios from "axios";

export const handleURL = async (encodedUrl) => {
  const { data } = await axios.get(
    `http://localhost:5000/api/job?url=${encodedUrl}`,
  );
  return { ...data };
};
