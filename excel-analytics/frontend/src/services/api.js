import axios from "axios";

const API = "http://localhost:5000/api/upload";

const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const uploadExcel = (formData) =>
  axios.post(`${API}/excel`, formData, {
    ...getAuthHeader(),
    headers: { ...getAuthHeader().headers, "Content-Type": "multipart/form-data" },
  });

export const fetchHistory = () => axios.get(`${API}/history`, getAuthHeader());
export const fetchStats = () => axios.get(`${API}/stats`, getAuthHeader());
