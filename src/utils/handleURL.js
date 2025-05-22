import axios from "axios";

export const handleURL = async (encodedUrl) => {
  const API = import.meta.env.VITE_API_BASE_URL;
  const { data } = await axios.get(`${API}/job?url=${encodedUrl}`);

  /* If you are using LOCALHOST then use this instead:
  const { data } = await axios.get(
    `http://localhost:5000/api/job?url=${encodedUrl}`,
  );*/
  return { ...data };
};
