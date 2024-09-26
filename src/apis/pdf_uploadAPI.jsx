import axios from "axios";

export const PDFUploadAPI = async (formData) => {
  const response = await axios.post(`https://aglai-17d1ea4702cf.herokuapp.com/process`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

export const PDFAnalytics = async (jobid) => {
  const response = await axios.get(`https://aglai-17d1ea4702cf.herokuapp.com/results/${jobid}`);

  return response;
};
