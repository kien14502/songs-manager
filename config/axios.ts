import axios from "axios";
import { API_KEY, API_URL } from "./env";
import { toast } from "sonner";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "X-API-Key": API_KEY,
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    toast.error(JSON.stringify(error?.response?.data || error.message));
    return Promise.reject(error);
  }
);

export default axiosInstance;
