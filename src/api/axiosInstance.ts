import axios from "axios";
import { getCookie, removeCookies } from "../lib/actions";

const api = axios.create({
  baseURL: "https://your-api.com",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const access_token = getCookie("access_token");
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeCookies();
      console.error("Unauthorized! Redirecting to login...");
      window.location.assign("/login");
    }
    return Promise.reject(error);
  }
);

export default api;
